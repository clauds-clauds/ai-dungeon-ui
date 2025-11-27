<!-- Field scripting HERE! -->
<script lang="ts">
  // Imports HERE!
  import type { GenericComponent } from "@/shared/types";

  // Interface HERE!
  interface Field extends GenericComponent {
    offset?: boolean;
    danger?: boolean;
  }

  // Props HERE!
  let { label, children }: Field = $props();
</script>

<!-- Field layout HERE! -->
<div class="dui-field">
  <span>{label}</span>
  {@render children?.()}
</div>

<!-- Field styling HERE! -->
<style lang="scss">
  .dui-field {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--dui-gap-small);
    color: var(--dui-color-basic-delta);
    font-family: var(--dui-font-family-interface);
    font-size: var(--dui-font-size-medium);

    span {
      cursor: default;
      padding-left: var(--dui-padding-medium);
      text-transform: uppercase;
      letter-spacing: 0.1px;
    }
  }
</style>
