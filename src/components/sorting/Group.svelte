<script lang="ts">
  interface Group {
    label: string;
    children: any;
  }

  let { label, children }: Group = $props();
</script>

<div class="dui-group">
  <span>{label}</span>
  {@render children?.()}
</div>

<style lang="scss">
  .dui-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--dui-gap-small);
    color: var(--dui-color-core-delta);
    font-family: var(--dui-font-interface);
    font-size: var(--dui-font-size-small);
    user-select: none;

    span {
      padding-left: var(--dui-size-tiny);
      text-transform: uppercase;
      letter-spacing: 0.1px;
    }
  }
</style>
