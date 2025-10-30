<!-- Pillbar Scripting HERE! -->
<script lang="ts">
  // DungeonUI Imports HERE!
  import { tabTemplates } from "@/lib/templates";
  import { uiState } from "@/lib/state.svelte";
  import { Dev } from "@/lib/dev";

  // Component Imports HERE!
  import Pill from "./components/Pill.svelte";

  // The pillbar which the dragging stuff will be mounted on.
  let pillbar: HTMLElement | null = $state(null);

  // Set some variables which are used for dragging the whole bar.
  let drag = $state(false);
  let move = $state(false);
  let start: number,
    touchStart: number = 0;
  let scroll: number,
    touchScroll: number = 0;

  // Get the current pills based on the UI state.
  let pills = $derived(tabTemplates[uiState.tab].pills);

  // This goes over all the pills and corrects the selected pill when you change tabs.
  $effect(() => {
    // Used to check whether there is a selected pill.
    let selected: boolean = false;

    // Go over all the current pills.
    pills?.forEach((pill) => {
      // If the current selected pill matches the one in the state, then there is one selected.
      if (uiState.subtab === pill.label) selected = true;
    });

    // If no pill was selected, and there are pills, then select the first valid one.
    if (!selected && pills && pills.length > 0) {
      uiState.subtab = pills[0].label || ""; // Use the fallback.
      Dev.say(`Subtab has changed to fallback: ${uiState.subtab}`);
    }
  });
</script>

<!-- Window HERE! -->
<svelte:window
  onmousemove={(ev: MouseEvent) => {
    if (!drag) return;
    move = true;
    const x = ev.pageX;
    const walk = x - start;
    pillbar!.scrollLeft = scroll - walk;
  }}
  onmouseup={() => {
    drag = false;
    move = false;
  }}
  ontouchmove={(ev: TouchEvent) => {
    if (!drag) return;
    move = true;
    const x = ev.touches[0].pageX;
    const walk = x - touchStart;
    pillbar!.scrollLeft = touchScroll - walk;
  }}
  ontouchend={() => {
    drag = false;
    move = false;
  }}
/>

<!-- Pillbar Layout HERE! -->
<div
  class="dungeon-ui-pillbar"
  role="menubar"
  tabindex={0}
  onmousedown={(ev: MouseEvent) => {
    drag = true;
    start = ev.pageX;
    scroll = pillbar!.scrollLeft;
  }}
  ontouchstart={(ev: TouchEvent) => {
    drag = true;
    touchStart = ev.touches[0].pageX;
    touchScroll = pillbar!.scrollLeft;
  }}
  bind:this={pillbar}
  class:drag
>
  {#each pills as pill}
    <Pill icon={pill.icon} label={pill.label} {move} />
  {/each}
</div>

<!-- Pillbar Styling HERE! -->
<style lang="scss">
  .dungeon-ui-pillbar {
    display: flex;
    flex-direction: row;
    gap: var(--d-ui-gap-small);
    overflow-x: auto;
    cursor: grab;

    // Maybe enable this later? I do not like how it looks, so that is why it is off.
    scrollbar-width: none;

    &.drag {
      cursor: grabbing;
    }
  }
</style>
