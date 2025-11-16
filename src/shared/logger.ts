import { Utils } from "@/shared";

export class DUILogger {
  private static _say(message: string, color: string = "#f8ae2c", loud: boolean = false) {
    const prefix = `DungeonUI (v${Utils.getVersion()}) ${loud ? "screams" : "says"}`;

    const style = ["font-weight: bold", "color: " + color].join(";");
    const styledMessage = `%c${prefix}%c "${message}"`;

    if (loud) console.error(styledMessage.toUpperCase(), style, "");
    else console.log(styledMessage, style, "");
  }

  static info(message: string) {
    this._say(message);
  }

  static success(message: string) {
    this._say(message, "#22c55e");
  }

  static error(message: string) {
    this._say(message, "#f3194d", true);
  }
}
