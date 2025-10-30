<!-- Pill Scripting HERE! -->
<script lang="ts">
  import { uiState } from "@/lib/state.svelte";

  // DungeonUI Imports HERE!
  import type { Generic } from "@/lib/types";

  // Interface HERE!
  interface Pill extends Generic {
    move: boolean;
  }

  // Props HERE!
  let { icon, label, move = false }: Pill = $props();

  function onclick() {
    if (move) return;
    uiState.subtab = label || "";
  }
</script>

<!-- Pill Layout HERE! -->
<button class="dungeon-ui-pill" class:select={uiState.subtab === label} class:move {onclick}>
  <span class="dungeon-ui-icon">{icon}</span>
  {label}
</button>

<!-- Pill Styling HERE! -->
<style lang="scss">
  .dungeon-ui-pill {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--d-ui-color-core-beta);
    border-radius: var(--d-ui-border-radius-giga);
    padding: var(--d-ui-padding-small) var(--d-ui-padding-medium);
    gap: var(--d-ui-gap-small);
    cursor: pointer;
    user-select: none;

    // This is to reserve border space, otherwise it snaps terribly.
    border: 1px solid transparent;

    &:hover {
      background-color: var(--d-ui-color-core-charlie);
      border: 1px solid rgba(#ffffff, 0.1);
    }

    &.move {
      cursor: grabbing;
    }

    &.select {
      filter: invert(1);

      .dungeon-ui-icon {
        color: var(--d-ui-color-core-delta);
      }
    }
  }
</style>
