<!-- Color Scripting HERE! -->
<script lang="ts">
  import type { GenericComponent } from "@/shared/types";
  import { fade } from "svelte/transition";

  interface Color extends GenericComponent {
    value?: string;
  }

  let { value = $bindable() }: Color = $props();
</script>

<div class="dui-color" transition:fade={{ duration: 150 }}>
  <input type="color" bind:value style="filter: drop-shadow(0 0 48px {value});" />
</div>

<!-- Color Styling HERE! -->
<style lang="scss">
  .dui-color {
    display: flex;
    padding: var(--dui-padding-small);
    background-color: var(--dui-color-basic-charlie);
    border-radius: var(--dui-border-radius-medium);
    min-width: 96px;
    min-height: 96px;
    margin-left: auto;

    input {
      flex: 1;
      aspect-ratio: var(--dui-aspect-ratio-square);
      border-radius: var(--dui-border-radius-medium);
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
