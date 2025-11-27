<script lang="ts">
  import type { GenericComponent } from "@/shared/types";

  interface Switch extends GenericComponent {
    checked?: boolean;
  }
  let { checked = $bindable(false) }: Switch = $props();
</script>

<label class="dui-switch">
  <input type="checkbox" bind:checked />
  <span class="dui-switch-slider"></span>
</label>

<style lang="scss">
  .dui-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    justify-self: flex-end;
  }

  .dui-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .dui-switch-slider {
    position: absolute;
    inset: 0;
    background-color: #333;
    border-radius: var(--dui-border-radius-large);
    transition: background var(--dui-animation-duration-medium);
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;

      // TODO: Fix these things later.
      left: 1px;
      top: 1px;
      width: 22px;
      height: 22px;
      aspect-ratio: var(--dui-aspect-ratio-square);
      background: #fff;
      border-radius: var(--dui-border-radius-full);
      transition: transform var(--dui-animation-duration-medium);
    }
  }

  .dui-switch input:checked + .dui-switch-slider {
    background-color: var(--dui-color-orange);
  }

  .dui-switch input:checked + .dui-switch-slider::before {
    transform: translateX(20px);
  }
</style>
