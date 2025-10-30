import { Config } from "@/lib/config";
import { Dev } from "@/lib/dev";
import { DOM } from "@/lib/dom";

/**
 * `Events` is the class which reacts to whatever is going on in the adventure.
 */
export class Events {
  private static _domObserver: MutationObserver;
  private static _adventureObserver: MutationObserver;
  private static _output: HTMLElement | null;

  static observe() {
    // Create the observer for the whole document.
    this._domObserver = new MutationObserver((mutations) => {
      this.OnDomMutated(mutations);
    });

    // Create the observer for the adventure part, stuff, thingy.
    this._adventureObserver = new MutationObserver((mutations) => {
      this.OnAdventureMutated(mutations);
    });

    // Connect both observers.
    this.connect();
  }

  /**
   * Connects either one or both observers to their targets.
   * @param adventureObserverOnly Whether to connect the adventure observer only, *what a mystery*.
   */
  static connect(adventureObserverOnly: boolean = false): void {
    // Only do the connecting of the adventure observer if the output hasn't already been discovered.
    if (!this._output) {
      // If not yet found then find it.
      this._output = document.getElementById(Config.ID_OUTPUT);

      // Let the adventure observer observe the thing.
      if (this._output) this._adventureObserver.observe(this._output, { childList: true, subtree: true });
    }
    if (adventureObserverOnly) return; // Return if that was all.
    this._domObserver.observe(document.body, { subtree: true, childList: true }); // Otherwise connect the DOM observer too.
  }

  /**
   * Called when something on the DOM changes.
   */
  static OnDomMutated(mutations: MutationRecord[]) {
    // Always try to inject the custom button.
    DOM.injectButton();

    // Only attempt to reconnect the adventure observer.
    this.connect(true);
  }

  static OnAdventureMutated(mutations: MutationRecord[]) {
    // Go through all the mutations.
    for (const mutation of mutations) {
      // Go through all the nodes.
      for (const node of mutation.addedNodes) {
        // Skip if it is not an element.
        if (!(node instanceof HTMLElement)) continue;

        // Collect the containers before handing it over to the DOM for molding.
        const containers =
          node.id === Config.ID_CONTAINER
            ? [node]
            : (Array.from(node.querySelectorAll(Config.SELECTOR_CONTAINER)) as HTMLElement[]);

        // Let the DOM stuff handle this stuff.
        DOM.manipulateContainers(containers);
      }
    }
  }

  static OnAdventureEnter() {
    //
  }

  static OnAdventureExit() {
    // Disconnect the adventure observer, just because.
    this._adventureObserver.disconnect();
  }
}
