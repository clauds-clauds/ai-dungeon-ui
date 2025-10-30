<!-- Text Scripting HERE! -->
<script lang="ts">
  // DungeonUI Imports HERE!
  import type { Generic } from "@/lib/types";

  // Interface HERE!
  interface Text extends Generic {
    value?: string;
    placeholder?: string;
    readonly?: boolean;
    area?: boolean;
  }

  // Props HERE!
  let { value = $bindable(), placeholder, readonly, area }: Text = $props();
</script>

<!-- Text Layout HERE! -->
{#if area}
  <textarea
    id="dungeon-ui-textarea"
    class="dungeon-ui-text"
    class:readonly
    autocomplete="off"
    bind:value
    {placeholder}
    {readonly}
    wrap="soft"
  ></textarea>
{:else}
  <input class="dungeon-ui-text" class:readonly type="text" autocomplete="off" bind:value {placeholder} {readonly} />
{/if}

<!-- Text Styling HERE! -->
<style lang="scss">
  .dungeon-ui-text {
    background: var(--d-ui-color-core-charlie);
    color: var(--d-ui-color-core-echo);
    border-radius: var(--d-ui-border-radius-medium);
    padding: 10px 12px;
    min-height: var(--d-ui-size-large);

    &.readonly {
      color: var(--d-ui-color-core-delta);
    }
  }

  #dungeon-ui-textarea {
    resize: vertical;
    scrollbar-width: none;
  }

  textarea::placeholder,
  input::placeholder {
    color: var(--d-ui-color-core-echo);
    opacity: 0.35;
  }
</style>
