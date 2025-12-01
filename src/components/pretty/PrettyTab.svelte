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

<style lang="scss"></style>
