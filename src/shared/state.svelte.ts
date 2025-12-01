import { tabs } from "./templates";
import type { StoryCard } from "./types";

export const extensionState = $state({
  showDevPanel: false,
  currentTab: "WORLD",
  map: {} as Record<string, StoryCard>,
});
