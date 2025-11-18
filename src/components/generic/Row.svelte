<script lang="ts">
  import type { GenericComponent } from "@/shared/types";

  interface Row extends GenericComponent {}
  let { children }: Row = $props();
</script>

<div class="dui-row">
  {@render children?.()}
</div>

<style lang="scss">
  .dui-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
    align-items: start;
    gap: var(--dui-gap-medium);
    align-items: center;
  }
</style>
