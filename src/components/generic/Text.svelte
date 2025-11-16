<!-- Text scripting HERE! -->
<script lang="ts">
  // Imports HERE!
  import type { GenericComponent } from "@/shared/types";

  // Interface HERE!
  interface Text extends GenericComponent {
    value?: string;
    placeholder?: string;
    readonly?: boolean;
    area?: boolean;
  }

  // Props HERE!
  let { value = $bindable(), placeholder, readonly, area }: Text = $props();
</script>

<!-- Text layout HERE! -->
{#if area}
  <textarea
    id="dui-textarea"
    class="dui-text dui-attention"
    class:readonly
    autocomplete="off"
    bind:value
    {placeholder}
    {readonly}
    wrap="soft"
  ></textarea>
{:else}
  <input class="dui-text dui-attention" class:readonly type="text" autocomplete="off" bind:value {placeholder} {readonly} />
{/if}

<!-- Text styling HERE! -->
<style lang="scss">
  .dui-text {
    background-color: var(--dui-color-basic-bravo);
    color: var(--dui-color-basic-echo);
    border-radius: var(--dui-border-radius-medium);
    font-size: var(--dui-font-size-medium-large);

    min-height: var(--dui-size-large);
    padding: 10px 12px;

    &.readonly {
      color: var(--dui-color-basic-delta);
    }
  }

  #dui-textarea {
    resize: vertical;
    scrollbar-width: none;
  }

  textarea::placeholder,
  input::placeholder {
    color: var(--dui-color-basic-echo);
    opacity: 0.25;
  }
</style>
