<script lang="ts">
  import { Mathf } from "@/shared/math";
  import { adventures, settings, Storage } from "@/shared/storage";
  import type { StoryCard } from "@/shared/types";
  import { Utils } from "@/shared/utils";

  interface Highlight {
    storyCard: StoryCard;
    text: string;
  }

  let { storyCard, text }: Highlight = $props();

  let hovering = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  let data = $derived.by(() => {
    const _ = $adventures;
    const liveCard = $adventures[Utils.getAdventureId()]?.storyCards?.[storyCard.name] ?? storyCard;

    return {
      graphic: Mathf.wrap(liveCard.graphics, liveCard.currentGraphic),
      icon: Mathf.wrap(liveCard.icons, liveCard.currentIcon),
      iconSize: $settings.iconSize,
      color: liveCard.useCustomColor ? liveCard.color : $settings.highlightColor,
      borderColor: liveCard.useCustomColor ? liveCard.iconBorderColor : $settings.iconBorderColor,
      borderStyle: liveCard.iconBorderStyle,
      borderRadius: $settings.iconBorderRoundness / 2,
      tooltipWidth: $settings.tooltipWidth,
      tooltipHeight: $settings.tooltipHeight,
      card: liveCard,
    };
  });

  function onenter() {
    if (timeoutId) clearTimeout(timeoutId);
    hovering = true;
  }

  function onleave() {
    timeoutId = setTimeout(() => {
      hovering = false;
    }, Storage.getCurrentSettings().tooltipHideDelay);
  }
</script>

<span class="dui-highlight" style:color={data.color} role="tooltip" onmouseenter={onenter} onmouseleave={onleave}>
  {#if data.graphic && hovering}
    <button
      class="dui-graphic"
      onmouseenter={onenter}
      onclick={(ev: MouseEvent) => {
        ev?.stopPropagation();
        const card = data.card;
        card.currentGraphic = card.currentGraphic + 1 > card.graphics.length - 1 ? 0 : card.currentGraphic + 1;
        Storage.upsert(card);
      }}
    >
      <img src={data.graphic} style:max-width={`${data.tooltipWidth}px`} style:max-height={`${data.tooltipHeight}px`} alt="" />
    </button>
  {/if}

  {#if data.icon}
    <img
      src={data.icon}
      alt={storyCard.name}
      class="dui-icon-inline"
      style:width={`${data.iconSize}px`}
      style:border-radius={`${data.borderRadius}%`}
      style:border={`${$settings.iconBorderSize}px ${data.borderStyle.toLowerCase()} ${data.borderColor}`}
    />
  {/if}

  {#if storyCard.icons.length > 1 && hovering}
    <div class="dui-icon-choices" role="tooltip" onmouseenter={onenter}>
      {#each storyCard.icons as iconSrc, i}
        <button
          class="dui-icon-choice"
          onclick={(ev: MouseEvent) => {
            ev.stopPropagation();
            const card = data.card;
            card.currentIcon = i;
            Storage.upsert(card);
          }}
        >
          <img src={iconSrc} alt="" />
        </button>
      {/each}
    </div>
  {/if}{text}
</span>

<style lang="scss">
  .dui-highlight {
    position: relative;
    display: inline-flex;
    align-items: baseline;
    white-space: nowrap;
    gap: var(--dui-gap-tiny);
  }

  .dui-icon-inline {
    aspect-ratio: var(--dui-aspect-ratio-square);
    margin-right: 5px;
    object-fit: cover;
    align-self: center;
  }

  .dui-graphic {
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
      border-radius: var(--dui-border-radius-medium);

      &:hover {
        filter: brightness(120%);
      }
    }
  }

  .dui-icon-choices {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: var(--dui-gap-tiny);
    padding: var(--dui-padding-tiny);
  }

  .dui-icon-choice {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: var(--dui-border-radius-medium);
    overflow: hidden;
    line-height: 0;

    &:hover {
      img {
        filter: brightness(120%);
      }
    }

    img {
      width: 64px;
      aspect-ratio: var(--dui-aspect-ratio-square);
      object-fit: cover;
      transition: all 200ms ease-in-out;
    }
  }
</style>
