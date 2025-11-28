<!-- Pretty Response HERE! -->
<script lang="ts">
  import { PrettyElement, ResponseType, Storage, type StoryCard } from "@/shared";
  import { adventures, settings } from "@/shared/storage";

  interface PrettyResponse {
    text: string;
    responseType: ResponseType;
  }

  let { text, responseType }: PrettyResponse = $props();

  type TextChunk = { type: "text"; text: string } | { type: "storyCard"; storyCard: StoryCard; text: string; skip: boolean };
  const regex = /(\s+|[.,!?;:"']|\n)/;

  const chunks: TextChunk[] = $derived.by(() => {
    const chonks: TextChunk[] = [];
    const parts = text.split(regex).filter(Boolean);
    const _ = $adventures;

    for (const part of parts) {
      if (!part) continue;
      const storyCard: StoryCard = Storage.map[part.trim().toLowerCase()];

      if (storyCard) {
        let skip = false;

        // Handle skipping based on the response type.
        if (responseType === ResponseType.Action && storyCard.restriction === "Story Only") skip = true;
        if (responseType !== ResponseType.Action && storyCard.restriction === "Action Only") skip = true;

        chonks.push({ type: "storyCard", storyCard, text: part, skip });
      } else {
        chonks.push({ type: "text", text: part });
      }
    }

    return chonks;
  });
</script>

<span class="dui-response">
  {#each chunks as chunk}
    {#if chunk.type === "storyCard" && !chunk.skip}
      <PrettyElement storyCard={chunk.storyCard} text={chunk.text} />
    {:else}
      {chunk.text}
    {/if}
  {/each}{#if $settings.debugData}<span class="dui-response-debug">
      <span class="dui-icon">bug_report</span>
      Response Type: {responseType}
    </span>
  {/if}
</span>

<style lang="scss">
  .dui-response {
    white-space: pre-wrap;
  }

  .dui-response-debug {
    display: flex;
    font-weight: bold;
    color: var(--dui-color-orange);
    font-size: 14px;
  }

  .dui-response-travel-anchor {
    display: flex;
    justify-content: center;
    width: 100%;
    cursor: default;
  }
</style>
