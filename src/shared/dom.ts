import { mount } from "svelte";
import { Config } from "./config";
import PrettyDevPanel from "@/components/pretty/PrettyDevPanel.svelte";
import { extensionState } from "./state.svelte";
import { Storage } from "./storage";
import { Utils } from "./utils";
import EditorPage from "@/components/pages/EditorPage.svelte";
import { ResponseType } from "./types";
import PrettyResponse from "@/components/pretty/PrettyResponse.svelte";
import { Log } from "./log";

export class DOM {
  static getElementUpX(element: HTMLElement, x: number) {
    let currentElement = element;
    for (let i = 0; i < x; i++) {
      if (!currentElement?.parentElement) return null;
      currentElement = currentElement.parentElement;
    }
    return currentElement;
  }

  static addDivWithId(id: string): HTMLDivElement {
    const div = document.createElement("div");
    div.id = id;
    return div;
  }

  static addIcons(): void {
    const path = chrome.runtime.getURL("fonts/material_symbols_rounded.ttf");
    const style = document.createElement("style");
    style.textContent = `
     @font-face {
        font-family: 'Material Symbols';
        src: url('${path}') format('truetype');
      }
    `;
    document.head.appendChild(style);
  }

  static addButton(): void {
    if (document.getElementById(Config.ID_BUTTON)) return;
    const exitGameButton = document.querySelector(Config.SELECTOR_EXIT_GAME_BUTTON) as HTMLElement;
    if (exitGameButton) {
      const prettySettingsButton = exitGameButton.cloneNode(true) as HTMLElement;
      prettySettingsButton.id = Config.ID_BUTTON;
      (prettySettingsButton.querySelector("p") as HTMLElement).innerText = "w_wrench";
      (prettySettingsButton.querySelector("span") as HTMLElement).innerText = "Dev Panel";
      prettySettingsButton.addEventListener("click", (e) => {
        extensionState.showDevPanel = true;
      });
      exitGameButton.parentElement?.insertBefore(prettySettingsButton, exitGameButton);
    }
  }

  static addDevPanel() {
    const anchor = this.addDivWithId(Config.ID_PANEL_ANCHOR);
    document.body.appendChild(anchor);
    mount(PrettyDevPanel, { target: anchor });
  }

  static addEditor(storyCard: HTMLElement) {
    if (document.getElementById(Config.ID_EDITOR) || !storyCard || (storyCard.lastChild as HTMLElement) == null) return;
    const anchor = storyCard.lastChild as HTMLElement;
    mount(EditorPage, { target: storyCard, anchor: anchor });
  }

  static addResponse(response: HTMLElement, responseType: ResponseType) {
    response.setAttribute(Config.ATTRIBUTE_RESPONSE_PRETTIFIED, "true");
    const text = response.textContent;
    response.textContent = "";

    let travellerName = "";
    if (responseType === ResponseType.Action) travellerName = Utils.getTravellerName(text);
    if (!Utils.isStringInvalid(travellerName)) {
      extensionState.travellerStoryCard = travellerName;
      Log.info("Changed traveller state!");
    }

    // if (responseType === ResponseType.Action) travelState.text = text;
    mount(PrettyResponse, { target: response, props: { text, responseType } });
  }

  static handleResponses(responses: HTMLElement[]) {
    const lastOnly = Storage.getCurrentSettings().performanceModeEnabled;
    if (responses.length === 0) return;

    for (const response of responses) {
      if (response.hasAttribute(Config.ATTRIBUTE_RESPONSE_PRETTIFIED)) continue;
      const actionResponse = response.querySelector(Storage.getCurrentSettings().devResponseActionId);
      if (actionResponse) {
        if ((lastOnly && extensionState.loadFinished) || !lastOnly) {
          this.addResponse(actionResponse as HTMLElement, ResponseType.Action);
        }
      } else {
        const label = response.getAttribute("aria-label");
        const type = label && label.startsWith("Last action:") ? ResponseType.Last : ResponseType.Other;
        if (type === ResponseType.Last || !lastOnly || (lastOnly && extensionState.loadFinished)) {
          this.addResponse(response, type);
          extensionState.loadFinished = true;
        }
      }
    }
  }

  static discoverStoryCard(): HTMLElement | null {
    const title = document.querySelector(Storage.getCurrentSettings().devStoryCardSelector);
    return title ? DOM.getElementUpX(title as HTMLElement, 3) : null;
  }

  static getStoryCardName(storyCard: HTMLElement) {
    return storyCard.querySelector(Storage.getCurrentSettings().devStoryCardSelector)?.getAttribute("value") || "";
  }
}
