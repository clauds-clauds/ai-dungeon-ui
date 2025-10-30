// DungeonUI Imports HERE!
import type { TabTemplate } from "./types";

// Component Imports HERE!
import Home from "@/ui/tabs/Home.svelte";
import World from "@/ui/tabs/World.svelte";
import Editor from "@/ui/tabs/Editor.svelte";
import Settings from "@/ui/tabs/Settings.svelte";
import Storage from "@/ui/tabs/Storage.svelte";

/**
 * The tab templates which handle which elements get rendered and stuff.
 */
export const tabTemplates: Record<string, TabTemplate> = {
  WORLD: {
    icon: "planet",
    content: World,
    pills: [
      { icon: "category", label: "ENTITIES" },
      { icon: "save", label: "STORAGE" },
    ],
  },
  EDITOR: {
    icon: "construction",
    content: Editor,
    pills: [{ icon: "subject", label: "DETAILS" }],
    hidden: true,
  },
  SETTINGS: {
    icon: "settings_heart",
    content: Settings,
    pills: [
      { icon: "tune", label: "GENERAL" },
      { icon: "data_object", label: "DEVELOPER" },
    ],
  },
  STORAGE: {
    icon: "save",
    content: Storage,
    hidden: true,
  },
};
