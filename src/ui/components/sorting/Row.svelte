<!-- Row Scripting HERE! -->
<script lang="ts">
  // DungeonUI Imports HERE!
  import type { Generic } from "@/lib/types";

  // Interface HERE!
  interface Row extends Generic {}

  // Props HERE!
  let { minWidth = 64, gap = 16, children }: Row = $props();
</script>

<!-- Row Layout HERE! -->
<div class="dungeon-ui-row" style:grid-template-columns="repeat(auto-fit, minmax({minWidth}px, 1fr));" style:gap="{gap}px">
  {@render children?.()}
</div>

<!-- Row Styling HERE! -->
<style lang="scss">
  .dungeon-ui-row {
    display: grid;
    align-items: start;
  }
</style>
