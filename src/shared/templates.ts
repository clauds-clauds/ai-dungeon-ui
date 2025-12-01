import EditorPage from "@/components/pages/EditorPage.svelte";
import type { Tab } from "./types";
import WorldPage from "@/components/pages/WorldPage.svelte";
import SettingsPage from "@/components/pages/SettingsPage.svelte";

export const tabs: Record<string, Tab> = {
  WORLD: {
    icon: "planet",
    page: WorldPage,
    pills: [
      { icon: "style", label: "STORY CARDS" },
      { icon: "save", label: "STORAGE" },
    ],
  },
  EDITOR: {
    icon: "format_paint",
    page: EditorPage,
    pills: [],
    hidden: true,
  },
  SETTINGS: {
    icon: "settings",
    page: SettingsPage,
    pills: [
      { icon: "tune", label: "GENERAL" },
      { icon: "terminal", label: "DEVELOPER" },
    ],
  },
};
