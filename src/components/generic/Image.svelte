<script lang="ts">
  import type { GenericButton } from "@/shared";

  interface Image {
    src?: string;
    aspect?: string;
    placeholder?: boolean;
    buttons?: GenericButton[];
    buttonSize?: number;
  }

  let { src, placeholder = false, aspect = "", buttons, buttonSize = 48 }: Image = $props();
</script>

<div
  class="dui-image"
  class:dui-image-placeholder={placeholder}
  style="background-image: url('{src}')"
  style:aspect-ratio={aspect}
>
  {#each buttons as button}
    <button class="dui-image-button" onclick={button.onclick}>
      <span class="dui-icon" style:font-size={`${buttonSize}px`}>{button.icon}</span>
    </button>
  {/each}
</div>

<style lang="scss">
  .dui-image {
    border-radius: var(--dui-size-charlie);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--dui-size-charlie);
    background-size: cover;
    background-position: center;
    background-color: rgb(from var(--dui-color-blue) r g b / 0.1);
    outline: 2px solid transparent !important;
    transition: all var(--dui-animation-duration-delta) ease-in-out;

    &:hover {
      outline-color: var(--dui-color-blue) !important;

      .dui-image-button {
        opacity: 1;
      }
    }
  }

  .dui-image-placeholder {
    .dui-image-button {
      opacity: 1;
    }
  }

  .dui-image-button {
    aspect-ratio: 1/1;
    color: var(--dui-color-blue);
    opacity: 0;
  }
</style>
