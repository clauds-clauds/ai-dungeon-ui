<script lang="ts">
  import { slide } from "svelte/transition";

  interface Foldout {
    icon?: string;
    label?: string;
    description?: string;
    children?: any;
    expanded?: boolean;
    nested?: boolean;
  }

  let { icon, label, description, children, expanded = false, nested = false }: Foldout = $props();
</script>

<div class="dui-foldout">
  <button class="dui-expansion" onclick={() => (expanded = !expanded)} aria-expanded={expanded}>
    <div class="dui-title-content">
      <span class="dui-label">
        <span class="dui-icon">{icon}</span>
        {label}
      </span>
      {#if description !== ""}
        <span class="dui-description">{description}</span>
      {/if}
    </div>
    <div class="dui-right">
      <div class="dui-arrow-content">
        <span class="dui-arrow dui-icon" class:expanded>arrow_drop_down</span>
      </div>
    </div>
  </button>

  {#if expanded}
    <div class="dui-content" in:slide={{ duration: 150 }} out:slide={{ duration: 100 }}>
      {@render children?.()}
    </div>
  {/if}
</div>

<style lang="scss">
  .dui-foldout {
    width: 100%;
    border-radius: var(--dui-border-radius-large);
    overflow: hidden;
    font-size: var(--dui-font-size-medium);
    background-color: var(--dui-color-core-beta);
    color: var(--dui-color-core-delta);
    font-family: var(--dui-font-interface);
  }

  .dui-expansion {
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

  .dui-title-content {
    display: flex;
    flex-direction: column;
    gap: var(--dui-gap-small);

    & .dui-icon {
      font-size: 18px;
    }
  }

  .dui-label {
    display: flex;
    letter-spacing: -0.75px;
    align-items: center;
    gap: var(--dui-gap-tiny);
  }

  .dui-description {
    color: var(--dui-color-core-echo);
  }

  .dui-right {
    display: flex;
    align-items: center;
    gap: var(--dui-gap-medium);
    margin-left: auto;
  }

  .dui-arrow-content {
    display: flex;
    align-items: center;
  }

  .dui-arrow {
    font-size: var(--dui-font-size-huge);
    color: var(--dui-color-subtle);
    transition: transform var(--dui-animation-duration-medium) var(--dui-animation-ease-in-out);

    &.expanded {
      transform: rotate(180deg);
    }
  }

  .dui-content {
    padding: var(--dui-padding-medium);
    border-top: 1pt solid var(--dui-color-core-alpha);
    display: flex;
    gap: var(--dui-gap-medium);
    flex-direction: column;
  }
</style>
