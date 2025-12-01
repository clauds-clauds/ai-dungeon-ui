<script lang="ts">
  import Group from "@/components/generic/Group.svelte";
  import { Color, Foldout, Note, Row, Slider, TextField, Toggle, Utils } from "@/shared";
  import { settings } from "@/shared/storage";
</script>

<Foldout icon="mode_off_on" label="Features" description="Customize which features should be enabled!">
  <Group label="Formatter Enabled">
    <Note
      description="Toggle whether to apply some pretty text formatting."
      important="Rules can be configured under the RegEx foldout!"
    >
      <Toggle bind:checked={$settings.formatterEnabled} />
    </Note>
  </Group>

  <Group label="Traveller Enabled">
    <Note description="Toggle whether graphics should be shown based on action triggers.">
      <Toggle bind:checked={$settings.travellerEnabled} />
    </Note>
  </Group>

  <Group label="Image Generation Enabled">
    <Note description="Toggle image generation." important="Requires an OpenRouter API Key!">
      <Toggle bind:checked={$settings.generationEnabled} />
    </Note>
  </Group>
</Foldout>

{#if $settings.formatterEnabled}
  <Foldout icon="regular_expression" label="RegEx">
    <Group label="Bold Formatting">
      <TextField bind:value={$settings.ruleBold} />
    </Group>

    <Group label="Italic Formatting">
      <TextField bind:value={$settings.ruleItalic} />
    </Group>

    <Group label="Underline Formatting">
      <TextField bind:value={$settings.ruleUnderline} />
    </Group>

    <Group label="Strikethrough Formatting">
      <TextField bind:value={$settings.ruleStrikethrough} />
    </Group>
  </Foldout>
{/if}

<Foldout icon="ar_stickers" label="Icons" description="Customize icons and their borders!">
  <Group label="Icon Size (pixels)">
    <Slider bind:value={$settings.iconSize} min={8} max={40} />
  </Group>

  <Group label="Icon Border Thickness (pixels)">
    <Slider bind:value={$settings.iconBorderThickness} min={0} max={16} />
  </Group>

  <Group label="Icon Border Roundness (%)">
    <Slider bind:value={$settings.iconBorderRoundness} />
  </Group>
</Foldout>

<Foldout icon="tooltip" label="Tooltip" description="Customize the tooltip!">
  <Group label="Tooltip Width (pixels)">
    <Slider bind:value={$settings.tooltipWidth} min={0} max={1024} step={32} />
  </Group>

  <Group label="Tooltip Height (pixels)">
    <Slider bind:value={$settings.tooltipHeight} min={0} max={1024} step={32} />
  </Group>

  <Group label="Tooltip Hide Delay (ms)">
    <Slider bind:value={$settings.tooltipHideDelay} min={0} max={2000} step={25} />
  </Group>
</Foldout>

<Foldout icon="format_paint" label="Colors" description="Customize the shared text and border colors!">
  <Group label="Text Color">
    <Note description="Customize the shared color which is used to highlight names and such.">
      <Color bind:value={$settings.textColor} />
    </Note>
  </Group>

  <Group label="Border Color">
    <Note description="Customize the shared color which is used to paint the borders around icons.">
      <Color bind:value={$settings.borderColor} />
    </Note>
  </Group>
</Foldout>

<Foldout icon="dialogs" label="Responses" description="Customize the responses!">
  <Group label="Performance Mode">
    <Note description="Only paints the last response after loading." important="Improves performance for mobile devices!">
      <Toggle bind:checked={$settings.paintPerformanceMode} />
    </Note>
  </Group>
</Foldout>

<Foldout icon="hiking" label="Traveller" description="Customize how the traveller system works!">
  <Group label="Triggers">
    <TextField
      bind:value={$settings.travellerTriggers}
      placeholder="Enter comma separated traveller triggers! (Ex. travel to)"
    />
  </Group>

  <Group label="Traveller Width">
    <Slider bind:value={$settings.travellerWidth} min={0} max={2048} step={32} />
  </Group>

  <Group label="Traveller Height">
    <Slider bind:value={$settings.travellerHeight} min={0} max={2048} step={32} />
  </Group>
</Foldout>

<Foldout icon="data_object" label="Dev" description="Customize some developer stuff!">
  <Row>
    <Group label="Adventure ID">
      <TextField value={Utils.getAdventureId()} readonly={true} />
    </Group>

    <Group label="Environment">
      <TextField value={Utils.getEnvironment()} readonly={true} />
    </Group>
  </Row>

  <Group label="Integrated Editor">
    <Note description="Toggle whether the integrated editor is expanded by default.">
      <Toggle bind:checked={$settings.integratedEditor} />
    </Note>
  </Group>

  <Group label="Debug Data">
    <Note description="Toggle whether debug information is visible.">
      <Toggle bind:checked={$settings.debugData} />
    </Note>
  </Group>

  <Group label="Dangerous Settings">
    <Note description="Toggle whether to show dangerous stuff. Please do not touch without reason.">
      <Toggle bind:checked={$settings.dangerZone} />
    </Note>
  </Group>
</Foldout>

{#if $settings.dangerZone}
  <Foldout icon="skull" label="Danger" description="Customize some dangerous stuff!">
    <Group label="SC Selector (Type)">
      <TextField bind:value={$settings.storyCardTypeSelector} />
    </Group>

    <Group label="SC Selector (Name)">
      <TextField bind:value={$settings.storyCardNameSelector} />
    </Group>

    <Group label="SC Selector (Triggers)">
      <TextField bind:value={$settings.storyCardTriggersSelector} />
    </Group>

    <Group label="Response Selector">
      <TextField bind:value={$settings.responseSelector} />
    </Group>

    <Group label="Output ID">
      <TextField bind:value={$settings.outputId} />
    </Group>

    <Group label="Response ID">
      <TextField bind:value={$settings.responseId} />
    </Group>

    <Group label="Response Action ID">
      <TextField bind:value={$settings.responseActionId} />
    </Group>
  </Foldout>
{/if}
