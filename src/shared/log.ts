export class Log {
  private static _say(message: string, color: string, loud: boolean) {
    const prefix = `DungeonUI ${loud ? "screams" : "says"}`;
    if (loud) message = message.toUpperCase();
    const style = ["font-weight: bold", "color: " + color].join(";");
    const styledMessage = `%c${prefix}%c "${message}"`;
    if (loud) console.error(styledMessage, style, "");
    else console.log(styledMessage, style, "");
  }

  static info(message: string) {
    this._say(message, "#b664ea", false);
  }

  static error(message: string) {
    this._say(message, "#f3194d", true);
  }

  static success(message: string) {
    this._say(message, "#23c361", false);
  }
}
