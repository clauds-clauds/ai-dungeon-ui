import * as Types from "./types.js";
import { Config } from "./config.js";
import { Utils } from "./utils.js";

/**
 * `Dev` is a handy little class which I use to do developer stuff.
 */
export class Dev {
  /**
   * Prints a nice little message to the console.
   * @param message The message to show.
   * @param type The type of message. `SayType.Loud` is for errors and important stuff.
   */
  public static say(message: string, type: Types.SayType = Types.SayType.Normal): void {
    // Set a shorthand because I am sick of typing.
    const isLoud = type === Types.SayType.Loud;

    // Set a prefix based on the type.
    const prefix = `Dungeon UI (v${Utils.getVersion()}) ${isLoud ? "screams" : "says"}`;

    // Set a pretty color to print to the console.
    const color = isLoud ? Config.COLOR_DANGER : Config.COLOR_THEME;

    // Style and then form the actual message to print.
    const style = ["font-weight: bold", "color: " + color].join(";");
    const styledMessage = `%c${prefix}%c "${message}"`;

    // Log the stuff either as a normal message or as an error.
    if (isLoud) console.error(styledMessage, style, "");
    else console.log(styledMessage, style, "");
  }
}
