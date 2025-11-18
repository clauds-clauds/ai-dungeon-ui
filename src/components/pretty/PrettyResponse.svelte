<!-- Pretty response scripting HERE! -->
<script lang="ts">
  import { Storage } from "@/shared";
  import type { PrettyCard } from "@/shared/types";
  import PrettyHighlight from "./PrettyHighlight.svelte";
  import { cards } from "@/shared/storage";

  interface PrettyResponse {
    text: string;
    isAction?: boolean;
    isLast?: boolean;
  }

  let { text = "", isAction = false, isLast = false }: PrettyResponse = $props();

  type TextChunk = { type: "text"; text: string } | { type: "card"; card: PrettyCard; text: string; skip: boolean };
  const regex = /(\s+|[.,!?;:"']|\n)/;

  const chunks: TextChunk[] = $derived.by(() => {
    const chonks: TextChunk[] = [];
    const parts = text.split(regex).filter(Boolean);
    const _ = $cards; // This is actually required, it ensures that this thing reacts to any changes to the cards and whatever.

    for (const part of parts) {
      if (!part) continue;
      const card: PrettyCard = Storage.map[part.trim().toLowerCase()];

      if (card) {
        let skip = false;

        // Handle skipping based on the response type.
        if (isAction && card.highlight === "Story Only") skip = true;
        if (!isAction && card.highlight === "Action Only") skip = true;

        chonks.push({ type: "card", card, text: part, skip });
      } else {
        chonks.push({ type: "text", text: part });
      }
    }

    return chonks;
  });
</script>

<!-- Pretty Response layout HERE! -->
<span class="dui-response">
  {#each chunks as chunk}
    {#if chunk.type === "card" && !chunk.skip}
      <PrettyHighlight card={chunk.card} text={chunk.text} />
    {:else}
      {chunk.text}
    {/if}
  {/each}
</span>

<!-- Pretty Response styling HERE! -->
<style lang="scss">
  .dui-response {
    white-space: pre-wrap;
  }
</style>
