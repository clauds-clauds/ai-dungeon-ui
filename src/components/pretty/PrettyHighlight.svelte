<script lang="ts">
  import { Utils } from "@/shared";
  import type { PrettyCard } from "@/shared/types";

  interface PrettyHighlight {
    card: PrettyCard;
    text: string;
  }

  let { card, text }: PrettyHighlight = $props();

  let hovering = $state(false);
  let timeoutId: number | undefined;

  // Stuff...
  let graphic = $derived.by(() => {
    return Utils.wrapIndexData(card.graphics, card.currentGraphic);
  });

  let icon = $derived.by(() => {
    return Utils.wrapIndexData(card.icons, card.currentIcon);
  });

  let color = $derived.by(() => {
    return card.textColor;
  });
</script>

<span class="dui-highlight" style:color>
  {#if icon}
    <img src={icon} alt={card.name} class="dui-highlight-icon" />
  {/if}
  {text}
</span>

<style lang="scss">
  .dui-highlight {
    display: inline-flex;
    align-items: baseline;
    white-space: nowrap;
    gap: var(--kit-gap-tiny, 4px);
  }

  .dui-highlight-icon {
    aspect-ratio: 1 / 1;
    margin-right: 5px;
    object-fit: cover;
    border: 1px solid #1b1f22;
    align-self: center;
    width: 32px;
  }
</style>
