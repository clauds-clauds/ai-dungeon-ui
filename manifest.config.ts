import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    16: "public/icons/batsy_16.png",
    32: "public/icons/batsy_32.png",
    64: "public/icons/batsy_64.png",
    96: "public/icons/batsy_96.png",
    128: "public/icons/batsy_128.png",
  },
  action: {
    default_icon: {
      64: "public/icons/batsy_64.png",
    },
  },
  content_scripts: [
    {
      js: ["src/content/snooze.ts"],
      matches: ["https://play.aidungeon.com/*", "https://beta.aidungeon.com/*"],
    },
  ],
  permissions: ["storage", "unlimitedStorage"],
  host_permissions: ["https://openrouter.ai/api/*"],
  web_accessible_resources: [
    {
      resources: ["fonts/material_symbols_rounded.ttf"],
      matches: ["https://play.aidungeon.com/*", "https://beta.aidungeon.com/*"],
    },
  ],
});
