// Imports HERE!
import type { StoryCard, Writable } from "@/shared";
import { writable, Log, get } from "@/shared";

// The default settings, saved when loading the extension for the first time.
const defaultSettings = {
  enabled: true, // Whether DungeonUI is enabled and doing stuff.
  devEnabled: true, // Whether development stuff (such as visible logs) are enabled.

  // Dangerous settings below!
  storyCardTypeSelector: "button[aria-labelledby='scTypeLabel']",
  storyCardNameSelector: "input[aria-labelledby='scTitleLabel']",
  storyCardTriggersSelector: "input[aria-labelledby='scTriggersLabel']",
  responseSelector: "#transition-opacity",
  outputId: "gameplay-output",
  responseId: "transition-opacity",
  responseActionId: "span#action-text",

  // All the other stuff.
  textColor: "#f8ae2c",
  borderColor: "#f8ae2c",
};

// Export the default settings so they can be used.
export type Settings = typeof defaultSettings;

/**
 * `Storage` is a class which handles the saving of all the things. What a surprise, right?
 */
export class DUIStorage {
  public static settings: Writable<Settings> = writable(defaultSettings); // The stored settings.
  public static storyCards: Writable<Record<string, StoryCard>> = writable({}); // The stored story cards.
  public static storyCardMap: Record<string, StoryCard> = {};

  /**
   * Loads the data from storage.
   */
  static async load(): Promise<void> {
    try {
      // Log the start.
      Log.info("Loading storage data...");

      // Try to retrieve the settings and cards.
      const result = await chrome.storage.local.get(["settings", "storyCards"]);

      // Apply the settings.
      if (result.settings) this.settings.set({ ...this.settings, ...result.settings });

      // Apply the story cards.
      if (result.storyCards) this.storyCards.set({ ...this.storyCards, ...result.storyCards });

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

    let storyCardTimeout: ReturnType<typeof setTimeout>;
    this.storyCards.subscribe((value) => {
      clearTimeout(storyCardTimeout);
      storyCardTimeout = setTimeout(() => {
        chrome.storage.local.set({ storyCards: value });
        this.optimizeStoryCards();
      }, 200);
    });
  }

  /**
   *
   */
  static optimizeStoryCards() {
    const cards = get(this.storyCards);
    const map: Record<string, StoryCard> = {};

    for (const card of Object.values(cards)) {
      if (card.triggers) {
        const triggers = card.triggers.split(",").map((t) => t.trim().toLowerCase());
        for (const trigger of triggers) {
          if (trigger) {
            map[trigger] = card;
          }
        }
      }
    }

    this.storyCardMap = map;
    Log.success(`Optimized ${Object.keys(map).length} triggers!`);
  }

  /**
   *
   * @param cachedName
   * @param recentName
   * @param type
   */
  static syncStoryCard(cachedName: string, recentName: string, type: string = "Class") {
    if (recentName === "") return;
    const storyCards = get(this.storyCards);
    const storyCard = storyCards[cachedName];
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
    this.storyCards.update((storyCards) => {
      storyCards[storyCard.name] = storyCard;
      return storyCards;
    });
  }

  /**
   *
   * @param name
   * @returns
   */
  static hasStoryCard(name: string) {
    return get(this.storyCards).hasOwnProperty(name);
  }

  /**
   *
   * @param name
   */
  static deleteStoryCard(name: string) {
    this.storyCards.update((storyCards) => {
      delete storyCards[name];
      return storyCards;
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
export const storyCards = DUIStorage.storyCards;
