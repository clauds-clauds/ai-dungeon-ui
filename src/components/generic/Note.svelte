<!-- Note HERE! -->
<script lang="ts">
  interface Note {
    description?: string;
    children: any;
  }

  let { description = "This is a note which explains so much!", children }: Note = $props();
</script>

<div class="dui-note">
  <span class="dui-note-description">{description}</span>
  {@render children?.()}
</div>

<style lang="scss">
  .dui-note {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: var(--dui-color-juliett);
  }

  .dui-note-description {
    min-width: 0;
    white-space: normal;
    overflow-wrap: anywhere;
    max-width: 75%;
    font-size: var(--dui-font-size-charlie);
  }
</style>
