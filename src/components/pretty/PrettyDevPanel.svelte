<script lang="ts">
  import { extensionState } from "@/shared/state.svelte";
  import { tabs } from "@/shared/templates";
  import PrettyTopbar from "./PrettyTopbar.svelte";
  import PrettyPillbar from "./PrettyPillbar.svelte";

  let pillbarActive = $derived(tabs[extensionState.currentTab].pills);
  let Page = $derived(tabs[extensionState.currentTab].page);
</script>

{#if !extensionState.showDevPanel}
  <div class="dui-backdrop">
    <div class="dui-dev-panel">
      <PrettyTopbar />

      {#if pillbarActive}
        <div class="dui-pill-content">
          <PrettyPillbar />
        </div>

        <div class="dui-content">
          <div class="dui-content-wrapper">
            {#if Page}
              <Page />
            {/if}
          </div>
        </div>
      {/if}
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
    z-index: 9999;
    backdrop-filter: brightness(0.5) blur(32px);
  }

  .dui-dev-panel {
    display: flex;
    position: fixed;
    width: 90%;
    max-width: 512px;
    height: 95vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    overflow: hidden;
    font-family: var(--dui-font-interface);
    font-size: var(--dui-font-size-medium);
    border: 1px solid var(--dui-color-core-charlie);
    border-radius: var(--dui-border-radius-giga);
    background-color: var(--dui-color-core-alpha);
    z-index: 100;
  }

  .dui-pill-content {
    padding: var(--dui-padding-medium);
  }

  .dui-content {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }

  .dui-content-wrapper {
    padding: 0px var(--dui-padding-medium);
    display: flex;
    flex-direction: column;
    gap: var(--dui-gap-small);

    &.pillbar-active {
      padding: 0px var(--dui-padding-medium);
    }
  }
</style>
