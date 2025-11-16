<!-- Pretty editor scripting HERE! -->
<script lang="ts">
  import { Config, Logger, Storage, Utils } from "@/shared";
  import Field from "../generic/Field.svelte";
  import Foldout from "../generic/Foldout.svelte";
  import Row from "../generic/Row.svelte";
  import Select from "../generic/Select.svelte";
  import Text from "../generic/Text.svelte";
  import { editorState } from "@/shared/state.svelte";
  import type { PrettyCard } from "@/shared/types";
  import { cards } from "@/shared/storage";
  import Gallery from "../generic/Gallery.svelte";

  // Add a new card if this one is new.
  if (!Storage.containsCard(editorState.name)) {
    const card: PrettyCard = {
      id: Utils.getAdventureId(),
      name: editorState.name,
      type: "Test",
      triggers: "",

      customization: "Global",
      highlight: "All",
      textColor: "#f8ae2c",
      borderColor: "#f8ae2c",
      borderStyle: "Solid",

      icons: [],
      graphics: [],
    };
    Storage.upsertCard(card);
    Logger.success(`Added ${editorState.name} to the pretty cards!`);
  }
</script>

{#if $cards[editorState.name]}
  <!-- Pretty editor layout HERE! -->
  <div id={Config.ID_PRETTY_EDITOR} class="dui-editor">
    <Row>
      <Field label="HIGHLIGHT">
        <Select choices={["Always", "Story Only", "Action Only"]} bind:value={$cards[editorState.name].highlight} />
      </Field>
      <Field label="CUSTOMIZATION">
        <Select choices={["Global", "Custom"]} bind:value={$cards[editorState.name].customization} />
      </Field>
    </Row>

    <Field label="TRIGGERS (ART)">
      <Text placeholder="Enter some comma separated art triggers." bind:value={$cards[editorState.name].triggers} />
    </Field>

    <Field label="Art">
      <Foldout icon="w_image" label="Icons & Graphics">
        <Field label="Icons">
          <Gallery bind:data={$cards[editorState.name].icons} />
        </Field>

        <Field label="Graphics">
          <Gallery bind:data={$cards[editorState.name].graphics} />
        </Field>
      </Foldout>
    </Field>

    {#if $cards[editorState.name].customization === "Custom"}
      <Field label="EXTRA">
        <Foldout icon="w_wide_brush" label="Borders & Colors"></Foldout>
      </Field>
    {/if}
  </div>
{/if}

<!-- Pretty editor styling HERE! -->
<style lang="scss">
  .dui-editor {
    display: flex;
    flex-direction: column;
    gap: var(--dui-gap-medium);
  }
</style>
