/**
 * The reactive current UI state.
 */
export const uiState = $state({
  visible: false,
  tab: "WORLD",
  subtab: "ENTITIES",
});

interface EntityState {
  editorIndex: number;
  triggers: string[];
}

export const entityState = $state<EntityState>({
  editorIndex: -1,
  triggers: [],
});

interface ImageGenState {
  generating: boolean;
  prompt: string;
  image: string;
}

export const imageGenState = $state<ImageGenState>({
  generating: false,
  prompt: "",
  image: "",
});

export const travellerState = $state({
  text: "",
});
