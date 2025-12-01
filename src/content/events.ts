import { Config } from "@/shared/config";
import { DOM } from "@/shared/dom";
import { Storage } from "@/shared/storage";

export class Events {
  private static _domObserver: MutationObserver;
  private static _adventureObserver: MutationObserver;
  private static _output: HTMLElement | null;

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
    DOM.addButton();
  }

  static OnAdventureMutated(mutations: MutationRecord[]) {}
}
