<!-- Note HERE! -->
<script lang="ts">
  interface Note {
    description?: string;
    important?: string;
    children: any;
  }

  let { description = "This is a note which explains so much!", important = "", children }: Note = $props();
</script>

<div class="dui-note">
  <div class="dui-note-content">
    <span class="dui-note-description">{description}</span>
    <span class="dui-note-important">{important}</span>
  </div>
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

  .dui-note-content {
    display: flex;
    flex-direction: column;
  }

  .dui-note-description {
    min-width: 0;
    white-space: normal;
    overflow-wrap: anywhere;
    max-width: 75%;
    font-size: var(--dui-font-size-charlie);
  }

  .dui-note-important {
    color: var(--dui-color-orange);
    font-size: var(--dui-font-size-bravo);
  }
</style>
