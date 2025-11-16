export class DUIConfig {
  static SELECTOR_STORY_CARD_TYPE = "button[aria-labelledby='scTypeLabel']";
  static SELECTOR_STORY_CARD_NAME = "input[aria-labelledby='scTitleLabel']";
  static SELECTOR_STORY_CARD_TRIGGERS = "input[aria-labelledby='scTriggersLabel']";
  static SELECTOR_RESPONSE: string = "#transition-opacity";

  static ID_PRETTY_EDITOR = "dui-pretty-editor";
  static ID_PRETTY_RESPONSE = "dui-pretty-response";
  static ID_PRETTY_HIGHLIGHT = "dui-pretty-highlight";

  static ID_OUTPUT: string = "gameplay-output";
  static ID_RESPONSE: string = "transition-opacity";
  static ID_RESPONSE_ACTION: string = "span#action-text";

  static ATTRIBUTE_TRANSFORMED = "dui-transformed-response";
}
