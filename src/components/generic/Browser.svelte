<!-- Browser Scripting HERE! -->
<script lang="ts">
  import { adventures, Storage } from "@/shared/storage";
  import Card from "./Card.svelte";
  import { Utils } from "@/shared/utils";
</script>

<div class="dui-browser">
  <div class="dui-browser-grid">
    <Card placeholder={true} />
    {#if $adventures[Utils.getAdventureId()]}
      {#each Object.values(Storage.getCurrentAdventureData().storyCards) as storyCard}
        <Card {storyCard} />
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .dui-browser {
    display: flex;
    border-radius: var(--dui-border-radius-huge);
    background-color: var(--dui-color-core-alpha);
    justify-content: center;
  }

  .dui-browser-grid {
    display: grid;
    gap: var(--dui-gap-medium);
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
  }
</style>
