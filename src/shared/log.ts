/* Log */
export class DUILog {
  private static _say(message: string, color: string, loud: boolean) {
    const prefix = `DungeonUI ${loud ? "screams" : "says"}`; // Set some prefix.
    if (loud) message = message.toUpperCase(); // Convert to uppercase if loud (error).

    // Style it a bit.
    const style = ["font-weight: bold", "color: " + color].join(";");
    const styledMessage = `%c${prefix}%c "${message}"`;

    // Send over to console.
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
