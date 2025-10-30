<!-- Browser Scripting HERE! -->
<script lang="ts">
  // DungeonUI Imports HERE!
  import { entityState, uiState } from "@/lib/state.svelte";
  import { entities } from "@/lib/storage";
  import { Utils } from "@/lib/utils";

  // Component Imports HERE!
  import Card from "./Card.svelte";
</script>

<!-- Browser Layout HERE! -->
<div class="dungeon-ui-browser">
  <div class="dungeon-ui-browser-grid">
    <Card
      placeholder={true}
      onclick={() => {
        // Let utils add a new entity.
        Utils.addEntity();

        // TODO: DO NOT HARDCODE THIS, IT IS NOT NICE TO LOOK AT.
        Utils.forceNavigate("EDITOR", "BASICS");
      }}
    />

    {#each $entities as entity}
      <Card
        {entity}
        onclick={() => {
          entityState.editorIndex = $entities.indexOf(entity);
          Utils.forceNavigate("EDITOR", "BASICS");
        }}
      />
    {/each}
  </div>
</div>

<!-- Browser Styling HERE! -->
<style lang="scss">
  .dungeon-ui-browser {
    display: flex;
    border-radius: var(--d-ui-border-radius-huge);
    background-color: var(--d-ui-color-core-alpha);
    justify-content: center;
  }

  .dungeon-ui-browser-grid {
    display: grid;
    gap: var(--d-ui-gap-medium);
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
  }
</style>
