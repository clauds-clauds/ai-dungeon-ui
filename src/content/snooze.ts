import { DOM } from "@/shared/dom";
import { Log } from "@/shared/log";
import { Storage } from "@/shared/storage";
import { Utils } from "@/shared/utils";
import { Events } from "./events";

import "@/theme.css";

class Snooze {
  static wake() {
    // Log some debugging information.
    Log.info("DungeonUI is starting!");
    Log.info("Adventure ID: " + Utils.getAdventureId());
    Log.info("Environment: " + Utils.getEnvironment());

    // Inject the icons font.
    DOM.addIcons();

    // Setup storage.
    Storage.load();
    Storage.listen();

    // Add the dev panel to the DOM.
    DOM.addDevPanel();

    // Handle event stuff.
    Events.onWake();
  }
}

Snooze.wake();
