import { ShortLink } from "../../domain/short-link";
import { LinkStore } from "../stores/link.store";

export class NoLinkForShort extends Error {
  constructor(short: ShortLink) {
    super(`No link found for short ${short}`);
  }
}

export class GetLongQuery {
  constructor(public readonly short: ShortLink) {}
}

export class GetLongQueryHandler {
  constructor(private readonly linkStore: LinkStore) {}

  async execute({ short }: GetLongQuery) {
    const long = await this.linkStore.get(short);

    if (!long) {
      throw new NoLinkForShort(short);
    }

    return long;
  }
}
