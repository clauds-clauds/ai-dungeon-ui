import { Utils } from "@/shared";

export class DUILogger {
  private static _say(message: string, color: string = "#f8ae2c", loud: boolean = false) {
    const prefix = `DungeonUI (v${Utils.getVersion()}) ${loud ? "screams" : "says"}`;

    if (loud) message = message.toUpperCase();

    const style = ["font-weight: bold", "color: " + color].join(";");
    const styledMessage = `%c${prefix}%c "${message}"`;

    if (loud) console.error(styledMessage, style, "");
    else console.log(styledMessage, style, "");
  }

  static info(message: string) {
    this._say(message, "#327dea");
  }

  static success(message: string) {
    this._say(message, "#d32bc2");
  }

  static error(message: string) {
    this._say(message, "#f11a4c", true);
  }
}
