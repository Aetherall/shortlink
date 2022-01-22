import { LongLink } from "../../domain/long-link";
import { ShortLink } from "../../domain/short-link";
import { InMemoryLinkStore } from "../../infrastructure/stores/in-memory.link.store";
import {
  GetLongQuery,
  GetLongQueryHandler,
  NoLinkForShort,
} from "./get-long.query";

describe("GetLong Query", () => {
  const store = new InMemoryLinkStore();
  const handler = new GetLongQueryHandler(store);

  it("should retrieve the long link from the corresponding short link", async () => {
    await store.set(
      new ShortLink("short"),
      new LongLink("https://example.com")
    );

    const result = await handler.execute(
      new GetLongQuery(new ShortLink("short"))
    );

    expect(result).toEqual(new LongLink("https://example.com"));
  });

  it("should fail if there is no matching link", async () => {
    await expect(() =>
      handler.execute(new GetLongQuery(new ShortLink("not-existing")))
    ).rejects.toThrow(NoLinkForShort);
  });
});
