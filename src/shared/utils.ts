export class DUIUtils {
  /* Extension stuff HERE! */

  static getVersion(): string {
    return chrome.runtime.getManifest().version;
  }

  static getAdventureId(): string {
    const match = window.location.pathname.match(/adventure\/([^\/]+)/);
    return match ? match[1] : "N/A";
  }

  static getEnvironment(): string {
    const host = window.location.hostname;
    if (host.startsWith("play.")) return "production";
    if (host.startsWith("beta.")) return "beta";
    if (host.startsWith("alpha.")) return "alpha";
    return "N/A";
  }

  static travelUp(element: HTMLElement, level: number) {
    let currentElement = element;

    for (let i = 0; i < level; i++) {
      if (!currentElement?.parentElement) return null;
      currentElement = currentElement.parentElement;
    }

    return currentElement;
  }

  static clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }

  static wrapIndexData(data: string[], currentIndex: number) {
    if (!data || data.length === 0) return "";
    const index = Math.max(0, Math.min(currentIndex ?? 0, data.length - 1));
    return data[index];
  }

  static async requestFile(fileType: string): Promise<File | null> {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = `${fileType}/*`;

      input.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files ? target.files[0] : null;
        resolve(file);
      };

      input.style.display = "none";
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    });
  }

  static async downloadImage(base64: string, filename: string) {
    if (!base64) return;

    const response = await fetch(base64);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static async convertFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  static async requestFileData(fileType: string): Promise<string | null> {
    const file = await this.requestFile(fileType);
    if (!file) return null;
    return this.convertFile(file);
  }
}
