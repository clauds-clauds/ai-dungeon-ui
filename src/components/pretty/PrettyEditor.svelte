<!-- Pretty editor scripting HERE! -->
<script lang="ts">
  import type { PrettyCard } from "@/shared/types";
  import { Config, Logger, Storage, Utils } from "@/shared";
  import { Field, Row, Select, Foldout, Gallery, Text } from "@/shared";
  import { editorState } from "@/shared/state.svelte";
  import { settings, cards } from "@/shared/storage";
  import Slider from "../generic/Slider.svelte";

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
      colorStyle: "Default",

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
      <Select choices={["Hide", "Customize (Card)", "Configure (Shared)"]} bind:value={choice} />
    </Field>

    {#if choice === "Customize (Card)"}
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

      <Row>
        <Field label="Border Style">
          <Select choices={["Solid", "Dashed", "Dotted"]} bind:value={$cards[editorState.name].borderStyle} />
        </Field>

        <Field label="Color Style">
          <Select choices={["Default", "Custom"]} bind:value={$cards[editorState.name].colorStyle} />
        </Field>

        <Field label="HIGHLIGHT">
          <Select choices={["Always", "Story Only", "Action Only"]} bind:value={$cards[editorState.name].highlight} />
        </Field>
      </Row>

      {#if $cards[editorState.name].colorStyle === "Custom"}
        <Field label="Art">
          <Foldout icon="w_wide_brush" label="Colors"></Foldout>
        </Field>
      {/if}
    {/if}

    {#if choice === "Configure (Shared)"}
      <Field label="Art">
        <Foldout icon="w_filter" label="Sliders">
          <Row>
            <Field label="Icon Size (pixels)">
              <Slider min={8} max={40} bind:value={$settings.iconSize} />
            </Field>

            <Field label="Icon Roundness (%)">
              <Slider bind:value={$settings.iconRoundness} />
            </Field>
          </Row>

          <Row>
            <Field label="Border Width (pixels)">
              <Slider min={0} max={16} bind:value={$settings.borderWidth} />
            </Field>

            <Field label="Border Opacity (%)">
              <Slider bind:value={$settings.borderOpacity} />
            </Field>
          </Row>

          <Row>
            <Field label="Tooltip Max Width">
              <Slider min={0} max={1024} step={32} bind:value={$settings.tooltipMaxWidth} />
            </Field>

            <Field label="Tooltip Max Height">
              <Slider min={0} max={1024} step={32} bind:value={$settings.tooltipMaxHeight} />
            </Field>
          </Row>
        </Foldout>
      </Field>
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
