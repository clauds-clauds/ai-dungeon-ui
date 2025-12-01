import type { Adventure } from "./types";

export class Utils {
  static getAdventureId(): string {
    const match = window.location.pathname.match(/adventure\/([^\/]+)/);
    return match ? match[1] : "";
  }

  static getVersion(): string {
    return chrome.runtime.getManifest().version;
  }

  static getEnvironment(): string {
    const host = window.location.hostname;
    if (host.startsWith("play.")) return "Production";
    if (host.startsWith("beta.")) return "Beta";
    if (host.startsWith("alpha.")) return "Alpha";
    return "";
  }

  static isStringInvalid(string: string): boolean {
    if (!string || string === "") return true;
    return false;
  }

  static isAdventureInvalid(adventure: Adventure): boolean {
    if (!adventure || !adventure.storyCards) return true;
    return false;
  }

  static requestImage(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.style.display = "none";

      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];

        if (!file) {
          document.body.removeChild(input);
          resolve(null);
          return;
        }

        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          const result = readerEvent.target?.result as string;
          document.body.removeChild(input);
          resolve(result);
        };
        reader.onerror = (err) => {
          document.body.removeChild(input);
          reject(err);
        };
        reader.readAsDataURL(file);
      };

      document.body.appendChild(input);

      setTimeout(() => {
        input.click();
      }, 0);
    });
  }
}
