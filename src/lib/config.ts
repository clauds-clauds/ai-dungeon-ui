export class Config {
  static COLOR_THEME: string = "#f8ae2c";
  static COLOR_DANGER: string = "#f3194d";
  static COLOR_SUCCESS: string = "#22c55e";

  static ID_CUSTOM_STYLE: string = "dungeon-ui-custom-style";
  static ID_ANCHOR: string = "dungeon-ui-anchor";
  static ID_TRAVEL_ANCHOR: string = "dungeon-ui-travel-anchor";
  static ID_BUTTON: string = "dungeon-ui-button";
  static ID_OUTPUT: string = "gameplay-output";
  static ID_CONTAINER: string = "transition-opacity";

  static SELECTOR_EXIT_BUTTON: string = 'div[role="button"][aria-label="Exit game"]';
  static SELECTOR_CONTAINER: string = "#transition-opacity";
  static SELECTOR_ACTION_CONTAINER: string = "span#action-text";
  static SELECTOR_RESPONSE_CONTAINER: string = "span#game-backdrop-saturate";

  static ATTRIBUTE_MANIPULATED: string = "dungeon-ui-manipulated";
}
