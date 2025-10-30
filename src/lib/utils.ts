// Svelte Imports HERE!
import { get } from "svelte/store";

// DungeonUI Imports HERE!
import { BorderStyleChoice, EntityType, HighlightLimitation, type Entity } from "./types";
import { entityState, uiState } from "./state.svelte";
import { entities, settings } from "./storage";
import { Dev } from "./dev";

/**
 * `Utils` is a handy helper class which contains random stuff.
 */
export class Utils {
  /**
   * Get the current version of DungeonUI.
   * @returns The current version as a string.
   */
  static getVersion(): string {
    return chrome.runtime.getManifest().version;
  }

  /**
   * Get the current adventure ID as seen in the URL.
   * @returns The current adventure ID as a string.
   */
  static getAdventureId(): string {
    const match = window.location.pathname.match(/adventure\/([^\/]+)/);
    return match ? match[1] : "N/A";
  }

  static forceNavigate(tab: string, subtab?: string) {
    uiState.tab = tab;
    if (subtab) uiState.subtab = subtab;
  }

  /**
   * Clamps a number between a specific min and max value.
   * @param num The number to clamp.
   * @param min The lowest possible value.
   * @param max The highest possible value.
   * @returns // The clamped number.
   */
  static clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }

  static escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  static markdownPattern(): string[] {
    return ["(\\*\\*(.*?)\\*\\*)", "(\\*(.*?)\\*)", "(\\+\\+(.*?)\\+\\+)", "(~~(.*?)~~)"];
  }

  static enumValues<T extends Record<string, string | number>>(e: T): (string | number)[] {
    return Object.values(e);
  }

  static toChoices<T extends Record<string, string | number>>(e: T): string[] {
    return Object.values(e).filter((v): v is string => typeof v === "string");
  }

  /**
   * Creates an input element which then prompts for specific file input.
   * @param fileType The valid allowed file types.
   * @returns The file or `null` if nothing was loaded.
   */
  static async requestFile(fileType: string): Promise<File | null> {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = `${fileType}/*`;

      input.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files ? target.files[0] : null;
        resolve(file);
      };

      input.style.display = "none";
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    });
  }

  static async downloadImage(base64: string, filename: string) {
    if (!base64) return;

    const response = await fetch(base64);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Converts a file into a base64 string which can then be used by other things.
   * @param file The file to convert.
   * @returns The file data as base64.
   */
  static async convertFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Prompts for a file, converts it, then returns the base64 of it.
   * @param fileType The allowed file type.
   * @returns The converted file as base64 or `null` if nothing was loaded.
   */
  static async requestFileData(fileType: string): Promise<string | null> {
    const file = await this.requestFile(fileType);
    if (!file) return null;
    return this.convertFile(file);
  }

  /**
   * Creates and saves a new entity.
   */
  static addEntity(): void {
    // Create a new entity instance.
    const entity: Entity = {
      // Basics HERE!
      id: crypto.randomUUID(),
      adventureId: this.getAdventureId(),

      // Story Card Stuff HERE!
      name: "",
      entry: "",
      type: EntityType.Character,
      triggers: "",

      // Art HERE!
      icons: [],
      iconIndex: 0,
      graphics: [],
      graphicIndex: 0,

      // Styling HERE!
      color: get(settings).colorTheme,
      borderColor: get(settings).colorTheme,
      borderStyle: BorderStyleChoice.Solid,
      limitation: HighlightLimitation.None,
    };

    // Print something boring.
    Dev.say(`Entity ${entity.id} has been created.`);

    // Add it to storage and assign the index to the UI state.
    entities.update((currentEntities) => {
      entityState.editorIndex = currentEntities.length;
      return [...currentEntities, entity];
    });
  }

  static findEntityByTrigger(triggerName: string): Entity | undefined {
    const allEntities = get(entities);
    const normalizedName = triggerName.toLowerCase();

    return allEntities.find(
      (e: Entity) =>
        e.name?.toLowerCase() === normalizedName ||
        e.triggers
          ?.split(",")
          .map((t) => t.trim())
          .some((k) => k.toLowerCase() === normalizedName)
    );
  }

  /**
   * Gets the icon with the type of entity.
   * @param type The type of entity.
   * @returns The icon associated with the entity type.
   */
  static getIconForEntityType(type: string) {
    const icons: Record<string, string> = {
      Character: "raven",
      Race: "sword_rose",
      Location: "explore",
      Faction: "castle",
      Custom: "build",
    };
    return icons[type] || "skull";
  }
}
