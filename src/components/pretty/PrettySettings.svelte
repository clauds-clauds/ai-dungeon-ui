<script lang="ts">
  import { interfaceState } from "@/shared/state.svelte";
  import Switch from "../generic/Switch.svelte";
  import Foldout from "../generic/Foldout.svelte";
  import Field from "../generic/Field.svelte";
  import Slider from "../generic/Slider.svelte";
</script>

{#if interfaceState.showSettings}
  <div class="dui-backdrop">
    <div class="dui-settings">
      <div class="dui-settings-title">Pretty Settings</div>

      <Foldout icon="w_image" label="Visuals" description="Customize visual settings here!">
        <Field label="Icon Size (px)">
          <Slider />
        </Field>

        <Field label="Icon Roundness (%)">
          <Slider />
        </Field>

        <Field label="Border Size (%)">
          <Slider />
        </Field>

        <Field label="Border Opacity (%)">
          <Slider />
        </Field>
      </Foldout>

      <Foldout icon="w_user" label="Tooltip" description="Customize tooltip settings here!">
        <Field label="Icon Size (px)">
          <Slider />
        </Field>

        <Field label="Icon Roundness (%)">
          <Slider />
        </Field>

        <Field label="Border Size (%)">
          <Slider />
        </Field>

        <Field label="Border Opacity (%)">
          <Slider />
        </Field>
      </Foldout>
    </div>
  </div>
{/if}

<style lang="scss">
  .dui-backdrop {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    inset: 0;
    z-index: 200;
  }

  .dui-settings {
    display: flex;
    position: fixed;
    width: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    overflow: hidden;
    gap: var(--dui-gap-medium);
    font-family: var(--dui-font-family-interface);
    font-size: var(--dui-font-size-medium);
    border: 1px solid var(--dui-color-basic-charlie);
    border-radius: var(--dui-border-radius-giga);
    background-color: var(--dui-color-basic-alpha);
    padding: var(--dui-padding-large);
    z-index: 1;
  }

  .dui-settings-title {
    border-bottom: 1px solid var(--dui-color-basic-charlie);
    font-family: var(--dui-font-family-title);
    font-size: 18px;
    align-self: center;
  }
</style>
