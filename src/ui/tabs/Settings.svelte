<!-- Settings Scripting HERE! -->
<script lang="ts">
  // DungeonUI Imports HERE!
  import { BorderStyleChoice, FormatterChoice, GenericChoice, HighlightChoice, IconResolutionChoice } from "@/lib/types";
  import { uiState } from "@/lib/state.svelte";
  import { settings } from "@/lib/storage";
  import { Utils } from "@/lib/utils";

  // Component Imports HERE!
  import Foldout from "../components/sorting/Foldout.svelte";
  import Row from "../components/sorting/Row.svelte";
  import Field from "../components/sorting/Field.svelte";
  import Slider from "../components/Slider.svelte";
  import Select from "../components/Select.svelte";
  import Text from "../components/Text.svelte";
  import Color from "../components/Color.svelte";
  import Button from "../components/Button.svelte";
</script>

<!-- General Settings HERE! -->
{#if uiState.subtab === "GENERAL"}
  <!-- Text Effects HERE! -->
  <Foldout icon="text_fields" label="TEXT EFFECTS" description="Customize the font, format, and more!">
    <Row>
      <Field label="Formatter">
        <Select choices={Utils.toChoices(FormatterChoice)} bind:value={$settings.choiceFormatter} />
      </Field>

      <Field label="Text">
        <Select choices={Utils.toChoices(GenericChoice)} bind:value={$settings.choiceText} />
      </Field>
    </Row>
  </Foldout>

  {#if $settings.choiceText === GenericChoice.Custom}
    <Foldout icon="brand_family" label="FONT" description="Customize which font is used!">
      <Field label="File">
        <Text value={$settings.customFontTitle} readonly={true} />
        <Button
          icon="place_item"
          label="IMPORT"
          onclick={async () => {
            const file = await Utils.requestFile(".woff,.woff2,.ttf,.otf");
            if (!file) return;

            $settings.customFontTitle = file.name;
            const fontData = await Utils.convertFile(file);
            $settings.customFont = fontData;
          }}
        />
      </Field>
    </Foldout>
  {/if}

  <Foldout icon="colors" label="COLORS" description="Customize text, theme, and highlight colors!">
    <Row>
      <Field label="Theme">
        <Color bind:value={$settings.colorTheme} />
      </Field>
      <Field label="Accent">
        <Color bind:value={$settings.colorAccent} />
      </Field>
      {#if $settings.choiceText === GenericChoice.Custom}
        <Field label="Action">
          <Color bind:value={$settings.colorAction} />
        </Field>
        <Field label="Story">
          <Color bind:value={$settings.colorStory} />
        </Field>
      {/if}
    </Row>
  </Foldout>

  <!-- Icons HERE! -->
  <Foldout icon="acupuncture" label="ICONS" description="Customize sizes, borders, and more!">
    <Field label="Icon Size (px)">
      <Slider max={64} bind:value={$settings.iconSize} />
    </Field>

    <Field label="Icon Roundness (%)">
      <Slider bind:value={$settings.iconRoundness} />
    </Field>

    <Field label="Border Size (px)">
      <Slider max={16} bind:value={$settings.iconBorderSize} />
    </Field>

    <Field label="Border Opacity (%)">
      <Slider bind:value={$settings.iconBorderOpacity} />
    </Field>
  </Foldout>

  <Foldout icon="tooltip" label="TOOLTIP" description="Customize size, delay, and more!">
    <Field label="Delay">
      <Slider bind:value={$settings.tooltipDelay} step={50} max={2000} />
    </Field>

    <Field label="Size">
      <Slider bind:value={$settings.tooltipMaxSize} step={32} max={2048} />
    </Field>
  </Foldout>
  <!-- 
  <Foldout icon="hiking" label="TRAVEL" description="Customize location travelling!">
    <Field label="Triggers">
      <Text placeholder="Enter comma seperated keywords for travelling." />
    </Field>
  </Foldout>

  
  <Foldout icon="cadence" label="SFX" description="Customize audio volume!">
    <Field label="Volume">
      <Slider />
    </Field>
  </Foldout> -->
{/if}

<!-- Developer Settings HERE! -->
{#if uiState.subtab === "DEVELOPER"}
  <Foldout icon="frame_bug" label="DEBUG" description="View some developer information stuff!">
    <Row>
      <Field label="Version">
        <Text value={Utils.getVersion()} readonly={true}></Text>
      </Field>
      <Field label="Adventure ID">
        <Text value={Utils.getAdventureId()} readonly={true}></Text>
      </Field>
    </Row>
  </Foldout>
{/if}
