<!-- Pretty Element HERE! -->
<script lang="ts">
  import { Storage, Utils, type StoryCard } from "@/shared";
  import { adventures, settings } from "@/shared/storage";
  import { circOut, quintOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  interface PrettyElement {
    storyCard: StoryCard;
    text: string;
  }

  let { storyCard, text }: PrettyElement = $props();

  let hovering = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  let storyCardData = $derived.by(() => {
    // Access the stores directly to ensure reactivity.
    const currentAdventures = $adventures;
    const currentSettings = $settings;

    const adventureId = Utils.getAdventureId();
    const liveCard = currentAdventures[adventureId]?.storyCards?.[storyCard.name] ?? storyCard;

    const useCustomColors = liveCard.colorStyle === "Custom";

    const graphic = Utils.wrapIndexData(liveCard.graphics, liveCard.currentGraphic);
    const icon = Utils.wrapIndexData(liveCard.icons, liveCard.currentIcon);
    const iconSize = currentSettings.iconSize;
    const color = useCustomColors ? liveCard.textColor : currentSettings.textColor;
    const borderColor = useCustomColors ? liveCard.borderColor : currentSettings.borderColor;
    const borderStyle = liveCard.borderStyle.toLowerCase();
    const borderSize = currentSettings.iconBorderThickness;
    const borderRadius = currentSettings.iconBorderRoundness / 2;
    const tooltipWidth = currentSettings.tooltipWidth;
    const tooltipHeight = currentSettings.tooltipHeight;

    return {
      graphic,
      icon,
      iconSize,
      borderColor,
      borderStyle,
      borderSize,
      borderRadius,
      color,
      tooltipWidth,
      tooltipHeight,
    };
  });

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

<span class="dui-element" style:color={storyCardData.color} role="tooltip" onmouseenter={onEnter} onmouseleave={onLeave}>
  {#if storyCardData.graphic && hovering}
    <button
      class="dui-element-graphic"
      transition:fly={{ duration: 300, y: -64, easing: circOut, opacity: 0 }}
      onmouseenter={onEnter}
      onclick={(event: MouseEvent) => {
        event.stopPropagation();
        storyCard.currentGraphic =
          storyCard.currentGraphic + 1 > storyCard.graphics.length - 1 ? 0 : storyCard.currentGraphic + 1;
        Storage.upsertStoryCard(storyCard);
      }}
    >
      <img
        src={storyCardData.graphic}
        style:max-width={`${storyCardData.tooltipWidth}px`}
        style:max-height={`${storyCardData.tooltipHeight}px`}
        alt=""
      />
    </button>
  {/if}
  {#if storyCardData.icon}
    <img
      src={storyCardData.icon}
      alt={storyCard.name}
      class="dui-element-icon"
      style:width={`${storyCardData.iconSize}px`}
      style:border-radius={`${storyCardData.borderRadius}%`}
      style:border={`${storyCardData.borderSize}px ${storyCardData.borderStyle} ${storyCardData.borderColor}`}
    />
  {/if}
  {#if hovering && storyCard.icons.length > 1}
    <div
      class="dui-element-icons"
      transition:fly={{ duration: 200, y: 16, easing: quintOut }}
      role="tooltip"
      onmouseenter={onEnter}
    >
      {#each storyCard.icons as iconSrc, i}
        <button
          class="dui-element-icon-preview"
          transition:fly={{ duration: 200, y: 16, delay: i * 250, easing: quintOut }}
          onclick={(event: MouseEvent) => {
            event.stopPropagation();
            storyCard.currentIcon = i;
            Storage.upsertStoryCard(storyCard);
          }}
        >
          <img src={iconSrc} alt="" />
        </button>
      {/each}
    </div>
  {/if}{text}
</span>

<style lang="scss">
  .dui-element {
    position: relative;
    display: inline-flex;
    align-items: baseline;
    white-space: nowrap;
    gap: var(--dui-size-alpha);
  }

  .dui-element-icon {
    aspect-ratio: var(--dui-aspect-square);
    margin-right: 5px;
    object-fit: cover;
    align-self: center;
  }

  .dui-element-graphic {
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
      border-radius: var(--dui-size-bravo);

      &:hover {
        filter: brightness(120%);
      }
    }
  }

  .dui-element-icons {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: var(--dui-size-alpha);
    padding: var(--dui-size-alpha);
  }

  .dui-element-icon-preview {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: var(--dui-size-alpha);
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
