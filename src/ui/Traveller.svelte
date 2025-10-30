<script lang="ts">
  import { travellerState } from "@/lib/state.svelte";
  import type { Entity } from "@/lib/types";
  import { entities } from "@/lib/storage";
  import { Dev } from "@/lib/dev";

  const travelTriggers = ["go", "travel"];

  const traveller = $derived.by(() => {
    const allEntities = $entities;
    const text = travellerState.text;

    if (!text) {
      return { entity: undefined, graphic: "" };
    }

    const triggerPattern = travelTriggers.join("|");
    const regex = new RegExp(`\\b(${triggerPattern})\\s+(?:to\\s+(?:the\s+)?)?(.+)`, "i");
    const match = text.match(regex);

    let entity: Entity | undefined = undefined;

    if (match && match[2]) {
      const destinationName = match[2].trim().replace(/[.,!?]$/, "");
      entity = allEntities.find(
        (e: Entity) =>
          e.name?.toLowerCase() === destinationName.toLowerCase() ||
          e.triggers
            ?.split(",")
            .map((t) => t.trim())
            .some((k) => k.toLowerCase() === destinationName.toLowerCase())
      );
    }

    if (!entity) {
      Dev.say("Returning nothing at all.");
      return { entity: undefined, graphic: "" };
    }

    const graphics = entity.graphics;
    if (!graphics || graphics.length === 0) {
      return { entity: entity, graphic: "" };
    }

    const index = Math.max(0, Math.min(entity.graphicIndex ?? 0, graphics.length - 1));
    return { entity: entity, graphic: graphics[index] };
  });
</script>

{#if traveller.graphic && traveller.entity}
  <button
    class="dungeon-ui-traveller-container"
    onclick={() => {
      const entity = traveller.entity;
      if (!entity) return;

      const maxIndex = entity.graphics.length - 1;
      const newIndex = (entity.graphicIndex ?? 0) >= maxIndex ? 0 : (entity.graphicIndex ?? 0) + 1;
      $entities = $entities.map((e) => (e.id === entity.id ? { ...e, graphicIndex: newIndex } : e));
    }}
  >
    <img src={traveller.graphic} alt={traveller.entity.name} class="dungeon-ui-traveller-graphic" />
  </button>
{/if}

<style lang="scss">
  .dungeon-ui-traveller-container {
    width: 100%;
    padding: var(--d-ui-padding-medium, 8px);
    background: none;
    border: none;
    cursor: pointer;
    margin: 0;
  }

  .dungeon-ui-traveller-graphic {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: var(--d-ui-aspect-ratio-widescreen, 16 / 9);
    border-radius: var(--d-ui-border-radius-medium, 8px);
    box-shadow: var(--d-ui-shadow-large, 0 8px 24px rgba(0, 0, 0, 0.2));
    margin-bottom: 48px;
  }
</style>
