<!-- Foldout HERE! -->
<script lang="ts">
  import { fade, slide } from "@/shared";

  interface Foldout {
    icon?: string;
    label?: string;
    children?: any;
    description?: string;
    expanded?: boolean;
    blue?: boolean;
  }

  let { icon, label, description, children, expanded = false, blue = false }: Foldout = $props();
</script>

<div class="dui-foldout" in:fade={{ duration: 150 }}>
  <button class="dui-foldout-button" onclick={() => (expanded = !expanded)} aria-expanded={expanded}>
    <div class="dui-foldout-text-content" style:color={!blue ? "var(--dui-color-orange)" : "var(--dui-color-blue)"}>
      <span class="dui-foldout-label">
        <span class="dui-icon">{icon}</span>
        {label}
      </span>

      {#if description && description !== ""}
        <span class="dui-foldout-description">{description}</span>
      {/if}
    </div>

    <div class="dui-foldout-end-content">
      <div class="dui-foldout-arrow-container">
        <span class="dui-foldout-arrow dui-icon" class:expanded>chevron_right</span>
      </div>
    </div>
  </button>

  {#if expanded}
    <div class="dui-foldout-content" transition:slide={{ duration: 150 }}>
      {@render children?.()}
    </div>
  {/if}
</div>

<style lang="scss">
  .dui-foldout {
    width: 100%;
    overflow: hidden;
    color: var(--dui-color-juliett);
  }

  .dui-foldout-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: var(--dui-size-charlie);
    background: none;
    color: inherit;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
  }

  .dui-foldout-text-content {
    display: flex;
    flex-direction: column;
    gap: var(--dui-size-bravo);
  }

  .dui-foldout-label {
    display: flex;
    align-items: center;
    gap: var(--dui-size-bravo);
    font-size: var(--dui-font-size-charlie);
    font-family: var(--dui-font-interface);
  }

  .dui-foldout-description {
    color: var(--dui-color-india);
    font-size: var(--dui-font-size-bravo);
    text-transform: uppercase;
  }

  .dui-foldout-end-content {
    display: flex;
    align-items: center;
    gap: var(--dui-size-charlie);
    margin-left: auto;
  }

  .dui-foldout-arrow-container {
    display: flex;
    align-items: center;
  }

  .dui-foldout-arrow {
    color: var(--dui-color-india);
    font-size: var(--dui-font-size-foxtrot);
    transition: transform var(--dui-animation-duration-delta) ease-in-out;

    &.expanded {
      transform: rotate(90deg);
    }
  }

  .dui-foldout-content {
    padding: var(--dui-size-bravo);
    border-top: 1px solid var(--dui-color-echo);
    display: flex;
    gap: var(--dui-size-charlie);
    flex-direction: column;
  }
</style>
