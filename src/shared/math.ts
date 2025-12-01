export class Mathf {
  static clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }

  static wrap(data: string[], currentIndex: number) {
    if (!data || data.length === 0) return "";
    const index = Math.max(0, Math.min(currentIndex ?? 0, data.length - 1));
    return data[index];
  }
}
