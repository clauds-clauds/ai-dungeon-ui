<!-- Pretty Editor HERE! -->
<script lang="ts">
  import { adventures, settings } from "@/shared/storage";
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
    panelState,
  } from "@/shared";
  import Note from "../generic/Note.svelte";
  import Color from "../generic/Color.svelte";

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
  if ($settings.integratedEditor) state = "Show";
</script>

{#if panelState.visible && Utils.getAdventureId() !== ""}
  <button
    class="dui-editor-delete-button"
    onclick={() => {
      Storage.deleteStoryCard(editState.name);
      panelState.tab = "World";
    }}
  >
    <span class="dui-icon">delete</span>
    DELETE
  </button>
{/if}

{#if $adventures[Utils.getAdventureId()]?.storyCards?.[editState.name]}
  <div id={Config.ID_EDITOR} class="dui-editor">
    <Group label="EXTRA OPTIONS">
      <Select options={["Hide", "Show"]} bind:value={state} />
    </Group>

    {#if state !== "Hide"}
      <Row>
        <Group label="Color">
          <Select
            bind:value={$adventures[Utils.getAdventureId()].storyCards[editState.name].colorStyle}
            options={["Shared", "Custom"]}
          />
        </Group>

        <Group label="Restriction">
          <Select
            bind:value={$adventures[Utils.getAdventureId()].storyCards[editState.name].restriction}
            options={["None", "Action Only", "Story Only"]}
          />
        </Group>
      </Row>

      <Foldout icon="owl" label="Icons & Graphics" blue={true}>
        <Row>
          <Group label="Triggers (ART)">
            <TextField
              bind:value={$adventures[Utils.getAdventureId()].storyCards[editState.name].triggers}
              placeholder="Enter some triggers!"
            />
          </Group>

          <Group label="Border">
            <Select
              bind:value={$adventures[Utils.getAdventureId()].storyCards[editState.name].borderStyle}
              options={["Solid", "Dashed", "Dotted"]}
            />
          </Group>
        </Row>

        <Group label="Icons">
          <ImageCollection bind:data={$adventures[Utils.getAdventureId()].storyCards[editState.name].icons} />
        </Group>

        <Group label="Graphics">
          <ImageCollection bind:data={$adventures[Utils.getAdventureId()].storyCards[editState.name].graphics} />
        </Group>
      </Foldout>

      {#if $adventures[Utils.getAdventureId()].storyCards[editState.name].colorStyle === "Custom"}
        <Foldout icon="format_paint" label="Colors" blue={true}>
          <Group label="Text Color">
            <Note description="This is a very fancy placeholder...">
              <Color bind:value={$adventures[Utils.getAdventureId()].storyCards[editState.name].textColor} />
            </Note>
          </Group>

          <Group label="Border Color">
            <Note description="This is a very fancy placeholder...">
              <Color bind:value={$adventures[Utils.getAdventureId()].storyCards[editState.name].borderColor} />
            </Note>
          </Group>
        </Foldout>
      {/if}
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

  .dui-editor-delete-button {
    display: flex;
    gap: var(--dui-size-alpha);
    background-color: var(--dui-color-blue);
    color: var(--dui-color-alpha);
    border-radius: var(--dui-size-bravo);
    padding: var(--dui-size-charlie) var(--dui-size-foxtrot);
    margin-bottom: var(--dui-size-charlie);
    text-transform: uppercase;
    align-items: center;
  }
</style>
