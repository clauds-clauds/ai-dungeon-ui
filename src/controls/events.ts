import PrettyEditor from "@/components/pretty/PrettyEditor.svelte";
import { Config, Dom, Logger, Storage, Utils } from "@/shared";
import { editorState } from "@/shared/state.svelte";

// Include the theme here so that it is included in the build.
import "@/css/theme.css";

class DUIEvents {
  // Mutation observers HERE!
  private static _domObserver: MutationObserver;
  private static _outputObserver: MutationObserver;

  // Cached stuff HERE!
  private static _cachedCard: HTMLElement | null;
  private static _cachedOutput: HTMLElement | null;

  static async onStart(): Promise<void> {
    // Log something awfully generic.
    Logger.info("Activating...");
    Logger.info(`Detected environment: ${Utils.getEnvironment()}`);

    // Do the storage stuff.
    await Storage.load();
    Storage.listen();

    // Create the DOM observer.
    this._domObserver = new MutationObserver((records) => {
      this.onDomChange(records);
    });

    // Connect it.
    this._domObserver.observe(document, { childList: true, subtree: true });

    // Create the output observer.
    this._outputObserver = new MutationObserver((records) => {
      this.onOutputChange(records);
    });

    // Finish logging.
    Logger.success("Start-up has finished!");
  }

  static onDomChange(records: MutationRecord[]) {
    // If there is no valid adventure ID then disconnect the output observer and return.
    if (Utils.getAdventureId() === "N/A") {
      Logger.info("Left adventure, disconnecting...");
      this._outputObserver.disconnect();
      this._cachedOutput = null;
      return;
    }

    // Try to find the output if not already done.
    if (!this._cachedOutput) {
      this._cachedOutput = document.getElementById(Config.ID_OUTPUT); // Try to find it, then connect.
      if (this._cachedOutput) {
        Logger.success("Connected output observer!"); // Log something too.
        this._outputObserver.observe(this._cachedOutput, { childList: true, subtree: true });
      }
    }

    // Try to find any open story cards.
    const card = Dom.findCard();

    // Handle opening/closing the card.
    if (card) {
      if (this._cachedCard !== card) {
        if (this._cachedCard) {
          this.onCardClose(this._cachedCard);
        }
        this.onCardOpen(card);
      }
    } else {
      if (this._cachedCard) {
        this.onCardClose(this._cachedCard);
      }
    }
  }

  static onCardOpen(card: HTMLElement) {
    // Read the content of the card.
    const content = Dom.readCard(card);

    // Grab the name of the card and send it over to the editor state so that it is reactive.
    editorState.name = content.name;

    // Grab the last element of the card, usually the notes thingy.
    const anchor = card.lastChild as HTMLElement | null;
    Dom.mountSafe(Config.ID_PRETTY_EDITOR, PrettyEditor, card, anchor);

    // Then cache the card.
    this._cachedCard = card;
  }

  static onCardClose(card: HTMLElement) {
    // Load the cached content.
    const content = Dom.readCard(card);

    // Sync the stuff.
    Storage.syncCard(editorState.name, content.name, content.type);

    // Clear the cached card.
    this._cachedCard = null;
  }

  static onOutputChange(records: MutationRecord[]) {
    // Go through all the changes.
    for (const record of records) {
      // Go through all added nodes.
      for (const node of record.addedNodes) {
        // Skip non-element thingies.
        if (!(node instanceof HTMLElement)) continue;

        // Collect all the responses.
        const responses =
          node.id === Config.ID_RESPONSE
            ? [node]
            : (Array.from(node.querySelectorAll(Config.SELECTOR_RESPONSE)) as HTMLElement[]);

        // Hand it over to DOM to do the stuff with.
        Dom.transformResponses(responses);
      }
    }
  }
}

DUIEvents.onStart();
