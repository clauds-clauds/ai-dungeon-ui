<script lang="ts">
  import type { GenericButton } from "@/shared";

  interface Button {
    data: GenericButton;
  }

  let { data }: Button = $props();
</script>

<button class="dui-button" class:danger={data.danger} onclick={data.onclick}>
  <span class="dui-icon">{data.icon}</span>
  {data.label}
</button>

<style lang="scss">
  .dui-button {
    display: flex;
    gap: var(--dui-size-alpha);
    background-color: var(--dui-color-orange);
    color: var(--dui-color-alpha);
    border-radius: var(--dui-size-bravo);
    padding: var(--dui-size-charlie) var(--dui-size-foxtrot);
    margin-bottom: var(--dui-size-charlie);
    text-transform: uppercase;
    align-items: center;
    justify-content: center;

    &.danger {
      background-color: var(--dui-color-red);
    }
  }
</style>
