import { LinkStore } from "../stores/link.store";
import { Shortener } from "../tools/shortener";

export class ShortenCommand {
  constructor(public readonly long: string) {}
}

export class ShortenCommandHandler {
  constructor(
    private readonly linkStore: LinkStore,
    private readonly shortener: Shortener
  ) {}

  async execute({ long }: ShortenCommand) {
    const short = this.shortener.shorten(long);

    await this.linkStore.set(short, long);

    return short;
  }
}
