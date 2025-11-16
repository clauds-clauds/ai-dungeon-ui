<!-- Gallery scripting HERE! -->
<script lang="ts">
  // Imports HERE!
  import type { GenericComponent } from "@/shared/types";
  import Image from "./Image.svelte";
  import { Utils } from "@/shared";

  // Interface HERE!
  interface Gallery extends GenericComponent {
    data: string[];
  }

  // Props HERE!
  let { data = $bindable() }: Gallery = $props();
</script>

<!-- Gallery layout HERE! -->
<div class="dui-gallery">
  <div class="dui-grid">
    <Image
      placeholder={true}
      onclick={async () => {
        const dataUrl = await Utils.requestFileData("image");
        if (!dataUrl) return;
        data = [...(data ?? []), dataUrl];
      }}
    />

    {#each data as src}
      <Image
        {src}
        onclick={() => {
          data = data.filter((_, i) => i !== data.indexOf(src));
        }}
      />
    {/each}
  </div>
</div>

<!-- Gallery styling HERE! -->
<style lang="scss">
  .dui-gallery {
    padding: var(--dui-padding-medium);
    border-radius: var(--dui-border-radius-large);
    background-color: var(--dui-color-basic-charlie);
  }

  .dui-grid {
    display: grid;
    grid-area: var(--dui-gap-small);
    grid-template-columns: repeat(auto-fit, minmax(32px, 96px));
  }
</style>
