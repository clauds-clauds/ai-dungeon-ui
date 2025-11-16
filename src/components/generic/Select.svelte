<!-- Select scripting HERE! -->
<script lang="ts">
  import type { GenericComponent } from "@/shared/types";

  interface Select extends GenericComponent {
    value?: string;
    choices: string[];
  }

  let { value = $bindable(), choices = ["A", "B", "C"] }: Select = $props();
</script>

<!-- Select layout HERE! -->
<select class="dui-select dui-attention" bind:value>
  {#each choices as choice}
    <option value={choice}>{choice}</option>
  {/each}
</select>

<!-- Select styling HERE! -->
<style lang="scss">
  .dui-select {
    background-color: var(--dui-color-basic-bravo);
    border-radius: var(--dui-border-radius-medium);
    border: none;
    padding: 10px 12px;
    color: white;
    min-height: var(--dui-size-large);
    font-size: var(--dui-font-size-medium-large);
  }

  select {
    appearance: none;
  }
</style>
