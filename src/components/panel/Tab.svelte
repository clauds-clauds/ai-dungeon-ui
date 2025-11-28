<!-- Tab HERE! -->
<script lang="ts">
  import { panelState } from "@/shared";

  interface Tab {
    icon: string;
    label: string;
    exit?: boolean;
  }

  let { icon = "skull", label = "error", exit = true }: Tab = $props();
</script>

<button
  class="dui-tab"
  class:exit
  class:selected={label === panelState.tab}
  onclick={() => {
    if (exit) panelState.visible = false;
    else panelState.tab = label;
  }}
>
  <span class="dui-icon">{icon}</span>
  {label}
</button>

<style lang="scss">
  .dui-tab {
    display: flex;
    align-items: center;
    gap: var(--dui-size-bravo);
    border-bottom: 4px solid transparent;
    padding: var(--dui-size-charlie);

    &:hover {
      background-color: var(--dui-color-bravo);
      border-color: var(--dui-color-charlie);

      &.exit {
        border-color: var(--dui-color-orange);
      }
    }

    &.exit {
      margin-left: auto;
    }

    &.selected {
      border-color: var(--dui-color-orange);
    }
  }
</style>
