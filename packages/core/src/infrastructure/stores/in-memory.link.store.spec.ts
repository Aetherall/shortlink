import { LinkStoreSuite } from "../../applicative/stores/link.store.suite";
import { InMemoryLinkStore } from "./in-memory.link.store";

const store = new InMemoryLinkStore();
LinkStoreSuite(store);
