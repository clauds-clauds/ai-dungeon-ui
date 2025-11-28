<!-- Topbar HERE! -->
<script lang="ts">
  import { Tab, tabTemplates } from "@/shared";
</script>

<div class="dui-topbar">
  <div class="dui-topbar-content">
    {#each tabTemplates as tab}
      <Tab icon={tab.icon} label={tab.label} exit={tab.exit} />
    {/each}
  </div>
</div>

<style lang="scss">
  .dui-topbar {
    display: flex;
    height: var(--dui-size-india);
    border-bottom: 1px solid var(--dui-color-delta);
    width: 100%;
  }

  .dui-topbar-content {
    display: flex;
    flex: 1;
    height: inherit;
  }
</style>
