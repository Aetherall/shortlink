import { LinkStore } from "../../applicative/stores/link.store";

export class InMemoryLinkStore extends LinkStore {
  private storage = new Map<string, string>();

  async get(short: string): Promise<string | undefined> {
    return this.storage.get(short);
  }

  async set(short: string, long: string): Promise<void> {
    this.storage.set(short, long);
  }
}
