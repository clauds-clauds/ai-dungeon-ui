<script lang="ts">
  import type { GenericComponent } from "@/shared/types";
  import Image from "./Image.svelte";
  import { Utils } from "@/shared";

  interface Gallery extends GenericComponent {
    data: string[];
  }
  let { data = $bindable() }: Gallery = $props();
</script>

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

<style lang="scss">
  .dui-gallery {
    padding: var(--dui-padding-medium);
    border-radius: var(--dui-border-radius-large);
    background-color: var(--dui-color-basic-charlie);
  }

  .dui-grid {
    display: grid;
    gap: var(--dui-gap-small);
    grid-template-columns: repeat(auto-fill, 96px);
  }
</style>
