<!-- Field Scripting HERE! -->
<script lang="ts">
  // Svelte Imports HERE!
  import type { Snippet } from "svelte";

  // DungeonUI Imports HERE!
  import type { Generic } from "@/lib/types";

  // Interface HERE!
  interface Field extends Generic {
    children?: Snippet;
  }

  // Props HERE!
  let { label, children }: Field = $props();
</script>

<!-- Field Layout HERE! -->
<div class="dungeon-ui-field">
  <span>{label}</span>
  {@render children?.()}
</div>

<!-- Field Styling HERE! -->
<style lang="scss">
  .dungeon-ui-field {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--d-ui-gap-small);
    color: var(--d-ui-color-core-delta);

    span {
      user-select: none;
    }
  }
</style>
