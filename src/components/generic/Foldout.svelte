<!-- Foldout scripting HERE! -->
<script lang="ts">
  // Imports HERE!
  import type { GenericComponent } from "@/shared/types";
  import { fade, slide } from "svelte/transition";

  // Interface HERE!
  interface Foldout extends GenericComponent {
    description?: string;
    expanded?: boolean;
  }

  // Props HERE!
  let { icon, label, description, children, expanded = false }: Foldout = $props();
</script>

<!-- Foldout layout HERE! -->
<div class="dui-foldout" transition:fade={{ duration: 150 }}>
  <button class="dui-button" onclick={() => (expanded = !expanded)} aria-expanded={expanded}>
    <div class="dui-text-container">
      <span class="dui-label">
        <span class="dui-icon">{icon}</span>
        {label}
      </span>

      {#if description && description !== ""}
        <span class="dui-description">{description}</span>
      {/if}
    </div>

    <div class="dui-right-container">
      <div class="dui-arrow-container">
        <span class="dui-arrow dui-icon" class:expanded>chevron_right</span>
      </div>
    </div>
  </button>

  {#if expanded}
    <div class="dui-content-container" transition:slide={{ duration: 150 }}>
      {@render children?.()}
    </div>
  {/if}
</div>

<!-- Foldout styling HERE! -->
<style lang="scss">
  .dui-foldout {
    width: 100%;
    overflow: hidden;
    border-radius: var(--dui-border-radius-medium);
    font-size: var(--dui-font-size-medium-large);
    background-color: var(--dui-color-basic-bravo);
    color: var(--dui-color-basic-delta);
  }

  .dui-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: var(--dui-padding-medium);
    background: none;
    color: inherit;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
  }

  .dui-text-container {
    display: flex;
    flex-direction: column;
    gap: var(--dui-gap-small);
    color: var(--dui-color-blue);
    font-size: var(--dui-font-size-medium-large);
  }

  .dui-label {
    display: flex;
    align-items: center;
    gap: var(--dui-gap-small);
    font-family: var(--dui-font-interface);
  }

  .dui-description {
    color: var(--dui-color-basic-echo);
    font-family: var(--dui-font-family-gameplay);
  }

  .dui-right-container {
    display: flex;
    align-items: center;
    gap: var(--dui-gap-medium);
    margin-left: auto;
  }

  .dui-arrow-container {
    display: flex;
    align-items: center;
  }

  .dui-arrow {
    font-size: 16px;
    transition: transform var(--dui-animation-duration-fast) ease-in-out;

    &.expanded {
      transform: rotate(90deg);
    }
  }

  .dui-content-container {
    padding: var(--dui-padding-medium);
    border-top: 1pt solid var(--dui-color-basic-alpha);
    display: flex;
    gap: var(--dui-gap-medium);
    flex-direction: column;
  }
</style>
