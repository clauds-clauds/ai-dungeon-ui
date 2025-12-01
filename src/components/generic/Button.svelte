<script lang="ts">
  interface Button {
    icon?: string;
    label?: string;
    onclick?: () => void;
    dangerous?: boolean;
  }

  let { icon, label, dangerous, onclick }: Button = $props();
</script>

<button class="dui-button" class:dangerous {onclick}>
  {#if icon}
    <span class="dui-icon">{icon}</span>
  {/if}
  {label}
</button>

<style lang="scss">
  .dui-button {
    display: flex;
    flex: 1;
    padding: var(--dui-padding-large) var(--dui-padding-huge);
    max-width: fit-content;
    justify-content: center;
    align-items: center;
    gap: var(--dui-gap-tiny);
    transition: all 150ms ease-in-out;
    font-weight: 800;
    font-family: var(--dui-font-gameplay);
    cursor: pointer;

    color: var(--dui-color-core-alpha);
    background-color: var(--dui-color-theme);

    &.dangerous {
      color: var(--dui-color-core-echo);
      background-color: var(--dui-color-theme-danger);
    }

    &:hover {
      filter: brightness(125%);
    }

    .dui-icon {
      font-size: 28px;
    }

    border-radius: var(--dui-border-radius-large);
  }
</style>
