<script lang="ts">
  import { Utils } from "@/shared";
  import type { GenericComponent } from "@/shared/types";

  interface Slider extends GenericComponent {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
  }

  let { min = 0, max = 100, step = 1, value = $bindable(50) }: Slider = $props();

  const percentage = $derived((((value as number) - min) / (max - min)) * 100);

  $effect(() => {
    const clampedValue = Utils.clamp(value as number, min, max);
    if (clampedValue !== value) value = clampedValue;
  });
</script>

<div class="dui-slider">
  <input type="number" class="dui-slider-value" {min} {max} {step} bind:value />
  <input type="range" {min} {max} {step} bind:value style="--progress: {percentage}%" />
</div>

<style lang="scss">
  .dui-slider {
    display: flex;
    align-items: center;
    gap: var(--dui-gap-medium);
  }

  .dui-slider-value {
    background-color: var(--dui-color-basic-charlie);
    color: var(--dui-color-basic-echo);
    border-radius: var(--dui-border-radius-medium);
    padding: var(--dui-padding-small) 0;
    width: var(--dui-size-large);
    aspect-ratio: var(--dui-aspect-ratio-square);
    text-align: center;
    font-family: inherit;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
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
    border-radius: var(--dui-border-radius-full);
    transition: transform var(--dui-animation-duration-fast) ease-in-out;
    transform: scale(1.35);
  }

  input[type="range"]::-moz-range-thumb {
    background-color: white;
    height: 20px;
    width: 20px;
    border-radius: var(--dui-border-radius-full);
    border: none;
    transition: transform var(--dui-animation-duration-fast) ease-in-out;
    transform: scale(1.35);
  }

  input[type="range"]:active::-webkit-slider-thumb {
    transform: scale(1.5);
  }

  input[type="range"]:active::-moz-range-thumb {
    transform: scale(1.5);
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: var(--dui-border-radius-small);
    background: linear-gradient(to right, var(--dui-color-orange) var(--progress), rgba(0, 0, 0, 0.3) var(--progress));
  }

  input[type="range"]::-moz-range-track {
    height: 4px;
    border-radius: var(--dui-border-radius-small);
    background: linear-gradient(to right, var(--dui-color-orange) var(--progress), rgba(0, 0, 0, 0.3) var(--progress));
  }
</style>
