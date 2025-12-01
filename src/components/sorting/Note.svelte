<script lang="ts">
  interface Note {
    text?: string;
    children: any;
  }

  let { text = "", children }: Note = $props();
</script>

<div class="dui-note">
  <div class="dui-note-content">
    <span class="dui-note-description">{text}</span>
  </div>
  {@render children?.()}
</div>

<style lang="scss">
  .dui-note {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: var(--dui-gap-medium);
    align-items: flex-start;
    color: var(--dui-color-core-delta);
  }

  .dui-note-content {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .dui-note-text {
    min-width: 0;
    white-space: normal;
    overflow-wrap: anywhere;
    max-width: 75%;
    font-size: var(--dui-font-size-medium);
  }
</style>
