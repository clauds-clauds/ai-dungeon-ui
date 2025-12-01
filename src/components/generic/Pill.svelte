<script lang="ts">
  import { extensionState } from "@/shared/state.svelte";

  interface Pill {
    icon?: string;
    label?: string;
    move?: boolean;
  }

  let { icon, label, move }: Pill = $props();

  function onclick() {
    if (move) return;
    extensionState.currentSubtab = label?.toUpperCase() || "";
  }
</script>

<button class="dui-pill" class:select={extensionState.currentSubtab === label?.toUpperCase()} class:move {onclick}>
  <span class="dui-icon">{icon}</span>
  {label}
</button>

<style lang="scss">
  .dui-pill {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--dui-color-core-beta);
    border-radius: var(--dui-border-radius-giga);
    padding: var(--dui-padding-small) var(--dui-padding-medium);
    gap: var(--dui-gap-small);
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;

    &:hover {
      background-color: var(--dui-color-core-charlie);
      border: 1px solid rgba(#ffffff, 0.1);
    }

    &.move {
      cursor: grabbing;
    }

    &.select {
      filter: invert(1);

      .dui-icon {
        color: var(--dui-color-core-delta);
      }
    }
  }
</style>
