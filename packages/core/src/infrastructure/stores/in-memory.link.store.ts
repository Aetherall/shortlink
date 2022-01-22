import { LinkStore } from "../../applicative/stores/link.store";
import { LongLink } from "../../domain/long-link";
import { ShortLink } from "../../domain/short-link";

export class InMemoryLinkStore extends LinkStore {
  private storage = new Map<string, LongLink>();

  async get(short: ShortLink): Promise<LongLink | undefined> {
    return this.storage.get(short.toString());
  }

  async set(short: ShortLink, long: LongLink): Promise<void> {
    this.storage.set(short.toString(), long);
  }
}
