<script lang="ts">
  import { extensionState } from "@/shared/state.svelte";
  import Foldout from "../sorting/Foldout.svelte";
  import Slider from "../generic/Slider.svelte";
  import { settings } from "@/shared/storage";
  import Group from "../sorting/Group.svelte";
  import Text from "../generic/Text.svelte";
  import { Utils } from "@/shared/utils";
  import Note from "../sorting/Note.svelte";
  import Color from "../generic/Color.svelte";
  import Toggle from "../generic/Toggle.svelte";
  import Button from "../generic/Button.svelte";
</script>

{#if extensionState.currentSubtab === "GENERAL"}
  <Foldout icon="switch_access" label="Features" description="Customize which features to enable!">
    <Group label="Formatter">
      <Note text="Toggle whether special formatting is applied to responses!">
        <Toggle bind:checked={$settings.formatterEnabled} />
      </Note>
    </Group>

    <Group label="Traveller">
      <Note
        text="Toggle whether the custom traveller system is enabled! It renders graphics above recent responses based on specific triggers!"
      >
        <Toggle bind:checked={$settings.travellerEnabled} />
      </Note>
    </Group>
  </Foldout>

  <Foldout icon="activity_zone" label="Highlight" description="Customize how highlights look!">
    <Group label="ICON SIZE">
      <Slider min={8} max={40} bind:value={$settings.iconSize} />
    </Group>

    <Group label="ICON BORDER SIZE">
      <Slider min={0} max={16} bind:value={$settings.iconBorderSize} />
    </Group>

    <Group label="ICON BORDER ROUNDNESS">
      <Slider bind:value={$settings.iconBorderRoundness} />
    </Group>
  </Foldout>

  <Foldout icon="tooltip" label="Tooltip" description="Customize the appearance of the tooltip!">
    <Group label="TOOLTIP WIDTH">
      <Slider bind:value={$settings.tooltipWidth} min={0} max={1024} step={32} />
    </Group>

    <Group label="TOOLTIP HEIGHT">
      <Slider bind:value={$settings.tooltipHeight} min={0} max={1024} step={32} />
    </Group>

    <Group label="TOOLTIP HIDE DELAY">
      <Slider bind:value={$settings.tooltipHideDelay} min={50} max={5000} step={50} />
    </Group>
  </Foldout>

  <Foldout icon="format_paint" label="Color" description="Customize the coloring of borders and highlights!">
    <Group label="TEXT COLOR">
      <Note text="Customize the text color of highlights! Only used if the card is using the `Vanilla` coloring mode!">
        <Color bind:value={$settings.highlightColor} />
      </Note>
    </Group>

    <Group label="BORDER COLOR">
      <Note
        text="Customize the color of the border which outlines the icons! Only used if the card is using the `Vanilla` coloring mode!"
      >
        <Color bind:value={$settings.iconBorderColor} />
      </Note>
    </Group>
  </Foldout>

  {#if $settings.formatterEnabled}
    <Foldout
      icon="brand_family"
      label="Formatter"
      description="Customize which regular expressions to use for the special formatting!"
    >
      <Group label="BOLD">
        <Text bind:value={$settings.formatterBold} />
      </Group>

      <Group label="ITALIC">
        <Text bind:value={$settings.formatterUnderline} />
      </Group>

      <Group label="UNDERLINE">
        <Text bind:value={$settings.formatterUnderline} />
      </Group>

      <Group label="STRIKETHROUGH">
        <Text bind:value={$settings.formatterStrikethrough} />
      </Group>
    </Foldout>
  {/if}

  {#if $settings.travellerEnabled}
    <Foldout icon="hiking" label="Traveller" description="Customize how the traveller system works!">
      <Group label="TRIGGERS">
        <Text bind:value={$settings.travellerTriggers} />
      </Group>

      <Group label="TRAVELLER WIDTH">
        <Slider bind:value={$settings.travellerWidth} min={0} max={1024} step={32} />
      </Group>

      <Group label="TRAVELLER HEIGHT">
        <Slider bind:value={$settings.travellerHeight} min={0} max={1024} step={32} />
      </Group>
    </Foldout>
  {/if}
{/if}

{#if extensionState.currentSubtab === "DEVELOPER"}
  <Foldout icon="developer_board" label="Tools" description="View some handy debugging features!">
    <Group label="DEVELOPER MODE">
      <Note text="Enable this if you want to see response information and console logs!">
        <Toggle bind:checked={$settings.devModeEnabled} />
      </Note>
    </Group>

    <Group label="PERFORMANCE MODE">
      <Note text="Enable this to boost performance, handy for mobile devices!">
        <Toggle bind:checked={$settings.performanceModeEnabled} />
      </Note>
    </Group>
  </Foldout>

  <Foldout icon="bug_report" label="Debug" description="View debugging information about the current adventure!">
    <Group label="Adventure ID">
      <Text value={Utils.getAdventureId()} placeholder="Are you sure an adventure is loaded?" readonly={true} />
    </Group>

    <Group label="Environment">
      <Text value={Utils.getEnvironment()} placeholder="Are you sure that you are on the site?" readonly={true} />
    </Group>
  </Foldout>

  <Foldout icon="skull" label="Danger Zone" description="View some scary buttons!">
    <Group label="RESET SETTINGS">
      <Note text="Click this button to reset all the settings!">
        <Button icon="delete" label="" dangerous={true} />
      </Note>
    </Group>
  </Foldout>
{/if}
