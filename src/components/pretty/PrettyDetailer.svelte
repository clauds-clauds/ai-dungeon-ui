<script lang="ts">
  import { Storage, Utils } from "@/shared";
  import { detailerState } from "@/shared/state.svelte";
  import { cards, settings } from "@/shared/storage";
  import type { PrettyCard } from "@/shared/types";
  import { get } from "svelte/store";

  let card: PrettyCard | undefined = $derived.by(() => {
    // Get the latest triggers.
    let triggers = $settings.detailerTriggers;

    // Return if something is off about either the text or the triggers.
    if (!detailerState.text || detailerState.text === "" || !triggers || triggers === "") return undefined;

    // Get all the loose split triggers.
    const list = triggers
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Just to be safe.
    const lowerText = detailerState.text.toLowerCase();
    let cardName: string = "";

    // Go through all the triggers.
    for (const trigger of list) {
      const lowerTrigger = trigger.toLowerCase();
      const index = lowerText.indexOf(lowerTrigger);

      if (index !== -1) {
        cardName = detailerState.text.substring(index + trigger.length).trim();
        cardName = cardName.replace(/[.,!?;:"']+$/, "");
        break;
      }
    }
    return Storage.map[cardName.toLowerCase()];
  });

  $effect(() => {
    const _ = $cards; // Refresh when cards change.
    if (!card || !card.graphics) {
      detailerState.graphic = "";
    } else {
      detailerState.graphic = card.graphics[card.currentGraphic];
    }
  });
</script>

{#if card && card.graphics?.length > 0}
  <button
    onclick={(event: MouseEvent) => {
      Utils.eatEvent(event);
      card.currentGraphic = card.currentGraphic + 1 > card.graphics.length - 1 ? 0 : card.currentGraphic + 1;
      Storage.upsertCard(card);
    }}
  >
    <img
      class="dui-detailer"
      src={detailerState.graphic}
      alt=""
      style:max-width={`${$settings.detailerMaxWidth}px`}
      style:max-height={`${$settings.detailerMaxHeight}px`}
    />
  </button>
{/if}

<style lang="scss">
  .dui-detailer {
    margin-bottom: 16px;
    border-radius: var(--dui-border-radius-medium);

    &:hover {
      cursor: pointer;
    }
  }
</style>
