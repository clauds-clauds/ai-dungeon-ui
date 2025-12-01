<script lang="ts">
  import { Mathf } from "@/shared/math";
  import { extensionState } from "@/shared/state.svelte";
  import { adventures, settings, Storage } from "@/shared/storage";

  let aspectRatio = $state<number | null>(null);

  const card = $derived.by(() => {
    const _ = $adventures;
    if (!extensionState.travellerStoryCard) return null;
    const adventure = Storage.getCurrentAdventureData();
    return adventure?.storyCards?.[extensionState.travellerStoryCard] ?? null;
  });

  const graphic = $derived(card && card.graphics.length > 0 ? Mathf.wrap(card.graphics, card.currentGraphic) : null);

  $effect(() => {
    if (graphic) {
      const img = new Image();
      img.onload = () => {
        aspectRatio = img.naturalWidth / img.naturalHeight;
      };
      img.src = graphic;
    } else {
      aspectRatio = null;
      if (card) {
        extensionState.travellerStoryCard = "";
      }
    }
  });

  function onCycleGraphic(ev: MouseEvent) {
    ev.stopPropagation();
    if (!card) return;
    const newCard = { ...card };
    newCard.currentGraphic = (newCard.currentGraphic + 1) % newCard.graphics.length;
    Storage.upsert(newCard);
  }

  function onClearTraveller(ev: MouseEvent) {
    ev.stopPropagation();
    extensionState.travellerStoryCard = "";
  }
</script>

{#if graphic && aspectRatio}
  <div class="dui-anchor">
    <div
      class="dui-traveller"
      role="button"
      tabindex="0"
      style:background-image="url('{graphic}')"
      style:aspect-ratio={aspectRatio}
      style:max-width={`${$settings.travellerWidth}px`}
      style:max-height={`${$settings.travellerHeight}px`}
      onclick={onCycleGraphic}
    >
      <button class="dui-close-button" onclick={onClearTraveller}>
        <span class="dui-icon">close</span>
      </button>
    </div>
  </div>
{/if}

<style lang="scss">
  .dui-anchor {
    width: 100%;
    padding: var(--dui-padding-medium, 8px);
    background: none;
    border: none;
    margin: 0;
    display: flex;
    justify-content: center;
  }

  .dui-traveller {
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: var(--dui-border-radius-medium, 8px);
    box-shadow: var(--dui-shadow-large, 0 8px 24px rgba(0, 0, 0, 0.2));
    margin-bottom: 48px;
    background-size: cover;
    background-position: center;
    transition: filter 150ms ease-in-out;

    &:hover {
      filter: brightness(1.1);

      .dui-close-button {
        opacity: 1;
      }
    }
  }

  .dui-close-button {
    position: absolute;
    top: var(--dui-padding-small);
    right: var(--dui-padding-small);
    width: var(--dui-size-medium);
    height: var(--dui-size-medium);
    border-radius: var(--dui-border-radius-full);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 150ms ease-in-out;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
</style>
