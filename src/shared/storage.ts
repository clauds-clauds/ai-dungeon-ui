import { get, writable, type Writable } from "svelte/store";
import type { Adventure, StoryCard } from "./types";
import { Log } from "./log";
import { Utils } from "./utils";
import { extensionState } from "./state.svelte";

const defaultSettings = {
  // Icons:
  iconSize: 28,
  iconBorderSize: 1,
  iconBorderRoundness: 0,
  iconBorderColor: "#f8ae2c",

  // Dev:
  devOutputId: "gameplay-output",
  devResponseId: "transition-opacity",
  devResponseActionId: "span#action-text",
  devResponseSelector: "#transition-opacity",
  devStoryCardSelector: "input[aria-labelledby='scTitleLabel']",

  // Markdown:
  markdownBold: "\\*\\*(.*?)\\*\\*",
  markdownItalic: "\\*(.*?)\\*",
  markdownUnderline: "__(.*?)__",
  markdownStrikethrough: "~~(.*?)~~",

  // Generation:
  generationEnabled: false,
  generationApiKey: "",
};

export type Settings = typeof defaultSettings;

export class Storage {
  public static settings: Writable<Settings> = writable(defaultSettings);
  public static adventures: Writable<Record<string, Adventure>> = writable({});

  static getCurrentAdventureData() {
    return get(this.adventures)[Utils.getAdventureId()];
  }

  static getCurrentSettings() {
    return get(this.settings);
  }

  static async load() {
    try {
      Log.info("Loading storage data...");
      const result = await chrome.storage.local.get(["settings", "adventures"]);
      if (result.settings) this.settings.set({ ...this.settings, ...result.settings });
      if (result.adventures) this.adventures.set({ ...this.adventures, ...result.adventures });
      Log.success("Loaded storage data!");
    } catch (error) {
      Log.error("ERROR: " + error);
    }
  }

  static listen() {
    this.settings.subscribe((value) => {
      chrome.storage.local.set({ settings: value });
    });

    let adventureTimeout: ReturnType<typeof setTimeout>;
    this.adventures.subscribe((value) => {
      this.optimize();
      clearTimeout(adventureTimeout);
      adventureTimeout = setTimeout(() => {
        chrome.storage.local.set({ adventures: value });
      }, 200);
    });
  }

  static optimize() {
    const adventure = this.getCurrentAdventureData();
    if (Utils.isAdventureInvalid(adventure)) {
      extensionState.map = {};
      return;
    }
    const storyCards = adventure.storyCards;
    const map: Record<string, StoryCard> = {};
    for (const card of Object.values(storyCards)) {
      if (card.triggers) {
        const triggers = card.triggers.split(",").map((t) => t.trim().toLowerCase());
        for (const trigger of triggers) {
          if (trigger) {
            map[trigger] = card;
          }
        }
      }
    }
    extensionState.map = map;
    Log.success(`Optimized ${Object.keys(map).length} triggers!`);
  }

  static sync(previousName: string, newName: string) {
    if (Utils.isStringInvalid(newName)) return;
    const adventure = this.getCurrentAdventureData();
    if (Utils.isAdventureInvalid(adventure)) return;
    const storyCard: StoryCard = adventure.storyCards[previousName];
    if (!storyCard) return;
    storyCard.type = "Character";
    if (previousName !== newName) {
      storyCard.name = newName;
      this.upsert(storyCard);
      this.delete(previousName);
    } else {
      this.upsert(storyCard);
    }
  }

  static upsert(storyCard: StoryCard) {
    if (Utils.isStringInvalid(storyCard.name)) return;
    const adventureId = Utils.getAdventureId();
    this.adventures.update((adventures) => {
      if (!adventures[adventureId]) adventures[adventureId] = { storyCards: {} };
      adventures[adventureId].storyCards[storyCard.name] = storyCard;
      return adventures;
    });
  }

  static contains(name: string): boolean {
    return this.getCurrentAdventureData()?.storyCards?.hasOwnProperty(name) ?? false;
  }

  static delete(name: string) {
    const adventureId = Utils.getAdventureId();
    this.adventures.update((adventures) => {
      if (adventures[adventureId]?.storyCards) delete adventures[adventureId].storyCards[name];
      return adventures;
    });
  }
}
