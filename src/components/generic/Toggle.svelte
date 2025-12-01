<!-- Toggle HERE! -->
<script lang="ts">
  interface Toggle {
    checked?: boolean;
  }

  let { checked = $bindable() }: Toggle = $props();
</script>

<label class="dui-toggle">
  <input type="checkbox" bind:checked />
  <span class="dui-track"></span>
</label>

<style lang="scss">
  .dui-toggle {
    position: relative;
    display: inline-block;
    width: 64px;
    height: 32px;
  }

  .dui-toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .dui-track {
    position: absolute;
    inset: 0;
    background-color: var(--dui-color-core-charlie);
    border-radius: 16px;

    &::before {
      content: "";
      position: absolute;
      width: 32px;
      height: 32px;
      aspect-ratio: var(--dui-aspect-ratio-square);
      background: #fff;
      border-radius: 50%;
      transition: all var(--dui-animation-duration-medium);
    }
  }

  .dui-toggle input:checked + .dui-track {
    background-color: var(--dui-color-theme);
  }

  .dui-toggle input:checked + .dui-track::before {
    transform: translateX(32px);
  }
</style>
