<!-- Slider Scripting HERE! -->
<script lang="ts">
  // DungeonUI Imports HERE!
  import type { Generic } from "@/lib/types";
  import { Utils } from "@/lib/utils";

  // Interface HERE!
  interface Slider extends Generic {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
  }

  // Props HERE!
  let { min = 0, max = 100, step = 1, value = $bindable(50) }: Slider = $props();

  // The current calculated percentage along the path.
  const percentage = $derived((((value as number) - min) / (max - min)) * 100);

  // Updates the value whenever the stuff changes.
  $effect(() => {
    const clampedValue = Utils.clamp(value as number, min, max);
    if (clampedValue !== value) value = clampedValue;
  });
</script>

<!-- Slider Layout HERE! -->
<div class="dungeon-ui-slider">
  <input type="number" class="dungeon-ui-value" {min} {max} {step} bind:value />
  <input type="range" {min} {max} {step} bind:value style="--progress: {percentage}%" />
</div>

<style lang="scss">
  .dungeon-ui-slider {
    display: flex;
    align-items: center;
    gap: var(--d-ui-gap-medium);
  }

  .dungeon-ui-value {
    background-color: var(--d-ui-color-core-charlie);
    color: var(--d-ui-color-core-echo);
    border-radius: var(--d-ui-border-radius-medium);
    padding: var(--d-ui-padding-small) 0;
    width: var(--d-ui-size-large);
    aspect-ratio: var(--d-ui-aspect-ratio-square);
    text-align: center;
    font-family: inherit;
  }

  .dungeon-ui-value::-webkit-outer-spin-button,
  .dungeon-ui-value::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    background: transparent;
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -8px;
    background-color: white;
    height: 20px;
    width: 20px;
    border-radius: var(--d-ui-border-radius-full);
    transition: transform var(--d-ui-animation-duration-fast) var(--d-ui-animation-ease-in-out);
  }

  input[type="range"]::-moz-range-thumb {
    background-color: white;
    height: 20px;
    width: 20px;
    border-radius: var(--d-ui-border-radius-full);
    border: none;
    transition: transform var(--d-ui-animation-duration-fast) var(--d-ui-animation-ease-in-out);
  }

  input[type="range"]:active::-webkit-slider-thumb {
    transform: scale(1.35);
  }

  input[type="range"]:active::-moz-range-thumb {
    transform: scale(1.35);
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: var(--d-ui-border-radius-small);
    background: linear-gradient(to right, var(--d-ui-color-theme) var(--progress), rgba(0, 0, 0, 0.3) var(--progress));
  }

  input[type="range"]::-moz-range-track {
    height: 4px;
    border-radius: var(--d-ui-border-radius-small);
    background: linear-gradient(to right, var(--d-ui-color-theme) var(--progress), rgba(0, 0, 0, 0.3) var(--progress));
  }
</style>
