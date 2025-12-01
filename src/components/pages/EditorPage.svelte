<script lang="ts">
  import { adventures, Storage } from "@/shared/storage";
  import Color from "../generic/Color.svelte";
  import ImageArray from "../generic/ImageArray.svelte";
  import Select from "../generic/Select.svelte";
  import Text from "../generic/Text.svelte";
  import Toggle from "../generic/Toggle.svelte";
  import Foldout from "../sorting/Foldout.svelte";
  import Group from "../sorting/Group.svelte";
  import Note from "../sorting/Note.svelte";
  import Row from "../sorting/Row.svelte";
  import { extensionState } from "@/shared/state.svelte";
  import type { StoryCard } from "@/shared/types";
  import { Utils } from "@/shared/utils";
  import Button from "../generic/Button.svelte";
  import ImageGenerator from "../generic/ImageGenerator.svelte";

  if (!Storage.contains(extensionState.storyCard)) {
    const card: StoryCard = Utils.createNewStoryCard();
    card.name = "TEMP";
    extensionState.storyCard = "TEMP";
    Storage.upsert(card);
  }
</script>

{#if $adventures[Utils.getAdventureId()]?.storyCards?.[extensionState.storyCard]}
  {#if extensionState.showDevPanel}
    <Group label="DELETE">
      <Note text="Click this button to delete the visuals of the card! This does not delete the on-site card!">
        <Button
          icon="delete"
          onclick={() => {
            Storage.delete(extensionState.storyCard);
            extensionState.currentTab = "WORLD";
          }}
        />
      </Note>
    </Group>
  {/if}

  <Group label="EDITOR">
    <Foldout icon="note_stack" label="Info" description="Customize the basics!">
      <Group label="CUSTOM COLOR">
        <Note text="Enable this to unlock custom coloring options!">
          <Toggle bind:checked={$adventures[Utils.getAdventureId()].storyCards[extensionState.storyCard].useCustomColor} />
        </Note>
      </Group>
      <Row>
        <Group label="LIMIT">
          <Select
            bind:value={$adventures[Utils.getAdventureId()].storyCards[extensionState.storyCard].limit}
            options={["None", "Action", "Story"]}
          />
        </Group>

        <Group label="BORDER STYLE">
          <Select
            bind:value={$adventures[Utils.getAdventureId()].storyCards[extensionState.storyCard].iconBorderStyle}
            options={["Solid", "Dashed", "Dotted"]}
          />
        </Group>
      </Row>
      <Group label="TRIGGERS">
        <Text
          bind:value={$adventures[Utils.getAdventureId()].storyCards[extensionState.storyCard].triggers}
          placeholder={"Customize the triggers for this card!"}
        />
      </Group>
    </Foldout>

    <Foldout icon="image" label="Icons & Graphics" description="Customize the art here!">
      <Group label="Icons">
        <ImageArray bind:data={$adventures[Utils.getAdventureId()].storyCards[extensionState.storyCard].icons} />
      </Group>

      <Group label="Graphics">
        <ImageArray bind:data={$adventures[Utils.getAdventureId()].storyCards[extensionState.storyCard].graphics} />
      </Group>
    </Foldout>

    <Foldout icon="wand_stars" label="Image Generation">
      <ImageGenerator
        onapplyclick={() => {
          if (Utils.isStringInvalid(extensionState.generatedImage)) return;
          const storyCard: StoryCard = $adventures[Utils.getAdventureId()].storyCards[extensionState.storyCard];
          storyCard.graphics = [...storyCard.graphics, extensionState.generatedImage];
          Storage.upsert(storyCard);
        }}
      />
    </Foldout>

    {#if $adventures[Utils.getAdventureId()].storyCards[extensionState.storyCard].useCustomColor}
      <Foldout icon="format_paint" label="Colors" description="Customize the colors!">
        <Group label="COLOR">
          <Note text="Customize the text color of this card!">
            <Color bind:value={$adventures[Utils.getAdventureId()].storyCards[extensionState.storyCard].color} />
          </Note>
        </Group>

        <Group label="BORDER COLOR">
          <Note text="Customize the color of the border!">
            <Color bind:value={$adventures[Utils.getAdventureId()].storyCards[extensionState.storyCard].iconBorderColor} />
          </Note>
        </Group>
      </Foldout>
    {/if}
  </Group>
{/if}
