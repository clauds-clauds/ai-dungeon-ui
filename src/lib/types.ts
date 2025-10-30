import type { Component, Snippet } from "svelte";

/* Enums HERE! */
export enum SayType {
  Normal,
  Loud,
}

export enum EntityType {
  Character = "Character",
  Race = "Race",
  Location = "Location",
  Faction = "Faction",
  Custom = "Custom",
}

export enum GenericChoice {
  Vanilla = "Vanilla",
  Custom = "Custom",
}

export enum FormatterChoice {
  Vanilla = "Vanilla",
  Markdown = "Markdown",
}

export enum HighlightChoice {
  Entity = "Entity",
  Global = "Global",
}

export enum HighlightLimitation {
  None = "None",
  ActionOnly = "Action Only",
  StoryOnly = "Story Only",
}

export enum IconResolutionChoice {
  Tiny = "64x64",
  Small = "96x96",
  Normal = "128x128",
  Huge = "256x256",
}

export enum BorderStyleChoice {
  Solid = "Solid",
  Dashed = "Dashed",
  Dotted = "Dotted",
}

export enum ModelChoice {
  Gemini = "google/gemini-2.5-flash-image",
}

export enum AspectRatioChoice {
  LandscapeA = "3:2",
  LandscapeB = "4:3",
  LandscapeC = "16:9",
  LandscapeD = "21:9",
  Square = "1:1",
  PortraitA = "2:3",
  PortraitB = "3:4",
  PortraitC = "9:16",
}

/* Interfaces HERE! */
export interface Entity {
  // Entity Basics HERE!
  id: string;
  adventureId: string;
  name: string;

  // Story Card Stuff HERE!
  entry: string;
  type: string;
  triggers: string;

  // Art HERE!
  icons: string[];
  iconIndex: number;
  graphics: string[];
  graphicIndex: number;

  // Style HERE!
  color: string;
  borderColor: string;
  borderStyle: BorderStyleChoice;
  limitation: HighlightLimitation;
}

export interface Generic {
  icon?: string;
  label?: string;
  description?: string;
  children?: Snippet;
  onclick?: () => void;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  gap?: number;
}

export interface TabTemplate {
  icon?: string;
  id?: string;
  content?: Component;
  pills?: Generic[];
  hidden?: boolean;
}

/* Types HERE! */
export type TextChunk =
  | { type: "text"; content: string }
  | { type: "markdown"; tag: string; content: string }
  | { type: "entity"; entity: Entity; match: string };
