<!-- Pretty editor scripting HERE! -->
<script lang="ts">
  import type { PrettyCard } from "@/shared/types";
  import { Config, Logger, Storage, Utils } from "@/shared";
  import { Field, Row, Select, Foldout, Gallery, Text } from "@/shared";
  import { editorState } from "@/shared/state.svelte";
  import { settings, cards } from "@/shared/storage";
  import Slider from "../generic/Slider.svelte";
  import Color from "../generic/Color.svelte";

  if (!Storage.containsCard(editorState.name)) {
    const card: PrettyCard = {
      id: Utils.getAdventureId(),
      name: editorState.name,
      type: "Test",
      triggers: "",

      highlight: "Always",
      textColor: "#f8ae2c",
      borderColor: "#f8ae2c",
      borderStyle: "Solid",
      colorStyle: "Shared",

      icons: [],
      currentIcon: 0,
      graphics: [],
      currentGraphic: 0,
    };
    Storage.upsertCard(card);
    Logger.success(`Added ${editorState.name} to the pretty cards!`);
  }

  let choice = $state("Hide");
</script>

{#if $cards[editorState.name]}
  <div id={Config.ID_PRETTY_EDITOR} class="dui-editor">
    <Field label="Pretty Stuff">
      <Select choices={["Hide", "Show"]} bind:value={choice} />
    </Field>

    {#if choice === "Show"}
      <Field label="TRIGGERS (ART)">
        <Text placeholder="Enter some comma separated art triggers." bind:value={$cards[editorState.name].triggers} />
      </Field>

      <Field label="Art">
        <Foldout icon="brush" label="Icons & Graphics">
          <Field label="Icons">
            <Gallery bind:data={$cards[editorState.name].icons} />
          </Field>

          <Field label="Graphics">
            <Gallery bind:data={$cards[editorState.name].graphics} />
          </Field>
        </Foldout>

        {#if $cards[editorState.name].colorStyle === "Custom"}
          <Foldout icon="format_paint" label="Colors">
            <Field label="Color">
              <Row>
                <Text value="Customize the text color." readonly={true} area={true} />
                <Color bind:value={$cards[editorState.name].textColor} />
              </Row>
            </Field>

            <Field label="Border Color">
              <Row>
                <Text value="Customize the border color." readonly={true} area={true} />
                <Color bind:value={$cards[editorState.name].borderColor} />
              </Row>
            </Field>
          </Foldout>
        {/if}
      </Field>

      <Row>
        <Field label="Border Style">
          <Select choices={["Solid", "Dashed", "Dotted"]} bind:value={$cards[editorState.name].borderStyle} />
        </Field>

        <Field label="Color Style">
          <Select choices={["Shared", "Custom"]} bind:value={$cards[editorState.name].colorStyle} />
        </Field>

        <Field label="HIGHLIGHT">
          <Select choices={["Always", "Story Only", "Action Only"]} bind:value={$cards[editorState.name].highlight} />
        </Field>
      </Row>
    {/if}
  </div>
{/if}

<style lang="scss">
  .dui-editor {
    display: flex;
    flex-direction: column;
    gap: var(--dui-gap-medium);
  }
</style>
