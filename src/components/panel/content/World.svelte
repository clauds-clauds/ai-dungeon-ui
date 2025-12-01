<script lang="ts">
  import Browser from "@/components/generic/Browser.svelte";
  import Button from "@/components/generic/Button.svelte";
  import Foldout from "@/components/generic/Foldout.svelte";
  import Group from "@/components/generic/Group.svelte";
  import Row from "@/components/generic/Row.svelte";
  import { Utils } from "@/shared";
  import { adventures, DUIStorage } from "@/shared/storage";
</script>

<Foldout icon="data_array" label="Data" description="Click here to import or export data!">
  <Row>
    <Group label="Import">
      <Button data={{ icon: "delivery_truck_speed" }} />
    </Group>

    <Group label="Export">
      <Button data={{ icon: "rocket_launch", danger: true }} />
    </Group>
  </Row>
</Foldout>

{#if $adventures[Utils.getAdventureId()] && Object.keys(DUIStorage.getAdventureData()?.storyCards ?? {}).length > 0}
  <Foldout icon="web_stories" label="Story Cards" description="Click here to view all the current cards!" expanded={true}>
    <Browser />
  </Foldout>
{/if}
