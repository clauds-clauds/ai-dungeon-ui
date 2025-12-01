import { Config } from "@/shared/config";
import { DOM } from "@/shared/dom";
import { extensionState } from "@/shared/state.svelte";
import { Storage } from "@/shared/storage";
import { Utils } from "@/shared/utils";

export class Events {
  private static _domObserver: MutationObserver;
  private static _adventureObserver: MutationObserver;

  private static _output: HTMLElement | null;
  private static _adventureId: string;
  private static _storyCard: HTMLElement | null;

  static onWake() {
    this._domObserver = new MutationObserver((mutations) => {
      this.OnDomMutated(mutations);
    });
    this._adventureObserver = new MutationObserver((mutations) => {
      this.OnAdventureMutated(mutations);
    });
    this.onConnectAttempt(false);
  }

  static onConnectAttempt(skipDomObserver: boolean = true) {
    if (!this._output) {
      this._output = document.getElementById(Storage.getCurrentSettings().devOutputId);
      if (this._output) this._adventureObserver.observe(this._output, { childList: true, subtree: true });
    }
    if (!skipDomObserver) this._domObserver.observe(document.body, { subtree: true, childList: true });
  }

  static OnDomMutated(mutations: MutationRecord[]) {
    const adventureId = Utils.getAdventureId();

    // Invalid adventure/no adventure loaded.
    if (Utils.isStringInvalid(adventureId)) {
      this._adventureObserver.disconnect();
      this._output = null;
      this._adventureId = "";
      return;
    }

    // Adventure mismatch.
    if (adventureId !== this._adventureId) {
      Storage.optimize();
      this._adventureId = adventureId;
      this._adventureObserver.disconnect();
      this._output = null;
    }

    if (this._output && !this._output.isConnected) {
      this._adventureObserver.disconnect();
      this._output = null;
    }

    DOM.addButton();

    if (!this._output) {
      this._output = document.getElementById(Storage.getCurrentSettings().devOutputId);
      if (this._output) {
        this._adventureObserver.observe(this._output, { childList: true, subtree: true });
        const responses = Array.from(
          this._output.querySelectorAll(Storage.getCurrentSettings().devResponseSelector)
        ) as HTMLElement[];
        DOM.handleResponses(responses);
      }
    }

    const storyCard = DOM.discoverStoryCard();

    if (storyCard) {
      if (this._storyCard !== storyCard) {
        if (this._storyCard) {
          this.onStoryCardClose(this._storyCard);
        }
        this.onStoryCardOpen(storyCard);
      }
    } else {
      if (this._storyCard) {
        this.onStoryCardClose(this._storyCard);
      }
    }
  }

  static OnAdventureMutated(mutations: MutationRecord[]) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        const responses =
          node.id === Storage.getCurrentSettings().devResponseId
            ? [node]
            : (Array.from(node.querySelectorAll(Storage.getCurrentSettings().devResponseSelector)) as HTMLElement[]);

        DOM.handleResponses(responses);
      }
    }
  }

  static onStoryCardOpen(storyCard: HTMLElement) {
    const name = DOM.getStoryCardName(storyCard);
    extensionState.storyCard = name;
    DOM.addEditor(storyCard);
    this._storyCard = storyCard;
  }

  static onStoryCardClose(storyCard: HTMLElement) {
    const name = DOM.getStoryCardName(storyCard);
    Storage.sync(extensionState.storyCard, name);
    this._storyCard = null;
  }
}
