// Imports HERE!
import type { StoryCard, Writable } from "@/shared";
import { writable, Log, get } from "@/shared";
import type { Adventure } from "./types";
import { DUIUtils as Utils } from "./utils";

// The default settings, saved when loading the extension for the first time.
const defaultSettings = {
  devEnabled: true,
  storyCardTypeSelector: "button[aria-labelledby='scTypeLabel']",
  storyCardNameSelector: "input[aria-labelledby='scTitleLabel']",
  storyCardTriggersSelector: "input[aria-labelledby='scTriggersLabel']",
  responseSelector: "#transition-opacity",
  outputId: "gameplay-output",
  responseId: "transition-opacity",
  responseActionId: "span#action-text",
  iconSize: 28,
  iconBorderThickness: 1,
  iconBorderOpacity: 100,
  iconBorderRoundness: 0,
  tooltipWidth: 512,
  tooltipHeight: 512,
  travellerWidth: 512,
  travellerHeight: 512,
  tooltipHideDelay: 200,
  integratedEditor: false,
  debugData: false,
  dangerZone: false,
  formatterEnabled: true,
  travellerEnabled: false,
  travellerTriggers: "travel to",
  textColor: "#f8ae2c",
  borderColor: "#f8ae2c",
  paintLimit: 4,
};

// Export the default settings so they can be used.
export type Settings = typeof defaultSettings;

/**
 * `Storage` is a class which handles the saving of all the things. What a surprise, right?
 */
export class DUIStorage {
  public static settings: Writable<Settings> = writable(defaultSettings); // The stored settings.
  public static adventures: Writable<Record<string, Adventure>> = writable({});
  public static map: Record<string, StoryCard> = {};

  /**
   * Loads the data from storage.
   */
  static async load(): Promise<void> {
    try {
      // Log the start.
      Log.info("Loading storage data...");

      // Try to retrieve the settings and cards.
      const result = await chrome.storage.local.get(["settings", "storyCards", "adventures"]);

      // Apply the settings.
      if (result.settings) this.settings.set({ ...this.settings, ...result.settings });

      // Apply the story cards.
      // if (result.storyCards) this.storyCards.set({ ...this.storyCards, ...result.storyCards });

      // Apply the adventures.
      if (result.adventures) this.adventures.set({ ...this.adventures, ...result.adventures });

      // Log the end.
      Log.success("Loaded storage data!");
    } catch (error) {
      Log.error("" + error);
    }
  }

  /**
   *
   */
  static listen() {
    this.settings.subscribe((value) => {
      chrome.storage.local.set({ settings: value });
    });

    let adventureTimeout: ReturnType<typeof setTimeout>;
    this.adventures.subscribe((value) => {
      clearTimeout(adventureTimeout);
      adventureTimeout = setTimeout(() => {
        chrome.storage.local.set({ adventures: value });
        this.optimizeStoryCards();
      }, 200);
    });
  }

  static getAdventureData(): Adventure | null {
    return get(this.adventures)[Utils.getAdventureId()];
  }

  /**
   *
   */
  static optimizeStoryCards() {
    const adventure = this.getAdventureData(); // Get the current adventure data.

    // If there is no adventure or cards then clear the map and return.
    if (!adventure || !adventure.storyCards) {
      this.map = {};
      return;
    }

    // Get all the current cards and create a new map.
    const storyCards = adventure.storyCards;
    const newMap: Record<string, StoryCard> = {};

    for (const card of Object.values(storyCards)) {
      if (card.triggers) {
        const triggers = card.triggers.split(",").map((t) => t.trim().toLowerCase());
        for (const trigger of triggers) {
          if (trigger) {
            newMap[trigger] = card;
          }
        }
      }
    }

    this.map = newMap;
    Log.success(`Optimized ${Object.keys(newMap).length} triggers!`);
  }

  /**
   *
   * @param cachedName
   * @param recentName
   * @param type
   */
  static syncStoryCard(cachedName: string, recentName: string, type: string = "Class") {
    if (recentName.length === 0) return; // Return if the name is invalid.

    // Get the current adventure again.
    const adventure = this.getAdventureData();
    if (!adventure || !adventure.storyCards) return;

    // @ts-ignore
    const storyCard: StoryCard = adventure.storyCards[cachedName];
    if (!storyCard) return;

    storyCard.type = type;

    if (cachedName !== recentName) {
      storyCard.name = recentName;
      this.upsertStoryCard(storyCard);
      this.deleteStoryCard(cachedName);
    } else {
      this.upsertStoryCard(storyCard);
    }
  }

  /**
   *
   * @param storyCard
   * @returns
   */
  static upsertStoryCard(storyCard: StoryCard) {
    if (!storyCard.name) return;

    const adventureId = Utils.getAdventureId();
    if (!adventureId) return;

    this.adventures.update((adventures) => {
      if (!adventures[adventureId]) {
        adventures[adventureId] = { storyCards: {} };
      }

      adventures[adventureId].storyCards[storyCard.name] = storyCard;
      return adventures;
    });
  }

  /**
   *
   * @param name
   * @returns
   */
  static hasStoryCard(name: string) {
    return this.getAdventureData()?.storyCards?.hasOwnProperty(name) ?? false;
  }

  /**
   *
   * @param name
   */
  static deleteStoryCard(name: string) {
    const adventureId = Utils.getAdventureId();
    if (!adventureId) return;

    this.adventures.update((adventures) => {
      if (adventures[adventureId]?.storyCards) {
        delete adventures[adventureId].storyCards[name];
      }
      return adventures;
    });
  }

  /**
   * Read the stored settings.
   * @returns The most recent settings.
   */
  static readSettings(): Settings {
    return get(this.settings);
  }
}

// Export the contents for use in other things.
export const settings = DUIStorage.settings;
export const adventures = DUIStorage.adventures;
