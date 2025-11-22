<script lang="ts">
  import { Utils } from "@/shared";
  import { cards, DUIStorage } from "@/shared/storage";
  import type { PrettyCard } from "@/shared/types";
  import { circOut, quintOut } from "svelte/easing";
  import { get } from "svelte/store";
  import { fly } from "svelte/transition";

  interface PrettyHighlight {
    card: PrettyCard;
    text: string;
  }

  let { card, text }: PrettyHighlight = $props();

  let hovering = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  // Stuff...
  let graphic = $derived.by(() => {
    const _ = $cards; // This is disgusting, but ensures that the graphics update when the cards themselves change.
    return Utils.wrapIndexData(card.graphics, card.currentGraphic);
  });

  let icon = $derived.by(() => {
    const _ = $cards;
    return Utils.wrapIndexData(card.icons, card.currentIcon);
  });

  let color = $derived.by(() => {
    return get(DUIStorage.settings).globalColor;
  });

  // Even more stuff!!!
  function onEnter() {
    if (timeoutId) clearTimeout(timeoutId);
    hovering = true;
  }

  function onLeave() {
    timeoutId = setTimeout(() => {
      hovering = false;
    }, 200);
  }
</script>

<span class="dui-highlight" style:color role="tooltip" onmouseenter={onEnter} onmouseleave={onLeave}>
  {#if graphic && hovering}
    <button
      class="dui-highlight-graphic"
      transition:fly={{ y: -32, duration: 300, easing: circOut, opacity: 0 }}
      onmouseenter={onEnter}
      onclick={(event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        card.currentGraphic = card.currentGraphic + 1 > card.graphics.length - 1 ? 0 : card.currentGraphic + 1;
        DUIStorage.upsertCard(card);
      }}
    >
      <img src={graphic} alt="" />
    </button>
  {/if}
  {#if icon}
    <img src={icon} alt={card.name} class="dui-highlight-icon" />
  {/if}
  {#if hovering && card.icons.length > 1}
    <div
      class="dui-highlight-icons"
      transition:fly={{ y: 16, duration: 200, easing: quintOut }}
      role="tooltip"
      onmouseenter={onEnter}
    >
      {#each card.icons as iconSrc, i}
        <button
          class="dui-highlight-icon-preview"
          transition:fly={{ y: 16, duration: 200, delay: i * 250, easing: quintOut }}
          onclick={(event: MouseEvent) => {
            event.stopPropagation();
            event.preventDefault();
            card.currentIcon = i;
            DUIStorage.upsertCard(card);
          }}
        >
          <img src={iconSrc} alt="" />
        </button>
      {/each}
    </div>
  {/if}
  {text}
</span>

<style lang="scss">
  .dui-highlight {
    position: relative;
    display: inline-flex;
    align-items: baseline;
    white-space: nowrap;
    gap: var(--dui-gap-tiny, 4px);
  }

  .dui-highlight-icon {
    aspect-ratio: 1 / 1;
    margin-right: 5px;
    object-fit: cover;
    border: 1px solid #1b1f22;
    align-self: center;
    width: 32px;
  }

  .dui-highlight-graphic {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    width: max-content;
    background-color: transparent;
    cursor: auto;

    img {
      transition: all 200ms ease-in-out;
      cursor: pointer;
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: var(--dui-border-radius-small);

      &:hover {
        filter: brightness(120%);
      }
    }
  }

  .dui-highlight-icons {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: var(--dui-gap-tiny);
    padding: var(--dui-padding-tiny);
  }

  .dui-highlight-icon-preview {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: var(--dui-border-radius-small);
    overflow: hidden;
    line-height: 0;

    &:hover {
      img {
        filter: brightness(120%);
      }
    }

    img {
      width: 96px;
      aspect-ratio: 1/1;
      object-fit: cover;
      transition: all 200ms ease-in-out;
    }
  }
</style>
