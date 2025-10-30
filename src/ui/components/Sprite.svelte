<!-- Sprite Scripting HERE! -->
<script lang="ts">
  import type { Generic } from "@/lib/types";

  // Svelte Imports HERE!
  // DungeonUI Imports HERE!
  // Interface HERE!
  interface Sprite extends Generic {
    src?: string;
    placeholder?: boolean;
  }

  // Props HERE!
  let { src, placeholder, onclick }: Sprite = $props();
</script>

<!-- Sprite Layout HERE! -->
<button class="dungeon-ui-sprite" class:placeholder {onclick}>
  {#if src}
    <img {src} alt="" class="dungeon-ui-sprite-image" />
  {/if}
  <span class="dungeon-ui-icon">{placeholder ? "add" : "bomb"}</span>
</button>

<!-- Sprite Styling HERE! -->
<style lang="scss">
  .dungeon-ui-sprite {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    border-radius: var(--d-ui-border-radius-large);
    overflow: hidden;
    color: var(--d-ui-color-theme-danger);
    border: 4px solid transparent;
    cursor: pointer;

    &:hover {
      border-color: var(--d-ui-color-theme-danger);

      &.placeholder {
        border-color: var(--d-ui-color-theme);
      }

      .dungeon-ui-sprite-image {
        filter: brightness(50%) blur(4px) grayscale(50%);
        backdrop-filter: brightness(50%);
      }

      .dungeon-ui-icon {
        opacity: 100%;
      }
    }

    &.placeholder {
      color: var(--d-ui-color-theme);
      background-color: rgb(from var(--d-ui-color-theme) r g b / 0.1);

      .dungeon-ui-icon {
        opacity: 100%;
      }
    }

    .dungeon-ui-sprite-image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
      z-index: 0;

      transition: all 200ms ease-in-out;
    }

    .dungeon-ui-icon {
      opacity: 0%;
      position: relative;
      z-index: 1;
      font-size: var(--d-ui-icon-size-giga);
      transition: all 200ms ease-in-out;
    }
  }
</style>
