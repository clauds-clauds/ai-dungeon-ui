<script lang="ts">
  import { editState, panelState, Utils, type StoryCard } from "@/shared";

  interface Preview {
    storyCard: StoryCard;
  }

  let { storyCard }: Preview = $props();
</script>

<button
  class="dui-preview"
  style="background-image: {storyCard?.graphics?.[storyCard.currentGraphic]
    ? `url('${storyCard.graphics[storyCard.currentGraphic]}')`
    : 'none'};"
  onclick={() => {
    editState.name = storyCard.name;
    panelState.tab = "Editor";
  }}
>
  {#if !storyCard.graphics || storyCard.graphics.length === 0}
    <div class="dui-preview-icon">
      <span class="dui-icon">{Utils.getIconByType(storyCard.type ?? "missing")}</span>
    </div>
  {/if}
  <div class="dui-preview-footer">
    <span class="dui-preview-name">{storyCard.name || ""}</span>
    <span class="dui-preview-type">{storyCard.type || ""}</span>
  </div>
</button>

<style lang="scss">
  .dui-preview {
    position: relative;
    display: flex;
    flex: 1;
    padding: var(--dui-size-charlie);
    aspect-ratio: var(--dui-aspect-card);
    background-color: rgb(from var(--dui-color-orange) r g b / 0.1);
    border-radius: var(--dui-size-charlie);
    transition: all var(--dui-animation-duration-delta) ease-in-out;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
  }

  .dui-preview-icon {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 0;
    bottom: 20%;

    .dui-icon {
      transform: scale(6.5);
      color: currentColor;
      display: inline-block;
      opacity: 0.1;
      line-height: 1;
      text-shadow: 1px 1px 0 rgba(0, 0, 0, 1);
    }
  }

  .dui-preview-footer {
    z-index: 1;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--dui-size-alpha);
    filter: drop-shadow(0px 0px 1rem rgba(0, 0, 0, 1)) drop-shadow(0px 0px 1rem rgba(0, 0, 0, 1))
      drop-shadow(0px 0px 1rem rgba(0, 0, 0, 1));
  }

  .dui-preview-name {
    font-weight: 700;
    text-transform: uppercase;
    color: var(--dui-color-juliett);
    word-wrap: break-word;
    word-break: normal;
    overflow-wrap: anywhere;
    text-shadow: 4px 6px 0 rgba(0, 0, 0, 0.6);
  }

  .dui-preview-type {
    font-weight: 600;
    text-transform: uppercase;
    color: var(--dui-color-orange);
    letter-spacing: 0.06em;
    text-shadow: 2px 3px 0 rgba(0, 0, 0, 0.6);
  }
</style>
