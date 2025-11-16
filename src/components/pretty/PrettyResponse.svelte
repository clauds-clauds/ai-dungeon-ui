<!-- Pretty response scripting HERE! -->
<script lang="ts">
  import { Storage } from "@/shared";
  import type { PrettyCard } from "@/shared/types";

  interface PrettyResponse {
    text: string;
    isAction?: boolean;
    isLast?: boolean;
  }

  let { text = "", isAction = false, isLast = false }: PrettyResponse = $props();

  type TextChunk = { type: "text"; content: string } | { type: "entity"; entity: PrettyCard; match: string };
  const regex = /(\s+|[.,!?;:"']|\n)/;

  const chunks: TextChunk[] = $derived.by(() => {
    const chonks: TextChunk[] = [];
    const parts = text.split(regex).filter(Boolean);

    for (const part of parts) {
      if (!part) continue; // HERE I WAS.

      const card = Storage.mapCards[part.trim().toLowerCase()];
    }

    return chonks;
  });
</script>

<!-- Pretty response layout HERE! -->
{text}

<!-- Pretty response styling HERE! -->
<style lang="scss"></style>
