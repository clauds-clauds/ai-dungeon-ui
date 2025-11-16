import { mount } from "svelte";
import { Config, Logger, Utils } from ".";
import PrettyResponse from "@/components/pretty/PrettyResponse.svelte";

export class DUIDom {
  static connectObservers(
    outputObserver: MutationObserver,
    domObserver: MutationObserver,
    skipDomObserver: boolean = true
  ): void {
    if (!skipDomObserver) domObserver.observe(document, { childList: true, subtree: true });
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

  // Response stuff HERE!

  static mountResponse(response: HTMLElement, isAction: boolean = false, isLast: boolean = false) {
    // Set the attribute.
    response.setAttribute(Config.ATTRIBUTE_TRANSFORMED, "true");

    // Copy the text and then clear it.
    const text = response.textContent;
    response.textContent = "";

    // Log some stuff.
    Logger.info("Mounting pretty response...");
    Logger.info("Action: " + isAction);
    Logger.info("Last: " + isLast);

    // Mount it.
    mount(PrettyResponse, { target: response, props: { text, isAction, isLast } });
  }

  static transformResponses(responses: HTMLElement[]) {
    // Go through all the resposnes.
    for (const response of responses) {
      // Skip already transformed thingies.
      if (response.hasAttribute(Config.ATTRIBUTE_TRANSFORMED)) continue;

      // Check if the response is an action response.
      const actionResponse = response.querySelector(Config.ID_RESPONSE_ACTION);

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
    const title = document.querySelector(Config.SELECTOR_STORY_CARD_NAME);
    return title ? Utils.travelUp(title as HTMLElement, 3) : null;
  }

  static readCard(card: HTMLElement): {
    type: string;
    name: string;
    triggers: string;
  } {
    const type = card.querySelector(Config.SELECTOR_STORY_CARD_TYPE)?.firstChild?.textContent;
    const name = card.querySelector(Config.SELECTOR_STORY_CARD_NAME)?.getAttribute("value");
    const triggers = card.querySelector(Config.SELECTOR_STORY_CARD_TRIGGERS)?.getAttribute("value");

    return {
      type: type ? type : "N/A",
      name: name ? name : "N/A",
      triggers: triggers ? triggers : "N/A",
    };
  }
}
