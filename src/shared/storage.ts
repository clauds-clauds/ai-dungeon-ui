import { get, writable, type Writable } from "svelte/store";
import type { Adventure, StoryCard } from "./types";
import { Log } from "./log";
import { Utils } from "./utils";
import { extensionState } from "./state.svelte";

const defaultSettings = {
  // Highlight:
  highlightColor: "#f8ae2c",

  // Icons:
  iconSize: 28,
  iconBorderSize: 1,
  iconBorderRoundness: 0,
  iconBorderColor: "#f8ae2c",

  // Dev:
  devModeEnabled: false,
  devOutputId: "gameplay-output",
  devResponseId: "transition-opacity",
  devResponseActionId: "span#action-text",
  devResponseSelector: "#transition-opacity",
  devStoryCardSelector: "input[aria-labelledby='scTitleLabel']",

  // Tooltip:
  tooltipWidth: 512,
  tooltipHeight: 512,
  tooltipHideDelay: 200,

  // Performance:
  performanceModeEnabled: false,

  // Markdown:
  formatterEnabled: true,
  formatterBold: "\\*\\*(.*?)\\*\\*",
  formatterItalic: "\\*(.*?)\\*",
  formatterUnderline: "__(.*?)__",
  formatterStrikethrough: "~~(.*?)~~",

  // Traveller:
  travellerEnabled: false,
  travellerTriggers: "",
  travellerWidth: 512,
  travellerHeight: 512,

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

  static exportAdventure() {
    const adventure = Storage.getCurrentAdventureData();
    if (Utils.isAdventureInvalid(adventure)) return;

    const data = JSON.stringify(adventure, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${Utils.getAdventureId()}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static importAdventure(): Promise<Adventure | null> {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json,application/json";
      input.style.display = "none";

      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];

        if (!file) {
          document.body.removeChild(input);
          resolve(null);
          return;
        }

        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          try {
            const result = readerEvent.target?.result as string;
            const adventure = JSON.parse(result) as Adventure;
            document.body.removeChild(input);
            resolve(adventure);
          } catch (error) {
            document.body.removeChild(input);
            reject(error);
          }
        };
        reader.onerror = (err) => {
          document.body.removeChild(input);
          reject(err);
        };
        reader.readAsText(file);
      };

      document.body.appendChild(input);
      input.click();
    });
  }

  static merge(adventure: Adventure) {
    const adventureId = Utils.getAdventureId();
    this.adventures.update((adventures) => {
      if (!adventures[adventureId]) adventures[adventureId] = { storyCards: {} };
      adventures[adventureId].storyCards = { ...adventures[adventureId].storyCards, ...adventure.storyCards };
      return adventures;
    });
  }

  static replace(adventure: Adventure) {
    const adventureId = Utils.getAdventureId();
    this.adventures.update((adventures) => {
      adventures[adventureId] = adventure;
      return adventures;
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

export const settings = Storage.settings;
export const adventures = Storage.adventures;
