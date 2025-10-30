<!-- Panel Scripting HERE! -->
<script lang="ts">
  // DungeonUI Imports HERE!
  import { uiState } from "@/lib/state.svelte";
  import { tabTemplates } from "@/lib/templates";

  // Component Imports HERE!
  import Topbar from "./Topbar.svelte";
  import Pillbar from "./Pillbar.svelte";
  import { settings } from "@/lib/storage";
  import Style from "./Style.svelte";
  import { fade, fly } from "svelte/transition";

  // Whether there are actual pills/subtabs to show.
  let pillbarActive = $derived(tabTemplates[uiState.tab].pills);

  // The content which needs to be rendered into the panel.
  let Content = $derived(tabTemplates[uiState.tab].content);
</script>

<!-- Style Injection HERE! -->
<Style />

<!-- Panel Layout HERE! -->
{#if uiState.visible}
  <div class="dungeon-ui-backdrop" transition:fade={{ duration: 200 }}>
    <!-- Panel and INJECTED STYLING HERE! -->
    <div class="dungeon-ui-panel" transition:fly={{ y: 32, duration: 150 }}>
      <!-- Topbar HERE! -->
      <Topbar />

      <!-- Pillbar HERE! -->
      {#if pillbarActive}
        <div class="dungeon-ui-pillbar-area">
          <Pillbar />
        </div>
      {/if}

      <!-- Content Area HERE! -->
      <div class="dungeon-ui-content-area">
        <div class="dungeon-ui-content-wrapper" class:pillbar-active={pillbarActive}>
          <!-- Content HERE! -->
          {#if Content}
            <Content />
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Panel Styling HERE! -->
<style lang="scss">
  .dungeon-ui-backdrop {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    inset: 0;
    z-index: 9999;
    backdrop-filter: brightness(0.5) blur(32px);
  }

  .dungeon-ui-panel {
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
    font-family: var(--d-ui-font-interface);
    font-size: var(--d-ui-font-size-medium);
    border: 1px solid var(--d-ui-color-core-charlie);
    border-radius: var(--d-ui-border-radius-giga);
    background-color: var(--d-ui-color-core-alpha);
    z-index: 10000;
  }

  .dungeon-ui-pillbar-area {
    padding: var(--d-ui-padding-medium);
  }

  .dungeon-ui-content-area {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }

  .dungeon-ui-content-wrapper {
    padding: var(--d-ui-padding-medium);
    display: flex;
    flex-direction: column;
    gap: var(--d-ui-gap-small);

    &.pillbar-active {
      padding: 0px var(--d-ui-padding-medium);
    }
  }
</style>
