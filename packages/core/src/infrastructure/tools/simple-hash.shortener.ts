import { createHash } from "crypto";

import { Shortener } from "../../applicative/tools/shortener";
import { LongLink } from "../../domain/long-link";
import { ShortLink } from "../../domain/short-link";

export class SimpleHashShortener extends Shortener {
  shorten(long: LongLink): ShortLink {
    const hash = createHash("sha256");
    hash.update(long.toString());
    return new ShortLink(hash.digest("base64"));
  }
}
