<!-- Color HERE! -->
<script lang="ts">
  import { fade } from "svelte/transition";

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
    padding: var(--dui-padding-small);
    background-color: var(--dui-color-core-charlie);
    border-radius: var(--dui-border-radius-medium);
    height: 96px;
    width: 96px;

    input {
      flex: 1;
      aspect-ratio: var(--dui-aspect-ratio-square);
      border-radius: var(--dui-border-radius-medium);
      background-color: black;
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
