import { LongLink } from "../../domain/long-link";
import { ShortLink } from "../../domain/short-link";
import { InMemoryLinkStore } from "../../infrastructure/stores/in-memory.link.store";
import { SimpleHashShortener } from "../../infrastructure/tools/simple-hash.shortener";
import { ShortenCommand, ShortenCommandHandler } from "./shorten.command";

describe("ShortenCommand", () => {
  it("should return a short link for a given long link", async () => {
    const store = new InMemoryLinkStore();
    const shortener = new SimpleHashShortener();
    const handler = new ShortenCommandHandler(store, shortener);

    const long = new LongLink("https://example.com");
    const short = await handler.execute(new ShortenCommand(long));

    expect(short).toEqual(
      new ShortLink("EAaArVRs5qV39C9S3zO0z9ynVoWeZkuNfeMpsVDQnOk=")
    );
    expect(await store.get(short)).toEqual(long);
  });
});
