<!-- Color HERE! -->
<script lang="ts">
  import { fade } from "@/shared";

  interface Color {
    value?: string;
  }

  let { value = $bindable() }: Color = $props();
</script>

<div class="dui-color" in:fade={{ duration: 200 }}>
  <input type="color" bind:value style="filter: drop-shadow(0 0 16px {value});" />
</div>

<style lang="scss">
  .dui-color {
    display: flex;
    padding: var(--dui-size-bravo);
    background-color: var(--dui-color-bravo);
    border-radius: var(--dui-size-charlie);
    min-width: 96px;
    min-height: 96px;

    input {
      flex: 1;
      aspect-ratio: var(--dui-aspect-square);
      border-radius: var(--dui-size-charlie);
      background-color: red;
    }
  }

  input[type="color"]::-moz-color-swatch {
    border: none;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 0;
  }

  input[type="color"]::-webkit-color-swatch {
    border: none;
  }
</style>
