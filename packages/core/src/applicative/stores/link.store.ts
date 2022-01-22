export abstract class LinkStore {
  abstract get(short: string): Promise<string | undefined>;
  abstract set(short: string, long: string): Promise<void>;
}
