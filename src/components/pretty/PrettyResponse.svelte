<!-- Pretty Response HERE! -->
<script lang="ts">
  import { PrettyElement, ResponseType, Storage, type StoryCard } from "@/shared";
  import { adventures, settings } from "@/shared/storage";

  interface PrettyResponse {
    text: string;
    responseType: ResponseType;
  }

  let { text, responseType }: PrettyResponse = $props();

  type TextChunk =
    | { type: "text"; text: string }
    | { type: "storyCard"; storyCard: StoryCard; text: string; skip: boolean }
    | { type: "bold"; text: string }
    | { type: "italic"; text: string }
    | { type: "underline"; text: string }
    | { type: "strikethrough"; text: string };

  const chunks: TextChunk[] = $derived.by(() => {
    if (!$settings.formatterEnabled) {
      const storyCardChunks: TextChunk[] = [];
      const parts = text.split(/(\s+|[.,!?;:"']|\n)/g).filter(Boolean);
      const _ = $adventures;

      for (const part of parts) {
        const storyCard: StoryCard = Storage.map[part.trim().toLowerCase()];
        if (storyCard) {
          let skip = false;
          if (responseType === ResponseType.Action && storyCard.restriction === "Story Only") skip = true;
          if (responseType !== ResponseType.Action && storyCard.restriction === "Action Only") skip = true;
          storyCardChunks.push({ type: "storyCard", storyCard, text: part, skip });
        } else {
          storyCardChunks.push({ type: "text", text: part });
        }
      }
      return storyCardChunks;
    }

    const chonks: TextChunk[] = [];
    const _ = $adventures;

    const rules = [
      { type: "bold", regex: new RegExp($settings.ruleBold, "g") },
      { type: "italic", regex: new RegExp($settings.ruleItalic, "g") },
      { type: "underline", regex: new RegExp($settings.ruleUnderline, "g") },
      { type: "strikethrough", regex: new RegExp($settings.ruleStrikethrough, "g") },
    ];

    const storyCardTriggers = Object.keys(Storage.map);
    const storyCardRegex =
      storyCardTriggers.length > 0
        ? new RegExp(`\\b(${storyCardTriggers.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "gi")
        : null;

    const allMatches: { type: string; index: number; length: number; text: string }[] = [];

    rules.forEach((rule) => {
      for (const match of text.matchAll(rule.regex)) {
        allMatches.push({ type: rule.type, index: match.index!, length: match[0].length, text: match[1] });
      }
    });

    if (storyCardRegex) {
      for (const match of text.matchAll(storyCardRegex)) {
        allMatches.push({ type: "storyCard", index: match.index!, length: match[0].length, text: match[0] });
      }
    }

    allMatches.sort((a, b) => a.index - b.index);

    let lastIndex = 0;
    for (const match of allMatches) {
      if (match.index < lastIndex) continue;

      if (match.index > lastIndex) {
        chonks.push({ type: "text", text: text.substring(lastIndex, match.index) });
      }

      if (match.type === "storyCard") {
        const storyCard: StoryCard = Storage.map[match.text.trim().toLowerCase()];
        let skip = false;
        if (responseType === ResponseType.Action && storyCard.restriction === "Story Only") skip = true;
        if (responseType !== ResponseType.Action && storyCard.restriction === "Action Only") skip = true;
        chonks.push({ type: "storyCard", storyCard, text: match.text, skip });
      } else {
        chonks.push({ type: match.type as any, text: match.text });
      }

      lastIndex = match.index + match.length;
    }

    if (lastIndex < text.length) {
      chonks.push({ type: "text", text: text.substring(lastIndex) });
    }

    return chonks;
  });
</script>

<span class="dui-response">
  {#each chunks as chunk}
    {#if chunk.type === "storyCard" && !chunk.skip}
      <PrettyElement storyCard={chunk.storyCard} text={chunk.text} />
    {:else if chunk.type === "bold"}
      <b>{chunk.text}</b>
    {:else if chunk.type === "italic"}
      <i>{chunk.text}</i>
    {:else if chunk.type === "underline"}
      <u>{chunk.text}</u>
    {:else if chunk.type === "strikethrough"}
      <s>{chunk.text}</s>
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
