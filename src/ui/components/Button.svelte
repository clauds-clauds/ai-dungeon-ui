<script lang="ts">
  import type { Generic } from "@/lib/types";

  interface Button extends Generic {
    dangerous?: boolean;
  }

  let { icon, label, dangerous, onclick }: Button = $props();
</script>

<button class="dungeon-ui-button" class:dangerous {onclick}>
  {#if icon}
    <span class="dungeon-ui-icon">{icon}</span>
  {/if}
  {label}
</button>

<style lang="scss">
  .dungeon-ui-button {
    display: flex;
    flex: 1;
    padding: var(--d-ui-padding-small) var(--d-ui-padding-medium);
    max-width: fit-content;
    justify-content: center;
    align-items: center;
    gap: var(--d-ui-gap-tiny);
    transition: all 150ms ease-in-out;
    font-weight: 800;
    font-family: var(--d-ui-font-gameplay);
    cursor: pointer;

    color: var(--d-ui-color-core-alpha);
    background-color: var(--d-ui-color-theme);

    &.dangerous {
      color: var(--d-ui-color-core-echo);
      background-color: var(--d-ui-color-core-charlie);
    }

    &:hover {
      filter: brightness(125%);
    }

    border-radius: var(--d-ui-border-radius-large);
  }
</style>
