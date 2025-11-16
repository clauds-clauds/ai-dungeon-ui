import { get, writable, type Writable } from "svelte/store";
import { Logger } from ".";
import type { PrettyCard } from "./types";

// Default settings HERE!
const prettySettings = {
  enabled: true,
};

// Export those things...
export type PrettySettings = typeof prettySettings;

export class DUIStorage {
  public static settings: Writable<PrettySettings> = writable(prettySettings);
  public static cards: Writable<Record<string, PrettyCard>> = writable({});
  public static map: Record<string, PrettyCard> = {};

  /* Basic storage stuff HERE! */
  static async load() {
    try {
      Logger.info("Loading storage data...");
      const result = await chrome.storage.local.get(["settings", "cards"]);

      // Load the settings if found.
      if (result.settings) {
        this.settings.set({ ...prettySettings, ...result.prettySettings });
      }

      // Load the cards if found.
      if (result.cards) {
        this.cards.set(result.cards);
      }

      Logger.success("Loaded storage data!");
    } catch (error) {
      Logger.error("Storage " + error);
    }
  }

  static listen() {
    Logger.info("Fixing storage listeners...");

    // Settings updating...
    this.settings.subscribe((value) => {
      chrome.storage.local.set({ settings: value });
    });

    // Card updating...
    this.cards.subscribe((value) => {
      chrome.storage.local.set({ cards: value });
      this.mapCards(); // Map again...
    });

    Logger.success("Storage listeners are set up!");
  }

  static mapCards() {
    const cards = get(this.cards);
    const newMap: Record<string, PrettyCard> = {};

    for (const card of Object.values(cards)) {
      if (card.name) newMap[card.name.toLowerCase().trim()] = card;

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
    Logger.success(`Remapped ${Object.keys(newMap).length} triggers!`);
  }

  /* Pretty story card stuff HERE! */
  static syncCard(cachedName: string, latestName: string, type: string = "Class") {
    // Log something.
    Logger.info("Syncing card data...");

    // Grab all the cards.
    const cards = get(this.cards);

    // Get the card with the cached name.
    const card = cards[cachedName];

    // If there is no card then just return.
    if (!card) {
      Logger.error("No cached card found!");
      return;
    }

    // Fix the type.
    card.type = type;

    // Otherwise check for a name mismatch.
    if (cachedName !== latestName) {
      // If so then solve it.
      card.name = latestName;
      this.upsertCard(card);
      this.deleteCard(cachedName); // Delete old.

      // Debug some stuff for it.
      Logger.success(`Solved mismatch.`);
      Logger.info("Old name: " + cachedName);
      Logger.info("New name: " + latestName);
    } else {
      this.upsertCard(card);
    }
  }

  static upsertCard(card: PrettyCard) {
    if (!card.name) return;
    this.cards.update((cards) => {
      cards[card.name] = card;
      return cards;
    });
  }

  static containsCard(name: string) {
    return get(this.cards).hasOwnProperty(name);
  }

  static deleteCard(name: string) {
    this.cards.update((cards) => {
      delete cards[name];
      return cards;
    });
  }
}

export const settings = DUIStorage.settings;
export const cards = DUIStorage.cards;
