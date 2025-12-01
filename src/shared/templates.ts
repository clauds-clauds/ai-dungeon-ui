import WorldContent from "@/components/content/WorldContent.svelte";
import type { Tab } from "./types";

export const tabs: Record<string, Tab> = {
  WORLD: {
    icon: "planet",
    content: WorldContent,
    pills: [
      { icon: "category", label: "STORY CARDS" },
      { icon: "save", label: "STORAGE" },
    ],
  },
};
