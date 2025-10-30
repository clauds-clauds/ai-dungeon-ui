// Svelte Imports HERE!
import { mount, type Component } from "svelte";
import { get } from "svelte/store";

// DungeonUI Imports HERE!
import { travellerState, uiState } from "./state.svelte";
import { settings } from "./storage";
import { Config } from "./config";

// Component Imports HERE!
import TextEffects from "@/ui/TextEffects.svelte";
import { Dev } from "./dev";

/**
 * `DOM` is a class which is used for DOM-manipulation stuff.
 */
export class DOM {
  private static _traveller: HTMLElement | null = null;
  private static _travellerText: string = "";

  /**
   * Creates a div and appends it to the body.
   * @param id The ID of the created div.
   * @returns The created div.
   */
  private static createDiv(id: string): HTMLElement {
    const div = document.createElement("div");
    div.id = id;
    return div;
  }

  /**
   * Quickly mounts a component onto something.
   * @param component The component to mount.
   * @param anchorId The ID to assign to the created anchor.
   */
  static mountQuick(component: Component, anchorId: string): void {
    const anchor = this.createDiv(anchorId);
    document.body.appendChild(anchor);
    mount(component, { target: anchor });
  }

  /**
   * Injects the icons font, which is already mentioned here below. Like, in the name of the function.
   */
  static injectIcons() {
    // First find the font.
    const fontPath = chrome.runtime.getURL("fonts/material_symbols_rounded.ttf");

    // Create a new style element for it.
    const style = document.createElement("style");

    // Assign the content.
    style.textContent = `
      @font-face {
        font-family: 'Material Symbols Rounded';
        font-style: normal;
        font-weight: 100 700;
        src: url('${fontPath}') format('truetype');
      }
    `;

    // Append it to the head of the document.
    document.head.appendChild(style);
  }

  static injectButton() {
    // Check if the button already exists, if so then return.
    if (document.getElementById(Config.ID_BUTTON)) return;

    // Get the exit button.
    const exitButton = document.querySelector(Config.SELECTOR_EXIT_BUTTON) as HTMLElement;

    // Only do the rest of the stuff if the exit button was found.
    if (exitButton) {
      // Clone the exit button.
      const customButton = exitButton.cloneNode(true) as HTMLElement;

      // Correct the identifier.
      customButton.id = Config.ID_BUTTON;

      // Correct the contents.
      (customButton.querySelector("p") as HTMLElement).innerText = "w_sword";
      (customButton.querySelector("span") as HTMLElement).innerText = "Dungeon UI";

      // Add a click listener.
      customButton.addEventListener("click", (e) => {
        uiState.visible = true;
      });

      // Insert the custom button before the exit button.
      exitButton.parentElement?.insertBefore(customButton, exitButton);
    }
  }

  private static attachTextEffects(container: HTMLElement, type: string) {
    // Set some attribute on it.
    container.setAttribute(Config.ATTRIBUTE_MANIPULATED, "true");

    // Copy the text.
    const cachedText = container.textContent;

    // Clear the text content.
    container.textContent = "";

    // Print some stuff.
    Dev.say(`Attaching text effects to: ${type}`);

    // Mount the text effects on it.
    mount(TextEffects, {
      target: container,
      props: { text: cachedText, type: type },
    });

    if (type === "RESPONSE") {
      if (!this._traveller) this._traveller = document.getElementById(Config.ID_TRAVEL_ANCHOR);

      if (this._traveller) {
        const parent = container.parentElement;
        const gameplayContainer = parent?.parentElement;

        if (gameplayContainer && parent) {
          gameplayContainer.insertBefore(this._traveller, parent);
        }
        travellerState.text = this._travellerText;
      }
    } else if (type === "ACTION") {
      const text = cachedText || "";
      const travelRegex = /\b(go|travel)\b/i;
      if (travelRegex.test(text)) {
        this._travellerText = text;
      }
    }
  }

  static manipulateContainers(containers: HTMLElement[]) {
    // Go through all the received containers.
    for (const container of containers) {
      // Skip pre-manipulated containers.
      if (container.hasAttribute(Config.ATTRIBUTE_MANIPULATED)) continue;

      // Check if the thing is an action container.
      const actionContainer = container.querySelector(Config.SELECTOR_ACTION_CONTAINER) as HTMLElement;

      // If it is an action container then do stuff for that.
      if (actionContainer) {
        this.attachTextEffects(actionContainer, "ACTION");
      } else {
        // Check if the thing is a response container.
        const label = container.getAttribute("aria-label");

        if (label && label.startsWith("Last action:")) {
          // Otherwise just attach the thing to the container itself.
          this.attachTextEffects(container, "RESPONSE");
        } else {
          // Otherwise just attach the thing to the container itself.
          this.attachTextEffects(container, "STORY");
        }
      }
    }
  }
}
