import type { StoryCard } from "./types";

/* State HERE! */
export const panelState = $state({
  visible: false,
  tab: "World",
});

export const editState = $state({
  name: "",
});

export const travelState = $state({
  text: "",
  graphic: "",
});

export const storyState = $state({
  map: {} as Record<string, StoryCard>,
});
