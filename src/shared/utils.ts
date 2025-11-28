/* Utils */
export class DUIUtils {
  /**
   *
   * @param num
   * @param min
   * @param max
   * @returns
   */
  static clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }

  /**
   *
   * @returns
   */
  static getVersion(): string {
    return chrome.runtime.getManifest().version;
  }

  /**
   *
   * @returns
   */
  static getAdventureId(): string {
    const match = window.location.pathname.match(/adventure\/([^\/]+)/);
    return match ? match[1] : "";
  }

  /**
   *
   * @returns
   */
  static getEnvironment(): string {
    const host = window.location.hostname;
    if (host.startsWith("play.")) return "Production";
    if (host.startsWith("beta.")) return "Beta";
    if (host.startsWith("alpha.")) return "Alpha";
    return "";
  }

  /**
   *
   * @param element
   * @param level
   * @returns
   */
  static travelUp(element: HTMLElement, level: number) {
    let currentElement = element;

    for (let i = 0; i < level; i++) {
      if (!currentElement?.parentElement) return null;
      currentElement = currentElement.parentElement;
    }

    return currentElement;
  }

  /**
   *
   * @param event
   */
  static eatEvent(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  /**
   *
   * @param data
   * @param currentIndex
   * @returns
   */
  static wrapIndexData(data: string[], currentIndex: number) {
    if (!data || data.length === 0) return "";
    const index = Math.max(0, Math.min(currentIndex ?? 0, data.length - 1));
    return data[index];
  }

  /**
   *
   * @param fileType
   * @returns
   */
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

  /**
   *
   * @param base64
   * @param filename
   * @returns
   */
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

  /**
   *
   * @param file
   * @returns
   */
  static async convertFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  /**
   *
   * @param fileType
   * @returns
   */
  static async requestFileData(fileType: string): Promise<string | null> {
    const file = await this.requestFile(fileType);
    if (!file) return null;
    return this.convertFile(file);
  }
}
