// DungeonUI Imports HERE!
import { Config } from "@/lib/config";
import { Utils } from "@/lib/utils";
import { Events } from "./events";
import { Dev } from "@/lib/dev";
import { DOM } from "@/lib/dom";

// Style Imports HERE!
import "@/ui/styles/theme.css";

// UI Imports HERE!
import Panel from "@/ui/Panel.svelte";
import Traveller from "@/ui/Traveller.svelte";

/**
 * `Snooze` is the class which does all the fun waking-up stuff.
 */
export class Snooze {
  static wake() {
    // Print something generic.
    Dev.say(`Current adventure ID is: ${Utils.getAdventureId()}`);

    // Inject the pretty icons.
    DOM.injectIcons();

    // Mount the panel onto the site.
    DOM.mountQuick(Panel, Config.ID_ANCHOR);

    // Mount the traveller onto the site.
    DOM.mountQuick(Traveller, Config.ID_TRAVEL_ANCHOR);

    // Ensure the events thingy is observing stuff.
    Events.observe();
  }
}

Snooze.wake();
