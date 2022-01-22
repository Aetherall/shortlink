import { LongLink } from "../../domain/long-link";
import { ShortLink } from "../../domain/short-link";
import { LinkStore } from "./link.store";

export function LinkStoreSuite(store: LinkStore) {
  describe("LinkStore Suite", () => {
    it("should retrieve the long link from a saved short link", async () => {
      const long = new LongLink("https://example.com");
      const short = new ShortLink("a");
      await store.set(short, long);
      expect(await store.get(short)).toBe(long);
    });

    it("should return undefined if there is no saved link", async () => {
      expect(await store.get(new ShortLink("not-existing"))).toBe(undefined);
    });
  });
}
