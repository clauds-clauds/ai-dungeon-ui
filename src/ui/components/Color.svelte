<!-- Color Scripting HERE! -->
<script lang="ts">
  // Svelte Imports HERE!
  import { fade } from "svelte/transition";

  // DungeonUI Imports HERE!
  import type { Generic } from "@/lib/types";

  // Interface HERE!
  interface Color extends Generic {
    value?: string;
  }

  // Props HERE!
  let { value = $bindable() }: Color = $props();
</script>

<!-- Color Layout HERE! -->
<div class="dungeon-ui-color" transition:fade={{ duration: 150 }}>
  <input type="color" bind:value style="filter: drop-shadow(0 0 48px {value});" />
</div>

<!-- Color Styling HERE! -->
<style lang="scss">
  .dungeon-ui-color {
    display: flex;
    padding: var(--d-ui-padding-small);
    background-color: var(--d-ui-color-core-charlie);
    border-radius: var(--d-ui-border-radius-medium);

    input {
      flex: 1;
      aspect-ratio: var(--d-ui-aspect-ratio-square);
      border-radius: var(--d-ui-border-radius-medium);
      background-color: red;
    }
  }

  input[type="color"]::-moz-color-swatch {
    border: none;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 0;
  }

  input[type="color"]::-webkit-color-swatch {
    border: none;
  }
</style>
