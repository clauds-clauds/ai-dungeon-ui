import { mount, type Component } from "svelte";
import { Config, Logger, Utils } from ".";
import PrettyResponse from "@/components/pretty/PrettyResponse.svelte";
import { interfaceState } from "./state.svelte";
import { readSettings, settings } from "./storage";

export class DUIDom {
  static connectObservers(
    outputObserver: MutationObserver,
    domObserver: MutationObserver,
    skipDomObserver: boolean = true
  ): void {
    if (!skipDomObserver) domObserver.observe(document, { childList: true, subtree: true });
  }

  static injectButton() {
    if (document.getElementById(Config.ID_BUTTON)) return; // Return if the custom button has already been added.
    const exitGameButton = document.querySelector(Config.SELECTOR_EXIT_GAME_BUTTON) as HTMLElement; // Grab the pre-existing button.

    // Clone the stuff.
    if (exitGameButton) {
      const prettySettingsButton = exitGameButton.cloneNode(true) as HTMLElement;
      prettySettingsButton.id = Config.ID_BUTTON;

      // Style it a bit.
      (prettySettingsButton.querySelector("p") as HTMLElement).innerText = "w_sword";
      (prettySettingsButton.querySelector("span") as HTMLElement).innerText = "Dev Menu";

      // Add a listener.
      prettySettingsButton.addEventListener("click", (e) => {
        interfaceState.showDevMenu = true;
      });

      // Add it the the UI.
      exitGameButton.parentElement?.insertBefore(prettySettingsButton, exitGameButton);
    }
  }

  static injectFonts() {
    // Do the basics...
    const path = chrome.runtime.getURL("fonts/material_symbols_rounded.ttf");
    const style = document.createElement("style");

    // Assign the content:
    style.textContent = `
     @font-face {
        font-family: 'Material Symbols';
        src: url('${path}') format('truetype');
      }
    `;

    // Append it.
    document.head.appendChild(style);
  }

  static createDiv(id: string): HTMLElement {
    // Create a div, much documentation.
    const div = document.createElement("div");
    div.id = id;
    return div;
  }

  static mountSafe(
    id: string,
    component: any,
    target: HTMLElement = document.body,
    anchor: HTMLElement | null = null,
    props: Record<string, any> = {}
  ) {
    // Check if the thing is already mounted. If so, then return.
    if (document.getElementById(id)) return;

    // Otherwise mount it with or without anchor.
    if (!anchor) mount(component, { target, props });
    else mount(component, { target, anchor, props });
  }

  static mountQuick(component: Component, anchorId: string) {
    // Return if the anchor is already there.
    if (document.getElementById(anchorId)) return;

    // Create the anchor and do stuff.
    const anchor = this.createDiv(Config.ID_ANCHOR);
    document.body.appendChild(anchor);
    mount(component, { target: anchor });
  }

  static mountResponse(response: HTMLElement, isAction: boolean = false, isLast: boolean = false) {
    // Set the attribute.
    response.setAttribute(Config.ATTRIBUTE_TRANSFORMED, "true");

    // Copy the text and then clear it.
    const text = response.textContent;
    response.textContent = "";

    // Log some stuff.
    Logger.info("Mounting pretty response...");
    Logger.info("Is this an action? " + isAction);
    Logger.info("Is this the latest response? " + isLast);

    // Mount it.
    mount(PrettyResponse, { target: response, props: { text, isAction, isLast } });

    // Log some more...
    Logger.success("Mounted a pretty response!");
  }

  static transformResponses(responses: HTMLElement[]) {
    // Go through all the resposnes.
    for (const response of responses) {
      // Skip already transformed thingies.
      if (response.hasAttribute(Config.ATTRIBUTE_TRANSFORMED)) continue;

      // Check if the response is an action response.
      const actionResponse = response.querySelector(readSettings().dangerIdResponseAction);

      // If it is, then attach it for that.
      if (actionResponse) {
        this.mountResponse(actionResponse as HTMLElement, true);
      } else {
        // Try to grab a label from it.
        const label = response.getAttribute("aria-label");

        // If so, then we can check for last and so forth.
        if (label) {
          this.mountResponse(response, false, label.startsWith("Last action:"));
        }
      }
    }
  }

  // Story card stuff HERE!
  static findCard(): HTMLElement | null {
    const title = document.querySelector(readSettings().dangerSelectorCardName);
    return title ? Utils.travelUp(title as HTMLElement, 3) : null;
  }

  static readCard(card: HTMLElement): {
    type: string;
    name: string;
    triggers: string;
  } {
    const type = card.querySelector(readSettings().dangerSelectorCardType)?.firstChild?.textContent;
    const name = card.querySelector(readSettings().dangerSelectorCardName)?.getAttribute("value");
    const triggers = card.querySelector(readSettings().dangerSelectorCardTriggers)?.getAttribute("value");

    return {
      type: type ? type : "N/A",
      name: name ? name : "N/A",
      triggers: triggers ? triggers : "N/A",
    };
  }
}
