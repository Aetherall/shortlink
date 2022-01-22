import { createHash } from "crypto";
import { Shortener } from "../../applicative/tools/shortener";

export class SimpleHashShortener extends Shortener {
  shorten(long: string): string {
    const hash = createHash("sha256");
    hash.update(long);
    return hash.digest("base64");
  }
}
