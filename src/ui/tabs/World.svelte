<script>
  import { uiState } from "@/lib/state.svelte";
  import Browser from "../components/Browser.svelte";
</script>

<!-- Entities HERE! -->
{#if uiState.subtab === "ENTITIES"}
  <Browser />
{/if}
