<!-- Pretty Panel HERE! -->
<script lang="ts">
  import { fade, fly, panelState, SettingsContent, Topbar, WorldContent } from "@/shared";
  import PrettyEditor from "./PrettyEditor.svelte";

  // NOTE: If the tabs ever get changed then this needs to change too.
  const Content = $derived.by(() => {
    const map: Record<string, any> = {
      World: WorldContent,
      Editor: PrettyEditor,
      Settings: SettingsContent,
    };
    return map[panelState.tab];
  });
</script>

{#if panelState.visible}
  <div class="dui-backdrop" transition:fade={{ duration: 200 }}>
    <div class="dui-panel" transition:fly={{ duration: 150, y: 64 }}>
      <Topbar />

      <div
        class="dui-panel-content"
        onwheel={(event: WheelEvent) => event.stopPropagation()}
        ontouchstart={(event: TouchEvent) => event.stopPropagation()}
        ontouchmove={(event: TouchEvent) => event.stopPropagation()}
      >
        <Content />
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .dui-backdrop {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    inset: 0;
    z-index: 100;
    backdrop-filter: blur(32px);
  }

  .dui-panel {
    display: flex;
    position: fixed;
    width: 90%;
    max-width: 512px;
    height: 95vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--dui-font-interface);
    background-color: var(--dui-color-alpha);
    border: 1px solid var(--dui-color-echo);
    border-radius: var(--dui-size-delta);
    flex-direction: column;
    overflow: hidden;
  }

  .dui-panel-content {
    gap: var(--dui-size-bravo);
    padding: var(--dui-size-charlie);
    overflow-y: scroll !important;
    flex: 1 1 0;
    min-height: 0;
  }
</style>
