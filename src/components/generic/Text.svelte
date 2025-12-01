<!-- Text Field HERE! -->
<script lang="ts">
  interface Text {
    value?: string;
    placeholder?: string;
    readonly?: boolean;
    area?: boolean;
  }

  let { value = $bindable(), placeholder = "This is a placeholder!", readonly = false, area = false }: Text = $props();
</script>

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

<style lang="scss">
  .dui-text {
    background-color: var(--dui-color-core-charlie);
    color: var(--dui-color-core-echo);
    border-radius: var(--dui-border-radius-medium);
    font-size: var(--dui-font-size-medium);

    min-height: var(--dui-size-large);
    padding: 10px 12px;

    &.readonly {
      pointer-events: none;
      color: var(--dui-color-core-delta);
    }
  }

  #dui-textarea {
    resize: vertical;
    scrollbar-width: none;

    &.readonly {
      resize: none;
    }
  }

  textarea::placeholder,
  input::placeholder {
    color: var(--dui-color-core-echo);
    opacity: 0.25;
  }
</style>
