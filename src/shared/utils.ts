import { extensionState } from "./state.svelte";
import { Storage } from "./storage";
import type { Adventure, StoryCard } from "./types";

export class Utils {
  static getAdventureId(): string {
    const match = window.location.pathname.match(/adventure\/([^\/]+)/);
    return match ? match[1] : "";
  }

  static getVersion(): string {
    return chrome.runtime.getManifest().version;
  }

  static getEnvironment(): string {
    const host = window.location.hostname;
    if (host.startsWith("play.")) return "Production";
    if (host.startsWith("beta.")) return "Beta";
    if (host.startsWith("alpha.")) return "Alpha";
    return "";
  }

  static createNewStoryCard(): StoryCard {
    const storyCard: StoryCard = {
      id: Utils.getAdventureId(),
      name: extensionState.storyCard,
      type: "Class",
      triggers: "",
      limit: "None",
      useCustomColor: false,
      color: Storage.getCurrentSettings().highlightColor,
      icons: [],
      currentIcon: 0,
      iconBorderStyle: "Solid",
      iconBorderColor: Storage.getCurrentSettings().iconBorderColor,
      graphics: [],
      currentGraphic: 0,
    };
    return storyCard;
  }

  static isStringInvalid(string: string): boolean {
    if (!string || string === "") return true;
    return false;
  }

  static isAdventureInvalid(adventure: Adventure): boolean {
    if (!adventure || !adventure.storyCards) return true;
    return false;
  }

  static getTravellerName(actionText: string): string {
    const settings = Storage.getCurrentSettings();
    if (!settings.travellerEnabled || this.isStringInvalid(settings.travellerTriggers)) {
      return "";
    }

    const triggers = settings.travellerTriggers
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
    const lowerCaseActionText = actionText.toLowerCase().trim();
    let bestMatch = { cardName: "", matchLength: 0 };

    for (const trigger of triggers) {
      const lowerCaseTrigger = trigger.toLowerCase();
      const triggerIndex = lowerCaseActionText.indexOf(lowerCaseTrigger);

      if (triggerIndex !== -1) {
        const potentialCardName = actionText.substring(triggerIndex + trigger.length).trim();
        const storyCardTriggers = Object.keys(extensionState.map);

        const matches = storyCardTriggers.filter((cardTrigger) =>
          potentialCardName.toLowerCase().startsWith(cardTrigger.toLowerCase())
        );

        if (matches.length > 0) {
          const longestMatch = matches.reduce((a, b) => (a.length > b.length ? a : b));
          if (longestMatch.length > bestMatch.matchLength) {
            bestMatch = {
              cardName: extensionState.map[longestMatch].name,
              matchLength: longestMatch.length,
            };
          }
        }
      }
    }

    return bestMatch.cardName;
  }

  static requestImage(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
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
          const result = readerEvent.target?.result as string;
          document.body.removeChild(input);
          resolve(result);
        };
        reader.onerror = (err) => {
          document.body.removeChild(input);
          reject(err);
        };
        reader.readAsDataURL(file);
      };

      document.body.appendChild(input);

      setTimeout(() => {
        input.click();
      }, 0);
    });
  }
}
