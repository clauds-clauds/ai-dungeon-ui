<script lang="ts">
  import { extensionState } from "@/shared/state.svelte";

  interface Tab {
    icon?: string;
    label?: string;
    exit?: boolean;
  }

  let { icon, label, exit }: Tab = $props();

  function onclick() {
    if (exit) extensionState.showDevPanel = false;
    else extensionState.currentTab = label?.toUpperCase() || "WORLD";
  }
</script>

<button
  class="dui-tab"
  class:flex={!exit}
  class:compact={exit}
  class:select={extensionState.currentTab === label?.toUpperCase()}
  {onclick}
>
  <span class="dui-icon">{icon}</span>
  {label}
</button>

<style lang="scss">
  .dui-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--dui-gap-small);
    border-bottom: 4px solid transparent;
    user-select: none;
    cursor: pointer;

    &:hover {
      background-color: var(--dui-color-core-beta);
      border-bottom: 4px solid var(--dui-color-core-charlie);
    }

    &.compact {
      min-width: var(--dui-size-huge);
      min-height: var(--dui-size-huge);
      aspect-ratio: var(--dui-aspect-ratio-square);
    }

    &.flex {
      flex: 1;

      .dui-icon {
        color: var(--dui-color-core-delta);
      }
    }

    &.select {
      border-bottom: 4px solid var(--dui-color-theme);
    }

    .dui-icon {
      font-size: var(--dui-icon-size-large);
    }
  }
</style>
