<!-- Card Scripting HERE! -->
<script lang="ts">
  import type { Entity, Generic } from "@/lib/types";
  import { Utils } from "@/lib/utils";

  // Svelte Imports HERE!
  // DungeonUI Imports HERE!
  // Interface HERE!
  interface Card extends Generic {
    entity?: Entity;
    placeholder?: boolean;
  }

  // Props HERE!
  let { entity, placeholder, onclick }: Card = $props();
</script>

<!-- Card Layout HERE! -->
<button
  class="dungeon-ui-card"
  class:themed={placeholder}
  class:alt={!placeholder}
  {onclick}
  style="background-image: {entity?.graphics?.[0] ? `url('${entity.graphics[0]}')` : 'none'};"
>
  {#if placeholder}
    <div class="dungeon-ui-card-placeholder">
      <span class="dungeon-ui-icon">add</span>
      Add characters, locations, factions, or whatever else!
    </div>
  {:else if entity?.graphics == undefined || entity.graphics.length == 0}
    <div class="dungeon-ui-card-icon">
      <span class="dungeon-ui-icon">{Utils.getIconForEntityType(entity?.type || "Weird")}</span>
    </div>
  {/if}

  {#if !placeholder}
    <div class="dungeon-ui-card-footer">
      <span class="dungeon-ui-card-name">{entity?.name || "Unnamed"}</span>
      <span class="dungeon-ui-card-type">{entity?.type || "Unknown"}</span>
    </div>
  {/if}
</button>

<!-- Card Styling HERE! -->
<style lang="scss">
  .dungeon-ui-card {
    position: relative;
    display: flex;
    flex: 1;
    padding: var(--d-ui-padding-medium);
    aspect-ratio: var(--d-ui-aspect-ratio-card);
    background-color: rgb(from var(--d-ui-color-theme) r g b / 0.1);
    border-radius: var(--d-ui-border-radius-large);
    transition: all var(--d-ui-animation-duration-medium) var(--d-ui-animation-ease-in-out);
    cursor: pointer;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;

    &.alt {
      background-color: rgb(from var(--d-ui-color-theme-danger) r g b / 0.1);
    }

    &.themed {
      color: var(--d-ui-color-theme);
    }

    &:hover {
      filter: brightness(110%);
    }
  }

  .dungeon-ui-card-placeholder {
    display: flex;
    flex-direction: column;
    gap: var(--d-ui-gap-medium);
    justify-content: center;
    align-items: center;
    font-size: var(--d-ui-font-size-medium);

    .dungeon-ui-icon {
      transform: scale(2);
    }
  }

  .dungeon-ui-card-icon {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 0;
    bottom: 20%;

    .dungeon-ui-icon {
      transform: scale(6.5);
      color: currentColor;
      display: inline-block;
      opacity: 0.1;
      line-height: 1;
      text-shadow: 1px 1px 0 rgba(0, 0, 0, 1);
    }
  }

  .dungeon-ui-card-footer {
    z-index: 1;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--d-ui-gap-tiny);

    /* This is disgusting. Fix it later. */
    filter: drop-shadow(0px 0px 1rem rgba(0, 0, 0, 1)) drop-shadow(0px 0px 1rem rgba(0, 0, 0, 1))
      drop-shadow(0px 0px 1rem rgba(0, 0, 0, 1));
  }

  .dungeon-ui-card-type {
    font-family: var(--d-ui-font-gameplay);
    font-size: var(--d-ui-font-size-small);
    font-weight: 600;
    text-transform: uppercase;
    color: var(--d-ui-color-core-delta);
    letter-spacing: 0.06em;
    text-shadow: 2px 3px 0 rgba(0, 0, 0, 0.6);
  }

  .dungeon-ui-card-name {
    font-weight: 700;
    font-size: var(--d-ui-font-size-large);
    font-family: var(--d-ui-font-title);
    text-transform: uppercase;
    color: #ffffff;
    word-wrap: break-word;
    word-break: normal;
    overflow-wrap: anywhere;
    text-shadow: 4px 6px 0 rgba(0, 0, 0, 0.6);
  }
</style>
