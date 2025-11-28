import { Config, Log, mount, PrettyEditor, PrettyPanel, Storage, Utils } from "@/shared";

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
}
