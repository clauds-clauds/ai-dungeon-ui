<!-- Text Effects Scripting HERE! -->
<script lang="ts">
  import { entities, settings, triggers } from "@/lib/storage";
  import { GenericChoice, HighlightLimitation, type Entity, type TextChunk } from "@/lib/types";
  import { Utils } from "@/lib/utils";
  import Highlight from "./Highlight.svelte";
  import { entityState } from "@/lib/state.svelte";

  // Svelte Imports HERE!
  // DungeonUI Imports HERE!
  interface TextEffects {
    text: string;
    type: string;
  }

  // Interface HERE!
  // Props HERE!
  let { text, type }: TextEffects = $props();

  // Text Decorating HERE!
  const chunks: TextChunk[] = $derived.by(() => {
    const entityPattern = entityState.triggers.length
      ? `(\\b(${entityState.triggers.map(Utils.escapeRegExp).join("|")})(\\'s)?\\b)`
      : null;
    const markdownPattern = Utils.markdownPattern();
    const allPatterns = [...(entityPattern ? [entityPattern] : []), ...markdownPattern];

    if (allPatterns.length === 0) return [{ type: "text", content: text }];

    const regex = new RegExp(allPatterns.join("|"), "gi");
    const processedChunks: TextChunk[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        processedChunks.push({
          type: "text",
          content: text.substring(lastIndex, match.index),
        });
      }

      let consumed = false;

      // Check for any matching entities.
      if (entityPattern && match[1]) {
        const entityName = match[2];
        const fullMatch = match[1];

        // Find the matching entity in the store.
        const entity = $entities.find(
          (e: Entity) =>
            e.name?.toLowerCase() === entityName.toLowerCase() ||
            e.triggers
              ?.split(",")
              .map((t) => t.trim())
              .some((k) => k.toLowerCase() === entityName.toLowerCase())
        );

        if (
          entity &&
          (entity.limitation === HighlightLimitation.None ||
            (entity.limitation === HighlightLimitation.ActionOnly && type === "ACTION") ||
            (entity.limitation === HighlightLimitation.StoryOnly && type === "STORY"))
        ) {
          processedChunks.push({
            type: "entity",
            entity: entity,
            match: fullMatch,
          });
          consumed = true;
        }
      } else if (markdownPattern.length > 0) {
        const baseIndex = entityPattern ? 4 : 1;
        if (match[baseIndex]) {
          // Bold.
          processedChunks.push({
            type: "markdown",
            tag: "strong",
            content: match[baseIndex + 1],
          });
          consumed = true;
        } else if (match[baseIndex + 2]) {
          // Italic.
          processedChunks.push({
            type: "markdown",
            tag: "em",
            content: match[baseIndex + 3],
          });
          consumed = true;
        } else if (match[baseIndex + 4]) {
          // Underline.
          processedChunks.push({
            type: "markdown",
            tag: "u",
            content: match[baseIndex + 5],
          });
          consumed = true;
        } else if (match[baseIndex + 6]) {
          // Strikethrough.
          processedChunks.push({
            type: "markdown",
            tag: "s",
            content: match[baseIndex + 7],
          });
          consumed = true;
        }
      }

      // If nothing was consumed by the evil regex, treat it as plain text.
      if (!consumed) {
        processedChunks.push({
          type: "text",
          content: match[0],
        });
      }

      lastIndex = regex.lastIndex;
    }

    // Add any remaining text after the last match.
    if (lastIndex < text.length) {
      processedChunks.push({
        type: "text",
        content: text.substring(lastIndex),
      });
    }
    return processedChunks;
  });
</script>

<!-- Text Effects Layout HERE! -->
<span
  class="dungeon-ui-text-effects"
  style:font-family={$settings.choiceText === GenericChoice.Custom && $settings.customFont && $settings.customFont.length > 0
    ? "Dungeon UI Custom Font"
    : "var(--d-ui-font-gameplay)"}
>
  {#each chunks as chunk}
    {#if chunk.type === "text"}
      {chunk.content}
    {:else if chunk.type === "markdown"}
      <svelte:element this={chunk.tag}>{chunk.content}</svelte:element>
    {:else if chunk.type === "entity"}
      <Highlight entity={chunk.entity} text={chunk.match} />
    {/if}
  {/each}
</span>

<!-- Text Effects Styling HERE! -->
<style lang="scss">
  .dungeon-ui-text-effects {
    display: inline;
    font-family: "CustomFont";
  }
</style>
