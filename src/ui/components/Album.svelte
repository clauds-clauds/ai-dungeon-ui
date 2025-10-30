<!-- Album Scripting HERE! -->
<script lang="ts">
  import { Utils } from "@/lib/utils";
  import Sprite from "./Sprite.svelte";

  // Svelte Imports HERE!
  // DungeonUI Imports HERE!
  // Interface HERE!
  interface Album {
    data: string[];
  }

  // Props HERE!
  let { data = $bindable() }: Album = $props();
</script>

<!-- Album Layout HERE! -->
<div class="dungeon-ui-album">
  <div class="dungeon-ui-album-grid">
    <Sprite
      placeholder={true}
      onclick={async () => {
        const dataUrl = await Utils.requestFileData("image");
        if (!dataUrl) return;
        data = [...(data ?? []), dataUrl];
      }}
    />

    {#each data as src}
      <Sprite
        {src}
        onclick={() => {
          data = data.filter((_, i) => i !== data.indexOf(src));
        }}
      />
    {/each}
  </div>
</div>

<!-- Album Styling HERE! -->
<style lang="scss">
  .dungeon-ui-album {
    padding: var(--d-ui-padding-medium);
    border-radius: var(--d-ui-border-radius-large);
    background-color: var(--d-ui-color-core-charlie);
  }

  .dungeon-ui-album-grid {
    display: grid;
    gap: var(--d-ui-gap-small);
    grid-template-columns: repeat(auto-fit, minmax(32px, 96px));
  }
</style>
