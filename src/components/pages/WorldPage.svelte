<script lang="ts">
  import { extensionState } from "@/shared/state.svelte";
  import Button from "../generic/Button.svelte";
  import Foldout from "../sorting/Foldout.svelte";
  import Group from "../sorting/Group.svelte";
  import Note from "../sorting/Note.svelte";
  import Browser from "../generic/Browser.svelte";
  import { Utils } from "@/shared/utils";
  import { Storage } from "@/shared/storage";
</script>

{#if extensionState.currentSubtab === "STORY CARDS"}
  <Browser />
{/if}

{#if extensionState.currentSubtab === "STORAGE"}
  <Foldout icon="download_2" label="Import" description="Import some data from extension files!">
    <Group label="Import & Merge">
      <Note text="Import and merge data from another file, will not delete stuff! This is the safest import option!">
        <Button
          icon="delivery_truck_speed"
          onclick={async () => {
            const adventure = await Utils.importAdventure();
            if (adventure) Storage.merge(adventure);
          }}
        />
      </Note>
    </Group>

    <Group label="Import & Replace">
      <Note
        text="Import and replace the current data with stuff from another file! This deletes all your current data for this adventure!"
      >
        <Button
          icon="auto_towing"
          dangerous={true}
          onclick={async () => {
            const adventure = await Storage.importAdventure();
            if (adventure) Storage.replace(adventure);
          }}
        />
      </Note>
    </Group>
  </Foldout>

  <Foldout icon="upload_2" label="Export" description="Export your data so you can use it elsewhere!">
    <Group label="Export">
      <Note
        text="Export your current data so you can import it into other adventures! Also, you can use this to make back-ups!"
      >
        <Button icon="rocket_launch" onclick={Storage.exportAdventure} />
      </Note>
    </Group>
  </Foldout>
{/if}
