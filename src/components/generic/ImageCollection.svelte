<script lang="ts">
  import { Utils } from "@/shared";
  import Image from "./Image.svelte";

  interface ImageCollection {
    data: string[];
  }

  let { data = $bindable() }: ImageCollection = $props();
</script>

<div class="dui-image-collection">
  <div class="dui-image-collection-grid">
    <Image
      placeholder={true}
      buttons={[
        {
          icon: "add",
          onclick: async () => {
            const dataUrl = await Utils.requestFileData("image");
            if (!dataUrl) return;
            data = [...(data ?? []), dataUrl];
          },
        },
      ]}
      aspect="1/1"
    />

    {#each data as src}
      <Image
        {src}
        aspect="1/1"
        buttons={[
          {
            icon: "delete_forever",
            onclick: () => {
              data = data.filter((_, i) => i !== data.indexOf(src));
            },
          },
        ]}
      />
    {/each}
  </div>
</div>

<style lang="scss">
  .dui-image-collection {
    padding: var(--dui-size-charlie);
    border-radius: var(--dui-size-charlie);
    background-color: var(--dui-color-bravo);
  }

  .dui-image-collection-grid {
    display: grid;
    gap: var(--dui-size-bravo);
    grid-template-columns: repeat(auto-fill, 96px);
  }
</style>
