<script lang="ts">
  import { Utils } from "@/shared/utils";

  interface ImageArray {
    data: string[];
  }

  let { data = $bindable() }: ImageArray = $props();
</script>

<div class="dui-image-array">
  <div class="dui-grid">
    <button
      class="dui-image placeholder"
      onclick={async () => {
        const dataUrl = await Utils.requestImage();
        if (!dataUrl) return;
        data = [...(data ?? []), dataUrl];
      }}
    >
      <span class="dui-icon">add_2</span>
    </button>

    {#each data as src}
      <button
        class="dui-image"
        style="background-image: url('{src}')"
        onclick={() => {
          data = data.filter((_, i) => i !== data.indexOf(src));
        }}
      >
        <span class="dui-icon">delete</span>
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
  .dui-image-array {
    padding: var(--dui-padding-medium);
    border-radius: var(--dui-border-radius-medium);
    background-color: var(--dui-color-core-charlie);

    .dui-icon {
      opacity: 0;
      font-size: 24px;
      color: var(--dui-color-theme);
    }
  }

  .dui-grid {
    display: grid;
    gap: var(--dui-gap-small);
    grid-template-columns: repeat(auto-fill, 96px);
  }

  .dui-image {
    border-radius: var(--dui-border-radius-medium);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--dui-padding-medium);
    background-size: cover;
    background-position: center;
    background-color: rgb(from var(--dui-color-theme) r g b / 0.1);
    outline: 2px solid transparent !important;
    aspect-ratio: var(--dui-aspect-ratio-square);
    cursor: pointer;

    &.placeholder {
      .dui-icon {
        opacity: 1;
      }
    }

    &:hover {
      outline-color: var(--dui-color-theme) !important;

      .dui-icon {
        opacity: 1;
      }
    }
  }
</style>
