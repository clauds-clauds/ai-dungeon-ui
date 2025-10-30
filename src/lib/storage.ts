// Svelte Imports HERE!
import { writable, type Writable } from "svelte/store";

// DungeonUI Imports HERE!
import {
  AspectRatioChoice,
  BorderStyleChoice,
  FormatterChoice,
  GenericChoice,
  HighlightChoice,
  IconResolutionChoice,
  ModelChoice,
  type Entity,
} from "./types";
import { entityState } from "./state.svelte";
import { Dev } from "./dev";

// Default Settings HERE!
export const defaultSettings = {
  /* Feature Stuff HERE! */
  featureTextEffects: true,
  featureRenderer: true,
  featureTooltips: true,

  /* Choice Stuff HERE! */
  choiceFormatter: FormatterChoice.Markdown,
  choiceFont: GenericChoice.Vanilla,
  choiceColorText: GenericChoice.Vanilla,
  choiceHighlight: HighlightChoice.Entity,
  choiceText: GenericChoice.Vanilla,

  /* Icon Stuff HERE! */
  iconResolutionChoice: IconResolutionChoice.Normal,
  iconBorderStyleChoice: BorderStyleChoice.Solid,
  iconSize: 28,
  iconRoundness: 0,
  iconBorderSize: 0,
  iconBorderOpacity: 100,

  tooltipDelay: 200,
  tooltipMaxSize: 512,

  customFont: "",
  customFontTitle: "",

  /* Experimental Stuff HERE! */
  experimentalStoryCardTweaks: true,
  experimentalExtraCustomization: false,

  /* Color Stuff HERE! */
  colorAction: "#7b848c",
  colorResponse: "#ffffff",
  colorStory: "#ffffff",
  colorBorder: "#7b848c",
  colorHighlight: "#f8ae2c",
  colorTheme: "#f8ae2c",
  colorAccent: "#f3194d",

  /* Image Generation Stuff HERE! */
  imageGenEnabled: true,
  imageGenRatio: AspectRatioChoice.LandscapeA,
  imageGenApiKey: "",
  imageGenModel: ModelChoice.Gemini,

  /* Developer Stuff HERE! */
  devVerboseOutput: false,
};

// Export the defaults to a type, which you woulnd't have been able to see without this comment, right?! This comment is crucial, I am so bored rn.
export type Settings = typeof defaultSettings;

/**
 * `Storage` is the class which is responsible for remembering all the thingies you did.
 */
export class Storage {
  // The current usable settings.
  private static _settings: Writable<Settings>;

  // The current stored entities.
  private static _entities: Writable<Entity[]>;

  // The cached triggers of all the entities.
  static _triggers: string[] | undefined;

  static {
    // Load the default values into the stores.
    this._settings = writable<Settings>(defaultSettings);
    this._entities = writable<Entity[]>([]);

    // Load the stored settings and entities from storage.
    chrome.storage.local.get(["settings", "entities"], (result) => {
      if (result.settings) this._settings.set({ ...defaultSettings, ...result.settings });
      if (result.entities) this._entities.set(result.entities);

      // Say something fantastically useful.
      Dev.say("Loaded settings and stuff from storage.");
    });

    // Ensure that the settings get synced-up.
    let settingsTimeout: number;
    this._settings.subscribe((current) => {
      clearTimeout(settingsTimeout);
      settingsTimeout = setTimeout(() => {
        chrome.storage.local.set({ settings: current });
      }, 500);
    });

    // Ensure that the entities get synced-up.
    let entitiesTimeout: number;
    this._entities.subscribe((current) => {
      clearTimeout(entitiesTimeout);
      entitiesTimeout = setTimeout(() => {
        chrome.storage.local.set({ entities: current });
        entityState.triggers = this.cacheTriggers(current);
      }, 200);
    });
  }

  private static cacheTriggers(entities: Entity[]) {
    return [
      ...new Set(
        entities
          .flatMap((entity: Entity) => [
            entity.name,
            ...(entity.triggers ? entity.triggers.split(",").map((t) => t.trim()) : []),
          ])
          .filter(Boolean)
      ),
    ];
  }

  public static deleteEntity(serialId: string): void {
    this._entities.update((currentEntities) => {
      const updatedEntities = currentEntities.filter((entity) => entity.id !== serialId);
      return updatedEntities;
    });
    entityState.editorIndex = -1;
  }

  // Returns the settings, what a surprise.
  public static get settings() {
    return this._settings;
  }

  // Returns the entities, another huge surprise.
  public static get entities() {
    return this._entities;
  }

  public static get triggers() {
    return this._triggers;
  }
}

// Export both the settings and entities so they can be used by other fantastic things. How lovely.
export const settings = Storage.settings;
export const entities = Storage.entities;
export const triggers = Storage.triggers;
