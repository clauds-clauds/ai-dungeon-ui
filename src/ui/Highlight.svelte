<!-- Highlight Scripting HERE! -->
<script lang="ts">
  import { entities, settings } from "@/lib/storage";
  import type { Entity } from "@/lib/types";
  import { fade, fly, scale } from "svelte/transition";
  import { quintOut, circOut } from "svelte/easing";
  import { Dev } from "@/lib/dev";

  // Svelte Imports HERE!
  // DungeonUI Imports HERE!
  // Interface HERE!
  interface Highlight {
    entity: Entity;
    text: string;
  }

  let hovering = $state(false);
  let timeoutId: number | undefined;

  // Props HERE!
  let { entity, text }: Highlight = $props();

  function show() {
    if (timeoutId) clearTimeout(timeoutId);
    hovering = true;
  }

  function hide() {
    timeoutId = setTimeout(() => {
      hovering = false;
    }, $settings.tooltipDelay);
  }

  let graphic = $derived.by(() => {
    const graphics = entity.graphics;
    if (!graphics || graphics.length === 0) {
      return "";
    }

    // Clamp the index to a valid range.
    const index = Math.max(0, Math.min(entity.graphicIndex ?? 0, graphics.length - 1));
    return graphics[index];
  });

  let icon = $derived.by(() => {
    const icons = entity.icons;
    if (!icons || icons.length === 0) {
      return "";
    }

    // Use a default of 0 for the icon index if it's not set.
    const index = Math.max(0, Math.min(entity.iconIndex ?? 0, icons.length - 1));
    return icons[index];
  });
</script>

<!-- Highlight Layout HERE! -->
<span class="dungeon-ui-highlight" style:color={entity.color} role="tooltip" onmouseenter={show} onmouseleave={hide}>
  {#if graphic && hovering}
    <button
      class="dungeon-ui-highlight-tooltip"
      transition:fly={{ y: -32, duration: 300, easing: circOut, opacity: 0 }}
      onmouseenter={show}
      onclick={(ev: MouseEvent) => {
        ev.stopPropagation();
        const maxIndex = entity.graphics.length - 1;
        const newIndex = (entity.graphicIndex ?? 0) >= maxIndex ? 0 : (entity.graphicIndex ?? 0) + 1;
        $entities = $entities.map((e) => (e.id === entity.id ? { ...e, graphicIndex: newIndex } : e));
      }}
    >
      <img
        src={graphic}
        alt={entity.name}
        style:max-width={`${$settings.tooltipMaxSize}px`}
        style:max-height={`${$settings.tooltipMaxSize}px`}
      />
    </button>
  {/if}
  {#if icon}
    <img
      src={icon}
      alt={entity.name}
      style:border={$settings.iconBorderSize + `px ${entity.borderStyle.toLowerCase()}`}
      style:height={$settings.iconSize + "px"}
      style:border-radius={$settings.iconRoundness / 2 + "%"}
      style:border-color={entity.borderColor}
      class="dungeon-ui-highlight-icon"
    />
  {/if}
  {#if hovering && entity.icons.length > 1}
    <div
      class="dungeon-ui-icon-browser"
      transition:fly={{ y: 16, duration: 200, easing: quintOut }}
      role="tooltip"
      onmouseenter={show}
    >
      {#each entity.icons as iconSrc, i}
        <button
          class="dungeon-ui-icon-browser-button"
          transition:fly={{ y: 16, duration: 200, delay: i * 250, easing: quintOut }}
          onclick={(ev) => {
            ev.stopPropagation();
            $entities = $entities.map((e) => (e.id === entity.id ? { ...e, iconIndex: i } : e));
          }}
        >
          <img src={iconSrc} alt={`Icon ${i + 1}`} class="dungeon-ui-icon-browser-img" />
        </button>
      {/each}
    </div>
  {/if}
  {text}
</span>

<!-- Highlight Styling HERE! -->
<style lang="scss">
  .dungeon-ui-highlight {
    position: relative;
    display: inline-flex;
    align-items: baseline;
    white-space: nowrap;
    gap: var(--kit-gap-tiny, 4px);
  }

  .dungeon-ui-highlight-icon {
    aspect-ratio: var(--d-ui-aspect-ratio-square);
    margin-right: 4px;
    object-fit: cover;
    align-self: center;
  }

  .dungeon-ui-highlight-tooltip {
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
      border-radius: var(--d-ui-border-radius-small);

      &:hover {
        filter: brightness(120%);
      }
    }
  }

  .dungeon-ui-icon-browser {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: var(--d-ui-gap-tiny);
    padding: var(--d-ui-padding-tiny);
    border-radius: var(--d-ui-border-radius-medium);
    border: 1px solid var(--d-ui-color-core-gamma);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .dungeon-ui-icon-browser-button {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: var(--d-ui-border-radius-small);
    overflow: hidden;
    line-height: 0;

    &:hover {
      .dungeon-ui-icon-browser-img {
        filter: brightness(120%);
      }
    }
  }

  .dungeon-ui-icon-browser-img {
    width: 96px;
    aspect-ratio: var(--d-ui-aspect-ratio-square);
    object-fit: cover;
    transition: filter 200ms ease-in-out;
  }
</style>
