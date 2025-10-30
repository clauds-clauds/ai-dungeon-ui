<!-- Select Scripting HERE! -->
<script lang="ts">
  // DungeonUI Imports HERE!
  import type { Generic } from "@/lib/types";

  // Interface HERE!
  interface Select extends Generic {
    choices: string[];
    value?: string;
  }

  // Props HERE!
  let { choices, value = $bindable(choices[0]) }: Select = $props();
</script>

<!-- Select Layout HERE! -->
<select class="dungeon-ui-select" bind:value>
  {#each choices as choice}
    <option value={choice}>{choice}</option>
  {/each}
</select>

<!-- Select Styling HERE! -->
<style lang="scss">
  .dungeon-ui-select {
    background-color: var(--d-ui-color-core-charlie);
    border-radius: var(--d-ui-border-radius-medium);
    border: none;
    padding: 10px 12px;
    color: white;
    min-height: var(--d-ui-size-large);
  }

  select {
    appearance: none;
  }
</style>
