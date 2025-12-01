<!-- Select HERE! -->
<script lang="ts">
  interface Select {
    value?: string;
    options: string[];
  }

  let { value = $bindable(), options = ["A", "B", "C"] }: Select = $props();
</script>

<select class="dui-select dui-attention" bind:value>
  {#each options as option}
    <option value={option}>{option}</option>
  {/each}
</select>

<style lang="scss">
  .dui-select {
    background-color: var(--dui-color-core-charlie);
    border-radius: var(--dui-border-radius-medium);
    border: none;
    padding: 10px 12px;
    color: var(--dui-color-core-echo);
    height: var(--dui-size-large);
    width: 100%;
  }

  select {
    appearance: none;
  }
</style>
