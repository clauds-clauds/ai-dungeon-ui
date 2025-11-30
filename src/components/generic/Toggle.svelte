<!-- Toggle HERE! -->
<script lang="ts">
  interface Toggle {
    checked?: boolean;
  }

  let { checked = $bindable() }: Toggle = $props();
</script>

<label class="dui-toggle">
  <input type="checkbox" bind:checked />
  <span class="dui-toggle-track"></span>
</label>

<style lang="scss">
  .dui-toggle {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
  }

  .dui-toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .dui-toggle-track {
    position: absolute;
    inset: 0;
    background-color: var(--dui-color-echo);
    border-radius: var(--dui-size-charlie);

    &::before {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      aspect-ratio: var(--dui-aspect-square);
      background: #fff;
      border-radius: 50%;
      transition: all var(--dui-animation-duration-delta);
    }
  }

  .dui-toggle input:checked + .dui-toggle-track {
    background-color: var(--dui-color-orange);
  }

  .dui-toggle input:checked + .dui-toggle-track::before {
    transform: translateX(24px);
  }
</style>
