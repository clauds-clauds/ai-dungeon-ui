<!-- Style Scripting HERE! -->
<script lang="ts">
  import { settings } from "@/lib/storage";

  // Probably need to do some safety stuff here.
  let customFont = $derived($settings.customFont);
  let themeColor = $derived($settings.colorTheme);
  let accentColor = $derived($settings.colorAccent);
</script>

<svelte:head>
  {@html ` 
  <style id="dungeon-ui-custom-style">
    :root {
      --d-ui-color-theme: ${themeColor};
      --d-ui-color-theme-danger: ${accentColor};
    }
    
    @font-face {
      font-family: 'Dungeon UI Custom Font';
      src: url(${customFont});
    }
  </style>
`}
</svelte:head>
