<script lang="ts">
  import { tabs } from "@/shared/templates";
  import Tab from "../generic/Tab.svelte";
</script>

<div class="dui-topbar">
  <div class="dui-content">
    {#each Object.keys(tabs) as key}
      {#if !tabs[key].hidden}
        <Tab icon={tabs[key].icon} label={key} />
      {/if}
    {/each}
  </div>
  <Tab icon="close" exit={true} />
</div>

<style lang="scss">
  .dui-topbar {
    display: flex;
    height: var(--dui-size-huge);
    border-bottom: 1px solid var(--dui-color-core-charlie);
  }

  .dui-content {
    display: flex;
    flex: 1;
    height: inherit;
  }
</style>
