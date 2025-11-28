<script>
  import { Storage, Utils } from "@/shared";
  import { adventures } from "@/shared/storage";
  import Preview from "./Preview.svelte";
</script>

{#if $adventures[Utils.getAdventureId()]}
  <div class="dui-browser">
    <div class="dui-browser-grid">
      {#each Object.values(Storage.getAdventureData().storyCards) as storyCard}
        <Preview {storyCard} />
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .dui-browser {
    display: flex;
    border-radius: var(--dui-size-charlie);
    background-color: var(--dui-color-alpha);
    justify-content: center;
  }

  .dui-browser-grid {
    display: grid;
    flex: 1;
    gap: var(--dui-size-charlie);
    grid-template-columns: repeat(2, 1fr);
  }
</style>
