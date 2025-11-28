import { Config, Log, mount, panelState, PrettyEditor, PrettyPanel, PrettyResponse, Storage, Utils } from "@/shared";
import { ResponseType } from "@/shared";

/* DOM HERE! */
export class DUIDom {
  /**
   * Creates and returns a new `div`.
   * @param id The id assigned to the created `div`.
   */
  static createDivWithId(id: string): HTMLDivElement {
    const div = document.createElement("div");
    div.id = id;
    return div;
  }

  /**
   *
   */
  static injectIcons(): void {
    // Set the path and create the style element which will hold the font face.
    const path = chrome.runtime.getURL("fonts/material_symbols_rounded.ttf");
    const style = document.createElement("style");

    // Assign the content.
    style.textContent = `
     @font-face {
        font-family: 'Material Symbols';
        src: url('${path}') format('truetype');
      }
    `;

    // Append the style.
    document.head.appendChild(style);
  }

  /**
   *
   */
  static injectButton(): void {
    if (document.getElementById(Config.ID_BUTTON)) return;
    const exitGameButton = document.querySelector(Config.SELECTOR_EXIT_GAME_BUTTON) as HTMLElement;
    if (exitGameButton) {
      const prettySettingsButton = exitGameButton.cloneNode(true) as HTMLElement;
      prettySettingsButton.id = Config.ID_BUTTON;
      (prettySettingsButton.querySelector("p") as HTMLElement).innerText = "w_wrench";
      (prettySettingsButton.querySelector("span") as HTMLElement).innerText = "Dev Panel";
      prettySettingsButton.addEventListener("click", (e) => {
        panelState.visible = true;
      });
      exitGameButton.parentElement?.insertBefore(prettySettingsButton, exitGameButton);
    }
  }

  /**
   *
   */
  static injectPanel(): void {
    // Create a new anchor.
    const anchor = this.createDivWithId(Config.ID_PANEL_ANCHOR);

    // Append it to the body.
    document.body.appendChild(anchor);

    // Then add the panel onto that.
    mount(PrettyPanel, { target: anchor });

    // Log something.
    Log.success("Mounted panel!");
  }

  static injectEditor(storyCard: HTMLElement) {
    if (document.getElementById(Config.ID_EDITOR) || !storyCard || (storyCard.lastChild as HTMLElement) == null) return;
    const anchor = storyCard.lastChild as HTMLElement;
    mount(PrettyEditor, { target: storyCard, anchor: anchor });
  }

  static injectResponse(response: HTMLElement, responseType: ResponseType) {
    response.setAttribute(Config.ATTRIBUTE_RESPONSE_PRETTIFIED, "true");
    const text = response.textContent;
    response.textContent = "";
    mount(PrettyResponse, { target: response, props: { text, responseType } });
  }

  /**
   *
   * @returns
   */
  static findCard(): HTMLElement | null {
    const title = document.querySelector(Storage.readSettings().storyCardNameSelector);
    return title ? Utils.travelUp(title as HTMLElement, 3) : null;
  }

  /**
   *
   * @param card
   * @returns
   */
  static readCard(card: HTMLElement): {
    type: string;
    name: string;
    triggers: string;
  } {
    const type = card.querySelector(Storage.readSettings().storyCardTypeSelector)?.firstChild?.textContent;
    const name = card.querySelector(Storage.readSettings().storyCardNameSelector)?.getAttribute("value");
    const triggers = card.querySelector(Storage.readSettings().storyCardTriggersSelector)?.getAttribute("value");

    return {
      type: type ? type : "",
      name: name ? name : "",
      triggers: triggers ? triggers : "",
    };
  }

  /**
   *
   * @param responses
   */
  static manipulateResponses(responses: HTMLElement[]) {
    for (const response of responses) {
      if (response.hasAttribute(Config.ATTRIBUTE_RESPONSE_PRETTIFIED)) continue;
      const actionResponse = response.querySelector(Storage.readSettings().responseActionId);
      if (actionResponse) {
        this.injectResponse(actionResponse as HTMLElement, ResponseType.Action);
      } else {
        const label = response.getAttribute("aria-label");
        this.injectResponse(response, label && label.startsWith("Last action:") ? ResponseType.Last : ResponseType.Other);
      }
    }
  }
}
