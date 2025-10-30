<!-- Topbar Scripting HERE! -->
<script lang="ts">
  // DungeonUI Imports HERE!
  import { tabTemplates } from "@/lib/templates";

  // Component Imports HERE!
  import Tab from "./components/Tab.svelte";
</script>

<!-- Topbar Layout HERE! -->
<div class="dungeon-ui-topbar">
  <Tab icon="close" exit={true} />

  <div class="dungeon-ui-group">
    {#each Object.keys(tabTemplates) as contentKey}
      {#if !tabTemplates[contentKey].hidden}
        <Tab icon={tabTemplates[contentKey].icon} label={contentKey} />
      {/if}
    {/each}
  </div>
</div>

<!-- Topbar Styling HERE! -->
<style lang="scss">
  .dungeon-ui-topbar {
    display: flex;
    height: var(--d-ui-size-huge);
    border-bottom: 1px solid var(--d-ui-color-core-charlie);
  }

  .dungeon-ui-group {
    display: flex;
    flex: 1;
    height: inherit;
  }
</style>
