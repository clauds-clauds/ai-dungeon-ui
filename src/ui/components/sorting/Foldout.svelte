<!-- Foldout Scripting HERE! -->
<script lang="ts">
  // Svelte Imports HERE!
  import { slide } from "svelte/transition";

  // DungeonUI Imports HERE!
  import type { Generic } from "@/lib/types";

  // Interface HERE!
  interface Foldout extends Generic {
    expanded?: boolean;
    nested?: boolean;
  }

  let { icon, label, description, children, expanded = false, nested = false }: Foldout = $props();
</script>

<!-- Foldout Layout HERE! -->
<div class="dungeon-ui-foldout" class:nested>
  <button class="dungeon-ui-expansion" onclick={() => (expanded = !expanded)} aria-expanded={expanded}>
    <div class="dungeon-ui-area">
      <span class="dungeon-ui-label">
        <span class="dungeon-ui-icon">{icon}</span>
        {label}
      </span>
      {#if description !== ""}
        <span class="dungeon-ui-description">{description}</span>
      {/if}
    </div>
    <div class="dungeon-ui-right">
      <div class="dungeon-ui-arrow-area">
        <span class="dungeon-ui-arrow dungeon-ui-icon" class:expanded>arrow_drop_down</span>
      </div>
    </div>
  </button>

  {#if expanded}
    <div class="dungeon-ui-content" in:slide={{ duration: 150 }} out:slide={{ duration: 100 }}>
      {@render children?.()}
    </div>
  {/if}
</div>

<!-- Foldout Styling HERE! -->
<style lang="scss">
  .dungeon-ui-foldout {
    width: 100%;
    border-radius: var(--d-ui-border-radius-large);
    overflow: hidden;
    font-size: var(--d-ui-font-size-medium);
    background-color: var(--d-ui-color-core-beta);
    color: var(--d-ui-color-core-delta);

    &.nested {
      background-color: var(--d-ui-color-core-charlie);
    }
  }

  .dungeon-ui-expansion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: var(--d-ui-padding-medium);
    background: none;
    color: inherit;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
  }

  .dungeon-ui-area {
    display: flex;
    flex-direction: column;
    gap: var(--d-ui-gap-small);

    & .dungeon-ui-icon {
      /* Fix this later. */
      font-size: 18px;
    }
  }

  .dungeon-ui-label {
    display: flex;
    /* Fix this later. */
    letter-spacing: -0.75px;
    align-items: center;
    gap: var(--d-ui-gap-tiny);
  }

  .dungeon-ui-description {
    color: var(--d-ui-color-core-echo);
  }

  .dungeon-ui-right {
    display: flex;
    align-items: center;
    gap: var(--d-ui-gap-medium);
    margin-left: auto;
  }

  .dungeon-ui-arrow-area {
    display: flex;
    align-items: center;
  }

  .dungeon-ui-arrow {
    font-size: var(--d-ui-font-size-huge);
    color: var(--d-ui-color-subtle);
    transition: transform var(--d-ui-animation-duration-medium) var(--d-ui-animation-ease-in-out);

    &.expanded {
      transform: rotate(180deg);
    }
  }

  .dungeon-ui-content {
    padding: var(--d-ui-padding-medium);
    border-top: 1pt solid var(--d-ui-color-core-alpha);
    display: flex;
    gap: var(--d-ui-gap-medium);
    flex-direction: column;
  }
</style>
