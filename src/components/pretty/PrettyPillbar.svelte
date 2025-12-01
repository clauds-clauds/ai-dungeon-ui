<script lang="ts">
  import { extensionState } from "@/shared/state.svelte";
  import { tabs } from "@/shared/templates";
  import Pill from "../generic/Pill.svelte";

  let pillbar: HTMLElement | null = $state(null);
  let drag = $state(false);
  let move = $state(false);
  let start: number = 0,
    touchStart: number = 0;
  let scroll: number = 0,
    touchScroll: number = 0;
  let pills = $derived(tabs[extensionState.currentTab].pills);

  $effect(() => {
    let selected: boolean = false;

    pills?.forEach((pill) => {
      if (extensionState.currentSubtab === pill.label) selected = true;
    });

    if (!selected && pills && pills.length > 0) {
      extensionState.currentSubtab = pills[0].label || "";
    }
  });
</script>

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

<div
  class="dui-pillbar"
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

<style lang="scss">
  .dui-pillbar {
    display: flex;
    flex-direction: row;
    gap: var(--dui-gap-small);
    overflow-x: auto;
    cursor: grab;
    scrollbar-width: none;
    &.drag {
      cursor: grabbing;
    }
  }
</style>
