import { LongLink } from "../../domain/long-link";
import { ShortLink } from "../../domain/short-link";

export abstract class Shortener {
  abstract shorten(long: LongLink): ShortLink;
}
