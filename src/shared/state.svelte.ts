import { tabs } from "./templates";
import type { StoryCard } from "./types";

export const extensionState = $state({
  showDevPanel: false,
  currentTab: Object.keys(tabs)[0],
  currentSubtab: "",
  map: {} as Record<string, StoryCard>,
});
