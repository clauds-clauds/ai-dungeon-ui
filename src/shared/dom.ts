import { mount } from "svelte";
import { Config } from "./config";
import PrettyDevPanel from "@/components/pretty/PrettyDevPanel.svelte";
import { extensionState } from "./state.svelte";

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
}
