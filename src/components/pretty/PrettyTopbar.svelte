<script lang="ts">
  import PrettyTab from "./PrettyTab.svelte";
</script>

<div class="dui-topbar">
  <PrettyTab />
  <div class="dui-content"></div>
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
