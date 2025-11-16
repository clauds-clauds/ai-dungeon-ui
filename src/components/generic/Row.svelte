<!-- Row scripting HERE! -->
<script lang="ts">
  // Imports HERE!
  import type { GenericComponent } from "@/shared/types";

  // Interface HERE!
  interface Row extends GenericComponent {}

  // Props HERE!
  let { children }: Row = $props();
</script>

<!-- Row layout HERE! -->
<div class="dui-row">
  {@render children?.()}
</div>

<!-- Row styling HERE! -->
<style lang="scss">
  .dui-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
    align-items: start;
    gap: var(--dui-gap-medium);
  }
</style>
