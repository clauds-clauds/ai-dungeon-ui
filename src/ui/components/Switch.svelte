<!-- Switch Scripting HERE! -->
<script lang="ts">
  import type { Generic } from "@/lib/types";

  // Svelte Imports HERE!
  // Interface HERE!
  interface Switch extends Generic {
    checked?: boolean;
  }

  // Props HERE!
  let { checked = $bindable() }: Switch = $props();
</script>

<!-- NAME Layout HERE! -->
<label class="dungeon-ui-switch">
  <input type="checkbox" bind:checked />
  <span class="dungeon-ui-slider"></span>
</label>

<!-- NAME Styling HERE! -->
<style lang="scss">
  .dungeon-ui-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
  }

  .dungeon-ui-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .dungeon-ui-slider {
    position: absolute;
    inset: 0;
    /* TODO: FIX THIS TOO! */
    background-color: #333;
    border-radius: var(--d-ui-border-radius-large);
    transition: background var(--d-ui-animation-duration-medium);
    cursor: pointer;
  }

  .dungeon-ui-slider::before {
    content: "";
    position: absolute;
    /* What the fuck is this?!?! Stop being lazy and fix this later!!! */
    left: 1px;
    top: 1px;
    width: 22px;
    height: 22px;
    aspect-ratio: var(--d-ui-aspect-ratio-square);
    background: #fff;
    border-radius: var(--d-ui-border-radius-full);
    transition: transform var(--d-ui-animation-duration-medium);
  }

  .dungeon-ui-switch input:checked + .dungeon-ui-slider {
    background-color: var(--d-ui-color-theme);
  }

  .dungeon-ui-switch input:checked + .dungeon-ui-slider::before {
    transform: translateX(20px);
  }
</style>
