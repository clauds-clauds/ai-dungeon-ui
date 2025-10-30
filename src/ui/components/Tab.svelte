<!-- Tab Scripting HERE! -->
<script lang="ts">
  // DungeonUI Imports HERE!
  import type { Generic } from "@/lib/types";
  import { uiState } from "@/lib/state.svelte";

  // Interface HERE!
  interface Tab extends Generic {
    exit?: boolean;
  }

  // Props HERE!
  let { icon, label, exit }: Tab = $props();

  // Called when the tab is being clicked on. Without this useful comment you would certainly never have been able to ascertain that possibility. Would you?
  function onclick() {
    // If this is the exit tab then simply close the interface.
    if (exit) {
      uiState.visible = false;
    } else {
      // Otherwise change the tab.
      uiState.tab = label?.toUpperCase() || "HOME";
    }
  }
</script>

<!-- Tab Layout HERE! -->
<button
  class="dungeon-ui-tab"
  class:flex={!exit}
  class:compact={exit}
  class:select={uiState.tab === label?.toUpperCase()}
  {onclick}
>
  <span class="dungeon-ui-icon">{icon}</span>
  {label}
</button>

<!-- Tab Style HERE! -->
<style lang="scss">
  .dungeon-ui-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--d-ui-gap-small);
    border-bottom: 4px solid transparent;

    // TODO: Check whether this actually does anything.
    user-select: none;
    cursor: pointer;

    &:hover {
      background-color: var(--d-ui-color-core-beta);
      border-bottom: 4px solid var(--d-ui-color-core-charlie);
    }

    &.compact {
      min-width: var(--d-ui-size-huge);
      min-height: var(--d-ui-size-huge);
      aspect-ratio: var(--d-ui-aspect-ratio-square);
    }

    &.flex {
      flex: 1;

      .dungeon-ui-icon {
        color: var(--d-ui-color-core-delta);
      }
    }

    &.select {
      border-bottom: 4px solid var(--d-ui-color-theme);
    }

    .dungeon-ui-icon {
      font-size: var(--d-ui-icon-size-large);
    }
  }
</style>
