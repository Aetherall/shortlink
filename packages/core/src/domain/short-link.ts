export class ShortLink {
  constructor(private readonly value: string) {}

  toString() {
    return this.value;
  }
}
