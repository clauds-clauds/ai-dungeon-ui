<script lang="ts">
  interface Row {
    children?: any;
  }

  let { children }: Row = $props();
</script>

<div class="dui-row">
  {@render children?.()}
</div>

<style lang="scss">
  .dui-row {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: var(--dui-gap-small);
  }
</style>
