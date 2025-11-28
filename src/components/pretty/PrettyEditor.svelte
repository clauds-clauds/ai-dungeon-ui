<!-- Pretty Editor HERE! -->
<script lang="ts">
  import { storyCards } from "@/shared/storage";
  import {
    Row,
    TextField,
    Foldout,
    Config,
    editState,
    Group,
    ImageCollection,
    Select,
    Storage,
    type StoryCard,
    Utils,
  } from "@/shared";

  if (!Storage.hasStoryCard(editState.name)) {
    // Note to self: If there is ever an issue where people create new cards and they suddenly already have content, it is due to this below.
    editState.name = "My First Story Card";
    const storyCard: StoryCard = {
      id: Utils.getAdventureId(),
      name: editState.name,
      type: "Class",
      triggers: "",
      restriction: "None",
      textColor: Storage.readSettings().textColor,
      borderColor: Storage.readSettings().borderColor,
      borderStyle: "Solid",
      colorStyle: "Shared",
      icons: [],
      currentIcon: 0,
      graphics: [],
      currentGraphic: 0,
    };
    Storage.upsertStoryCard(storyCard);
  }

  let state = $state("Hide");
</script>

{#if $storyCards[editState.name]}
  <div id={Config.ID_EDITOR} class="dui-editor">
    <Group label="EXTRA OPTIONS">
      <Select options={["Hide", "Show"]} bind:value={state} />
    </Group>

    {#if state !== "Hide"}
      <Row>
        <Group label="Color">
          <Select bind:value={$storyCards[editState.name].colorStyle} options={["Shared", "Custom"]} />
        </Group>

        <Group label="Restriction">
          <Select bind:value={$storyCards[editState.name].restriction} options={["None", "Action Only", "Story Only"]} />
        </Group>
      </Row>

      <Foldout icon="owl" label="Icons & Graphics" blue={true}>
        <Row>
          <Group label="Triggers (ART)">
            <TextField bind:value={$storyCards[editState.name].triggers} placeholder="Enter some triggers!" />
          </Group>

          <Group label="Border">
            <Select bind:value={$storyCards[editState.name].borderStyle} options={["Solid", "Dashed", "Dotted"]} />
          </Group>
        </Row>

        <Group label="Icons">
          <ImageCollection bind:data={$storyCards[editState.name].icons} />
        </Group>

        <Group label="Graphics">
          <ImageCollection bind:data={$storyCards[editState.name].graphics} />
        </Group>
      </Foldout>
    {/if}
  </div>
{/if}

<style lang="scss">
  .dui-editor {
    display: flex;
    flex-direction: column;
    gap: var(--dui-size-charlie);
    font-family: var(--dui-font-interface);
    font-size: var(--dui-font-size-charlie);
  }
</style>
