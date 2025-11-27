<script lang="ts">
  import type { GenericComponent } from "@/shared/types";

  interface Row extends GenericComponent {
    minWidth?: number;
  }

  let { children, minWidth = 64 }: Row = $props();
</script>

<div class="dui-row" style:grid-template-columns={`repeat(auto-fit, minmax(${minWidth}px, 1fr));`}>
  {@render children?.()}
</div>

<style lang="scss">
  .dui-row {
    display: grid;

    align-items: start;
    gap: var(--dui-gap-medium);
    align-items: center;
  }
</style>
