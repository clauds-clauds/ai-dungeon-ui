<!-- Card Scripting HERE! -->
<script lang="ts">
  import type { StoryCard } from "@/shared/types";

  interface Card {
    storyCard?: StoryCard;
    placeholder?: boolean;
    onclick?: () => void;
  }

  let { storyCard, placeholder, onclick }: Card = $props();
</script>

<button
  class="dui-card"
  class:themed={placeholder}
  class:alt={!placeholder}
  {onclick}
  style="background-image: {storyCard?.graphics?.[0] ? `url('${storyCard.graphics[0]}')` : 'none'};"
>
  {#if placeholder}
    <div class="dui-placeholder">
      <span class="dui-icon">add</span>
      Add characters, locations, factions, or whatever else!
    </div>
  {:else if storyCard?.graphics == undefined || storyCard.graphics.length == 0}
    <div class="dui-card-icon">
      <span class="dui-icon">playing_cards</span>
    </div>
  {/if}

  {#if !placeholder}
    <div class="dui-card-footer">
      <span class="dui-card-name">{storyCard?.name || "Unnamed"}</span>
      <span class="dui-card-type">{storyCard?.type || "Unknown"}</span>
    </div>
  {/if}
</button>

<style lang="scss">
  .dui-card {
    position: relative;
    display: flex;
    flex: 1;
    padding: var(--dui-padding-medium);
    aspect-ratio: var(--dui-aspect-ratio-card);
    background-color: rgb(from var(--dui-color-theme) r g b / 0.1);
    border-radius: var(--dui-border-radius-large);
    transition: all var(--dui-animation-duration-medium) var(--dui-animation-ease-in-out);
    cursor: pointer;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;

    &.alt {
      background-color: rgb(from var(--dui-color-theme-danger) r g b / 0.1);
    }

    &.themed {
      color: var(--dui-color-theme);
    }

    &:hover {
      filter: brightness(110%);
    }
  }

  .dui-placeholder {
    display: flex;
    flex-direction: column;
    gap: var(--dui-gap-medium);
    justify-content: center;
    align-items: center;
    font-size: var(--dui-font-size-medium);

    .dui-icon {
      transform: scale(2);
    }
  }

  .dui-card-icon {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 0;
    bottom: 20%;

    .dui-icon {
      transform: scale(6.5);
      color: currentColor;
      display: inline-block;
      opacity: 0.1;
      line-height: 1;
      text-shadow: 1px 1px 0 rgba(0, 0, 0, 1);
    }
  }

  .dui-card-footer {
    z-index: 1;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--dui-gap-tiny);
    filter: drop-shadow(0px 0px 1rem rgba(0, 0, 0, 1)) drop-shadow(0px 0px 1rem rgba(0, 0, 0, 1))
      drop-shadow(0px 0px 1rem rgba(0, 0, 0, 1));
  }

  .dui-card-type {
    font-family: var(--dui-font-gameplay);
    font-size: var(--dui-font-size-small);
    font-weight: 600;
    text-transform: uppercase;
    color: var(--dui-color-core-delta);
    letter-spacing: 0.06em;
    text-shadow: 2px 3px 0 rgba(0, 0, 0, 0.6);
  }

  .dui-card-name {
    font-weight: 700;
    font-size: var(--dui-font-size-large);
    font-family: var(--dui-font-title);
    text-transform: uppercase;
    color: #ffffff;
    word-wrap: break-word;
    word-break: normal;
    overflow-wrap: anywhere;
    text-shadow: 4px 6px 0 rgba(0, 0, 0, 0.6);
  }
</style>
