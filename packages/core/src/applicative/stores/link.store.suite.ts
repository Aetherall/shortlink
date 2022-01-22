import { LinkStore } from "./link.store";

export function LinkStoreSuite(store: LinkStore) {
  describe("LinkStore Suite", () => {
    it("should retrieve the long link from a saved short link", async () => {
      const long = "https://example.com";
      const short = "a";
      await store.set(short, long);
      expect(await store.get(short)).toEqual(long);
    });
  });
}
