import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Redirect,
} from "@nestjs/common";

import {
  ShortenCommand,
  ShortenCommandHandler,
} from "../applicative/commands/shorten.command";
import {
  GetLongQuery,
  GetLongQueryHandler,
  NoLinkForShort,
} from "../applicative/queries/get-long.query";
import { LongLink } from "../domain/long-link";
import { ShortLink } from "../domain/short-link";

@Controller()
export class ShortlinkController {
  constructor(
    private readonly shortenHandler: ShortenCommandHandler,
    private readonly getLongHandler: GetLongQueryHandler
  ) {}

  @Post("/api/shorten")
  async shorten(@Body("long") long: LongLink) {
    const short = await this.shortenHandler.execute(new ShortenCommand(long));
    return { short: short.toString() };
  }

  @Get("/:short")
  @Redirect()
  async redirect(@Param("short") short: ShortLink) {
    try {
      const long = await this.getLongHandler.execute(new GetLongQuery(short));
      return { url: long.toString() };
    } catch (error) {
      if (error instanceof NoLinkForShort) {
        throw new NotFoundException();
      }
    }
  }
}
