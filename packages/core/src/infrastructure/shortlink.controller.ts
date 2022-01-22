import { Body, Controller, Post } from "@nestjs/common";

import {
  ShortenCommand,
  ShortenCommandHandler,
} from "../applicative/commands/shorten.command";
import { LongLink } from "../domain/long-link";

@Controller()
export class ShortlinkController {
  constructor(private readonly shortenHandler: ShortenCommandHandler) {}

  @Post("/api/shorten")
  async shorten(@Body("long") long: LongLink) {
    const short = await this.shortenHandler.execute(new ShortenCommand(long));
    return { short: short.toString() };
  }
}
