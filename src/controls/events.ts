// Imports HERE!
import { Dom, editState, Log, Storage, Utils } from "@/shared";

// Includes the CSS file here, otherwise it is ignored.
import "@/css/style.css";

/**
 * `Events` is a control class which handles start-up and all reactive stuff.
 */
class DUIEvents {
  private static _domObserver: MutationObserver;
  private static _outputObserver: MutationObserver;

  private static _cachedStoryCard: HTMLElement | null;
  private static _cachedOutput: HTMLElement | null;
  private static _cachedAdventureId: string = "";

  /**
   *
   */
  static async onStart(): Promise<void> {
    // Load storage first, otherwise everything explodes.
    Storage.load();
    Storage.listen();

    // Inject some stuff.
    Dom.injectIcons();
    Dom.injectPanel();

    // Initialize the observers.
    this._domObserver = new MutationObserver((records) => {
      this.onDomChange(records);
    });
    this._outputObserver = new MutationObserver((records) => {
      this.onOutputChange(records);
    });

    // Connect the DOM observer.
    this._domObserver.observe(document, { childList: true, subtree: true });
  }

  /**
   *
   * @param records
   * @returns
   */
  static onDomChange(records: MutationRecord[]) {
    const adventureId = Utils.getAdventureId();

    // For when leaving the adventure.
    if (adventureId === "") {
      this._outputObserver.disconnect();
      this._cachedOutput = null;
      this._cachedAdventureId = "";
      return;
    }

    // For when the adventure has changed.
    if (adventureId !== this._cachedAdventureId) {
      Storage.optimizeStoryCards();
      this._cachedAdventureId = adventureId;
      this._outputObserver.disconnect();
      this._cachedOutput = null;
    }

    // For validating the cached output thingy.
    if (this._cachedOutput && !this._cachedOutput.isConnected) {
      this._outputObserver.disconnect();
      this._cachedOutput = null;
    }

    // This injects the `DEV PANEL` thingy in the sidebar/flamey thing whatever.
    Dom.injectButton();

    if (!this._cachedOutput) {
      this._cachedOutput = document.getElementById(Storage.readSettings().outputId); // Try to find it, then connect.
      if (this._cachedOutput) {
        this._outputObserver.observe(this._cachedOutput, { childList: true, subtree: true });
        const responses = Array.from(
          this._cachedOutput.querySelectorAll(Storage.readSettings().responseSelector)
        ) as HTMLElement[];
        Dom.manipulateResponses(responses);
      }
    }

    const card = Dom.findCard();

    if (card) {
      if (this._cachedStoryCard !== card) {
        if (this._cachedStoryCard) {
          this.onStoryCardClose(this._cachedStoryCard);
        }
        this.onStoryCardOpen(card);
      }
    } else {
      if (this._cachedStoryCard) {
        this.onStoryCardClose(this._cachedStoryCard);
      }
    }
  }

  /**
   *
   * @param records
   */
  static onOutputChange(records: MutationRecord[]) {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        const responses =
          node.id === Storage.readSettings().responseId
            ? [node]
            : (Array.from(node.querySelectorAll(Storage.readSettings().responseSelector)) as HTMLElement[]);

        Dom.manipulateResponses(responses);
      }
    }
  }

  static onStoryCardOpen(storyCard: HTMLElement) {
    const content = Dom.readCard(storyCard);
    editState.name = content.name;
    Dom.injectEditor(storyCard);
    this._cachedStoryCard = storyCard;
    // const anchor = storyCard.lastChild as HTMLElement | null; // Notes thingy.
  }

  static onStoryCardClose(storyCard: HTMLElement) {
    const content = Dom.readCard(storyCard);
    Storage.syncStoryCard(editState.name, content.name, content.type);
    this._cachedStoryCard = null;
  }
}

// Start whatever DUI is supposed to do.
DUIEvents.onStart();
