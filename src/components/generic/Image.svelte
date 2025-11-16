<!-- Image scripting HERE! -->
<script lang="ts">
  // Imports HERE!
  import type { GenericComponent } from "@/shared/types";

  // Interface HERE!
  interface Image extends GenericComponent {
    src?: string;
    placeholder?: boolean;
    onclick?: () => void;
  }

  // Props HERE!
  let { src, placeholder, onclick }: Image = $props();
</script>

<!-- Image layout HERE! -->
<button class="dui-button" class:placeholder {onclick}>
  {#if src}
    <img {src} alt="" class="dui-image" />
  {/if}
  <span class="dui-icon">{placeholder ? "w_add" : "w_trash"}</span>
</button>

<!-- Image styling HERE! -->
<style lang="scss">
  .dui-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    border-radius: var(--dui-border-radius-large);
    overflow: hidden;
    color: var(--dui-color-blue);
    border: 4px solid transparent;
    cursor: pointer;

    &:hover {
      border-color: var(--dui-color-blue);

      &.placeholder {
        border-color: var(--dui-color-theme);
      }

      .dui-image {
        filter: brightness(50%) blur(4px) grayscale(50%);
        backdrop-filter: brightness(50%);
      }

      .dui-icon {
        opacity: 100%;
      }
    }

    &.placeholder {
      color: var(--dui-color-orange);
      background-color: rgb(from var(--dui-color-orange) r g b / 0.1);

      .dui-icon {
        opacity: 100%;
      }
    }

    .dui-image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
      z-index: 0;
      transition: all var(--dui-animation-duration-medium) ease-in-out;
    }

    .dui-icon {
      opacity: 0%;
      position: relative;
      z-index: 1;
      font-size: var(--dui-font-size-large-small);
      transition: all var(--dui-animation-duration-medium) ease-in-out;
    }
  }
</style>
