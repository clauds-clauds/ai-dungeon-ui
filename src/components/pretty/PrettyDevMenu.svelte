<script lang="ts">
  import { cards, DUIStorage, settings } from "@/shared/storage";
  import Foldout from "../generic/Foldout.svelte";
  import Field from "../generic/Field.svelte";
  import Slider from "../generic/Slider.svelte";
  import Text from "../generic/Text.svelte";
  import Row from "../generic/Row.svelte";
  import { Utils } from "@/shared";
  import Switch from "../generic/Switch.svelte";
  import { interfaceState } from "@/shared/state.svelte";
  import { fade, fly } from "svelte/transition";
  import PrettyPreview from "./PrettyPreview.svelte";
  import Color from "../generic/Color.svelte";
</script>

{#if interfaceState.showDevMenu}
  <div class="dui-backdrop" transition:fade={{ duration: 150 }}>
    <!-- These `stopPropagation` thingies are needed, something is EATING UP MY MOUSE AND TOUCH EVENTS AND IT IS MAKING ME ANGRY!!!-->
    <div
      class="dui-dev-menu"
      transition:fly={{ y: 64, duration: 200 }}
      onwheel={(event: WheelEvent) => event.stopPropagation()}
      ontouchstart={(event: TouchEvent) => event.stopPropagation()}
      ontouchmove={(event: TouchEvent) => event.stopPropagation()}
    >
      <div class="dui-dev-title-area">
        <div class="dui-dev-title">
          <span class="dui-icon">data_object</span>
          Dev Menu
        </div>

        <button
          class="dui-dev-exit-button"
          onclick={() => {
            interfaceState.showDevMenu = false;
          }}>Finish</button
        >
      </div>

      <div class="dui-dev-content">
        <Field label="Features">
          <Foldout icon="check_box" label="Toggles">
            <!-- Detailer Feature HERE! -->
            <Field label="Enable Detailer">
              <Row>
                <Text value="Toggle the detailer feature, which shows graphics above actions." readonly={true} area={true} />
                <Switch bind:checked={$settings.detailerEnabled} />
              </Row>
            </Field>

            <!-- Formatter Feature HERE! -->
            <Field label="Enable Formatter">
              <Row>
                <Text value="Toggle the pretty formatting feature, which styles recent outputs." readonly={true} area={true} />
                <Switch bind:checked={$settings.formatterEnabled} />
              </Row>
            </Field>

            <!-- Integration Feature HERE! 
            <Field label="Enable Integrated Editor">
              <Row>
                <Text
                  value="Toggle the integrated editor feature, which integrates editing into the vanilla UI."
                  readonly={true}
                  area={true}
                />
                <Switch bind:checked={$settings.integrationEnabled} />
              </Row>
            </Field> -->

            <!-- Danger Toggle HERE! -->
            <Field label="Show Dangerous Settings">
              <Row>
                <Text
                  value="Show some dangerous stuff, they might break the extension if you toy around with 'em."
                  readonly={true}
                  area={true}
                />
                <Switch bind:checked={$settings.dangerEnabled} />
              </Row>
            </Field>

            <Field label="Show Console Logs">
              <Row>
                <Text value="Print stuff to the console." readonly={true} area={true} />
                <Switch bind:checked={$settings.logsEnabled} />
              </Row>
            </Field>
          </Foldout>
        </Field>

        {#if !$settings.dangerEnabled}
          <Field label="Icons & Graphics">
            <Foldout icon="owl" label="Icons">
              <Field label="Icon Size (pixels)">
                <Slider min={8} max={40} bind:value={$settings.iconSize} />
              </Field>

              <Field label="Icon Roundness (%)">
                <Slider bind:value={$settings.iconRoundness} />
              </Field>

              <Field label="Border Width (pixels)">
                <Slider min={0} max={16} bind:value={$settings.borderWidth} />
              </Field>

              <Field label="Border Opacity (%)">
                <Slider bind:value={$settings.borderOpacity} />
              </Field>
            </Foldout>

            <Foldout icon="tooltip" label="Tooltip">
              <Field label="Tooltip Max Width">
                <Slider min={0} max={1024} step={32} bind:value={$settings.tooltipMaxWidth} />
              </Field>

              <Field label="Tooltip Max Height">
                <Slider min={0} max={1024} step={32} bind:value={$settings.tooltipMaxHeight} />
              </Field>
            </Foldout>

            <Foldout icon="format_paint" label="Colors">
              <Field label="Color (Shared)">
                <Row>
                  <Text value="Customize the shared text color." readonly={true} area={true} />
                  <Color bind:value={$settings.globalColor} />
                </Row>
              </Field>

              <Field label="Border Color (Shared)">
                <Row>
                  <Text value="Customize the shared border color." readonly={true} area={true} />
                  <Color bind:value={$settings.borderColor} />
                </Row>
              </Field>
            </Foldout>
          </Field>

          <Field label="Detailer">
            <Text placeholder="Enter comma separated triggers here..." bind:value={$settings.detailerTriggers} />
            <Foldout icon="hiking" label="Detailer">
              <Field label="Detailer Max Width">
                <Slider min={0} max={1024} step={32} bind:value={$settings.detailerMaxWidth} />
              </Field>

              <Field label="Detailer Max Height">
                <Slider min={0} max={1024} step={32} bind:value={$settings.detailerMaxHeight} />
              </Field>
            </Foldout>
          </Field>

          <Field label="Cards">
            <Foldout icon="save" label="Storage">
              <Row minWidth={256}>
                {#each Object.values($cards) as card}
                  <PrettyPreview prettyCard={card} />
                {/each}
              </Row>
            </Foldout>
          </Field>

          <Row>
            <Field label="Adventure ID">
              <Text value={Utils.getAdventureId()} readonly={true} />
            </Field>

            <Field label="Environment">
              <Text value={Utils.getEnvironment()} readonly={true} />
            </Field>
          </Row>
        {:else}
          <!-- These things are dangerous. If you touch em' and they blow up, then the extension is sad. :( -->
          <Field label="SELECTOR::CARD::TYPE">
            <Text bind:value={$settings.dangerSelectorCardType} />
          </Field>

          <Field label="SELECTOR::CARD::NAME">
            <Text bind:value={$settings.dangerSelectorCardName} />
          </Field>

          <Field label="SELECTOR::CARD::TRIGGERS">
            <Text bind:value={$settings.dangerSelectorCardTriggers} />
          </Field>

          <Field label="SELECTOR::RESPONSE">
            <Text bind:value={$settings.dangerSelectorResponse} />
          </Field>

          <Field label="ID::OUTPUT">
            <Text bind:value={$settings.dangerIdOutput} />
          </Field>

          <Field label="ID::RESPONSE">
            <Text bind:value={$settings.dangerIdResponse} />
          </Field>

          <Field label="ID::RESPONSE::ACTION">
            <Text bind:value={$settings.dangerIdResponseAction} />
          </Field>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .dui-backdrop {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    backdrop-filter: blur(4px);
  }

  .dui-dev-menu {
    display: flex;
    position: fixed;
    width: 90%;
    max-width: 768px;
    height: 95vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    overflow-y: auto;
    background-color: var(--dui-color-basic-alpha);
    border: 1px solid var(--dui-color-basic-charlie);
    font-family: var(--dui-font-family-interface);
    border-radius: var(--dui-border-radius-giga);
    z-index: 1;
  }

  .dui-dev-title-area {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid var(--dui-color-basic-charlie);
    padding: var(--dui-padding-large);
  }

  .dui-dev-title {
    display: flex;
    gap: var(--dui-gap-small);
    align-items: center;
    font-size: 18px;
    user-select: none;
  }

  .dui-dev-exit-button {
    display: flex;
    text-transform: uppercase;
    color: black;
    border-radius: var(--dui-border-radius-small);
    background-color: var(--dui-color-orange);
    padding: 12px var(--dui-padding-medium);
    cursor: pointer;
  }

  .dui-dev-content {
    display: flex;
    padding: var(--dui-padding-medium);
    gap: var(--dui-gap-medium);
    flex-direction: column;
  }
</style>
