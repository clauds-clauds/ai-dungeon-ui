<!-- Editor Scripting HERE! -->
<script lang="ts">
  // DungeonUI Imports HERE!
  import { entityState, imageGenState, uiState } from "@/lib/state.svelte";
  import { entities, settings, Storage } from "@/lib/storage";
  import {
    AspectRatioChoice,
    BorderStyleChoice,
    EntityType,
    HighlightChoice,
    HighlightLimitation,
    ModelChoice,
  } from "@/lib/types";
  import { Utils } from "@/lib/utils";

  // Component Imports HERE!
  import Foldout from "../components/sorting/Foldout.svelte";
  import Text from "../components/Text.svelte";
  import Field from "../components/sorting/Field.svelte";
  import Row from "../components/sorting/Row.svelte";
  import Select from "../components/Select.svelte";
  import Album from "../components/Album.svelte";
  import Button from "../components/Button.svelte";
  import Color from "../components/Color.svelte";
  import Sprite from "../components/Sprite.svelte";
  import { Dev } from "@/lib/dev";
  import { ImageGen } from "@/lib/image_gen";
  import Slider from "../components/Slider.svelte";
</script>

{#if uiState.subtab === "DETAILS"}
  <!-- Editor Layout HERE! -->
  <Foldout icon="note_stack" label="INFO" description="Customize the name, triggers and more!" expanded={true}>
    <Row>
      <Field label="Name">
        <Text placeholder="Enter a name..." bind:value={$entities[entityState.editorIndex].name} />
      </Field>

      <Field label="Type">
        <Select choices={Utils.toChoices(EntityType)} bind:value={$entities[entityState.editorIndex].type} />
      </Field>
    </Row>

    <Field label="Entry">
      <Text
        placeholder="Enter a more detailed entry here..."
        area={true}
        bind:value={$entities[entityState.editorIndex].entry}
      />
    </Field>

    <Field label="Triggers">
      <Text placeholder="Enter some comma separated triggers..." bind:value={$entities[entityState.editorIndex].triggers} />
    </Field>

    <div class="dungeon-ui-editor-button-group">
      <Button
        icon="exit_to_app"
        label="FINISH"
        onclick={() => {
          Utils.forceNavigate("WORLD");
        }}
      />
      <Button
        icon="delete_forever"
        label="DELETE"
        dangerous={true}
        onclick={() => {
          if (confirm(`Are you sure you want to delete ${$entities[entityState.editorIndex].name || "this entity"}?`)) {
            Storage.deleteEntity($entities[entityState.editorIndex].id);
            Utils.forceNavigate("WORLD");
          }
        }}
      />
    </div>
  </Foldout>

  <Foldout icon="draw" label="STYLE" description="Customize the color, border, and more!">
    <Row>
      <Field label="Limitation">
        <Select choices={Utils.toChoices(HighlightLimitation)} bind:value={$entities[entityState.editorIndex].limitation} />
      </Field>

      <Field label="Border Style">
        <Select choices={Utils.toChoices(BorderStyleChoice)} bind:value={$entities[entityState.editorIndex].borderStyle} />
      </Field>
    </Row>

    {#if $settings.choiceHighlight === HighlightChoice.Entity}
      <Row>
        <Field label="Highlight Color">
          <Color bind:value={$entities[entityState.editorIndex].color} />
        </Field>

        <Field label="Border Color">
          <Color bind:value={$entities[entityState.editorIndex].borderColor} />
        </Field>
      </Row>
    {/if}
  </Foldout>

  <Foldout icon="palette" label="ART" description="Customize the icons and graphics!">
    <Field label="Graphics">
      <Album bind:data={$entities[entityState.editorIndex].graphics} />
    </Field>

    <Field label="Icons">
      <Album bind:data={$entities[entityState.editorIndex].icons} />
    </Field>
  </Foldout>

  <Foldout icon="camera" label="IMAGE GEN" description="Generate images and save them!">
    {#if imageGenState.image}
      <img class="dungeon-ui-editor-image-preview" src={imageGenState.image} alt="" />
    {/if}

    <div class="dungeon-ui-editor-button-group">
      <Button
        icon="rocket_launch"
        label={!imageGenState.generating ? "GENERATE" : "GENERATING..."}
        onclick={async () => {
          // Do the image generation stuff here...
          await ImageGen.generate();
        }}
      />
      <Button
        icon="download_2"
        label="DOWNLOAD"
        dangerous={true}
        onclick={async () => {
          await Utils.downloadImage(imageGenState.image, "generated_image.png");
        }}
      />
      <Button
        icon="texture_add"
        label="APPLY"
        dangerous={true}
        onclick={() => {
          if (imageGenState.image) {
            $entities[entityState.editorIndex].graphics = [...$entities[entityState.editorIndex].graphics, imageGenState.image];
          }
        }}
      />
    </div>

    <Field label="Prompt">
      <Text placeholder="Enter a prompt..." area={true} bind:value={imageGenState.prompt} />
    </Field>

    <Row>
      <Field label="Model">
        <Select choices={Utils.toChoices(ModelChoice)} bind:value={$settings.imageGenModel} />
      </Field>

      <Field label="Aspect Ratio">
        <Select choices={Utils.toChoices(AspectRatioChoice)} bind:value={$settings.imageGenRatio} />
      </Field>
    </Row>

    <Field label="API Key">
      <Text placeholder="Enter your API key..." bind:value={$settings.imageGenApiKey} />
    </Field>
  </Foldout>
{/if}

<!-- Editor Styling HERE! -->
<style lang="scss">
  .dungeon-ui-editor-button-group {
    display: flex;
    flex-direction: row;
    gap: var(--d-ui-gap-small);
    flex-wrap: wrap;
  }

  .dungeon-ui-editor-image-preview {
    user-select: none;
    max-height: 384px;
    height: auto;
    width: auto;
    display: block;
    object-fit: contain;
  }
</style>
