import { Module } from "@nestjs/common";

import { ShortenCommandHandler } from "./applicative/commands/shorten.command";
import { GetLongQueryHandler } from "./applicative/queries/get-long.query";
import { LinkStore } from "./applicative/stores/link.store";
import { Shortener } from "./applicative/tools/shortener";
import { ShortlinkController } from "./infrastructure/shortlink.controller";
import { InMemoryLinkStore } from "./infrastructure/stores/in-memory.link.store";
import { SimpleHashShortener } from "./infrastructure/tools/simple-hash.shortener";

@Module({
  controllers: [ShortlinkController],
  providers: [
    {
      provide: GetLongQueryHandler,
      inject: [LinkStore],
      useFactory: (linkStore: LinkStore) => new GetLongQueryHandler(linkStore),
    },
    {
      provide: ShortenCommandHandler,
      inject: [LinkStore, Shortener],
      useFactory: (linkStore: LinkStore, shortener: Shortener) =>
        new ShortenCommandHandler(linkStore, shortener),
    },
    {
      provide: LinkStore,
      useClass: InMemoryLinkStore,
    },
    {
      provide: Shortener,
      useClass: SimpleHashShortener,
    },
  ],
})
export class ShortlinkModule {}
