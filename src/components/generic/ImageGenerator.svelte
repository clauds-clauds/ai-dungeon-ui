<script lang="ts">
  import { settings } from "@/shared/storage";
  import Group from "../sorting/Group.svelte";
  import Row from "../sorting/Row.svelte";
  import Button from "./Button.svelte";
  import Select from "./Select.svelte";
  import Text from "./Text.svelte";
  import { Generation } from "@/shared/generation";
  import { extensionState } from "@/shared/state.svelte";
  import { Utils } from "@/shared/utils";

  interface ImageGenerator {
    onapplyclick?: () => void;
  }

  let { onapplyclick }: ImageGenerator = $props();

  let prompt = $state("");
</script>

<div class="dui-image-generator">
  {#if !Utils.isStringInvalid(extensionState.generatedImage)}
    <Group label="PREVIEW">
      <img
        class="dui-image-preview"
        src={extensionState.generatedImage}
        alt="Generated preview"
        style:aspect-ratio={$settings.generationAspectRatio}
      />
    </Group>
  {/if}

  <Row>
    <Group label="MODEL">
      <Text bind:value={$settings.generationModel} placeholder="Enter the name here!" />
    </Group>

    <Group label="ASPECT RATIO">
      <Select
        bind:value={$settings.generationAspectRatio}
        options={["3:2", "4:3", "16:9", "21:9", "1:1", "2:3", "3:4", "9:16"]}
      />
    </Group>
  </Row>

  <Group label="PROMPT">
    <Text bind:value={prompt} area={true} placeholder="Enter an image generation prompt here!" />
  </Group>

  <Group label="Buttons">
    <div class="dui-buttons">
      <button
        class="dui-button"
        onclick={() => {
          Generation.generate(prompt);
        }}
      >
        <span class="dui-icon">rocket_launch</span>
        {#if !extensionState.generatingImage}
          Generate!
        {:else}Generating...{/if}
      </button>
      <button class="dui-button" onclick={onapplyclick}>
        <span class="dui-icon">check_small</span>
        Apply!
      </button>
    </div>
  </Group>
</div>

<style lang="scss">
  .dui-image-generator {
    display: flex;
    flex-direction: column;
    gap: var(--dui-gap-small);
  }

  .dui-image-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: red;
    border-radius: var(--dui-border-radius-medium);
  }

  .dui-buttons {
    display: flex;
    flex-direction: row;
    gap: var(--dui-gap-small);
  }

  .dui-button {
    display: flex;
    background: var(--dui-color-theme);
    color: black;
    border-radius: var(--dui-border-radius-medium);
    padding: var(--dui-padding-medium) var(--dui-padding-medium);
    font-size: var(--dui-font-size-large);
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    gap: var(--dui-gap-tiny);
    cursor: pointer;
  }
</style>
