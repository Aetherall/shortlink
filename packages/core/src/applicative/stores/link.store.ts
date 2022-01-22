import { LongLink } from "../../domain/long-link";
import { ShortLink } from "../../domain/short-link";

export abstract class LinkStore {
  abstract get(short: ShortLink): Promise<LongLink | undefined>;
  abstract set(short: ShortLink, long: LongLink): Promise<void>;
}
