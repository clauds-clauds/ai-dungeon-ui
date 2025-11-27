<script lang="ts">
  import { Storage, Utils } from "@/shared";
  import { cards } from "@/shared/storage";
  import type { PrettyCard } from "@/shared/types";

  interface PrettyPreview {
    prettyCard: PrettyCard;
  }

  let { prettyCard }: PrettyPreview = $props();
</script>

<div class="dui-preview">
  <div class="dui-preview-content">
    <div class="dui-preview-metadata">
      <span class="dui-preview-title">{prettyCard.name}</span>
      <span class="dui-preview-id">{prettyCard.id}</span>
      <div class="dui-preview-buttons">
        <button
          class="dui-preview-button"
          onclick={() => {
            Storage.deleteCard(prettyCard.name);
          }}
        >
          <span class="dui-icon">delete_forever</span>
          Delete
        </button>
      </div>
    </div>
  </div>
  {#if prettyCard.graphics?.length > 0}
    <img class="dui-preview-image" src={prettyCard.graphics[0]} alt="" />
  {/if}
</div>

<style lang="scss">
  .dui-preview {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    background-color: var(--dui-color-basic-charlie);
    border-radius: var(--dui-border-radius-medium);
    overflow: hidden;
    height: 128px;
  }

  .dui-preview-image {
    width: 25%;
    height: 100%;
    object-fit: cover;
    display: block;
    flex-shrink: 0;
  }

  .dui-preview-content {
    flex: 1;
    padding: var(--dui-padding-medium);
    display: flex;
    flex-direction: row;
  }

  .dui-preview-metadata {
    display: flex;
    flex-direction: column;
  }

  .dui-preview-title {
    font-size: 20px;
  }

  .dui-preview-id {
    font-weight: 100;
    color: white;
  }

  .dui-preview-buttons {
    display: flex;
    flex-direction: row;
    margin-top: auto;
    gap: var(--dui-gap-medium);
  }

  .dui-preview-button {
    display: flex;
    background-color: var(--dui-color-orange);
    border-radius: var(--dui-border-radius-small);
    color: black;
    padding: var(--dui-padding-small);
    align-items: center;
    gap: var(--dui-gap-small);
    text-transform: uppercase;
    cursor: pointer;
  }
</style>
