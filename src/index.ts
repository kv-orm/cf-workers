import {
  Key,
  Value,
  SearchStrategy,
  Datastore,
  SearchOptions,
  SearchResult,
} from "@kv-orm/core";
import { KVNamespace } from "@cloudflare/workers-types";

type KVOptions =
  | {
      expiration: string | number;
    }
  | {
      expirationTtl: string | number;
    }
  | {};

type OptionsGenerator = (key: Key, value: Value) => KVOptions;

export class CloudflareWorkersKVDatastore extends Datastore {
  public searchStrategies = [SearchStrategy.prefix];
  private optionsGenerator?: OptionsGenerator;

  public constructor(
    private namespace: KVNamespace,
    {
      optionsGenerator,
      keySeparator,
    }: { optionsGenerator?: OptionsGenerator; keySeparator?: string } = {}
  ) {
    super({ keySeparator });
    this.optionsGenerator = optionsGenerator;
  }

  _read(key: Key): Promise<Value> {
    return this.namespace.get(key);
  }

  _write(key: Key, value: Value): Promise<void> {
    const options = this.optionsGenerator
      ? this.optionsGenerator(key, value)
      : {};
    return this.namespace.put(key, value, options);
  }

  _delete(key: Key): Promise<void> {
    return this.namespace.delete(key);
  }

  async _search({
    term,
    first = Infinity,
    after,
  }: SearchOptions): Promise<SearchResult> {
    const response = await this.namespace.list({
      prefix: term,
      limit: first,
      cursor: after,
    });

    return {
      keys: response.keys.map((key) => key.name),
      hasNextPage: !response.list_complete,
      cursor: response.cursor,
    };
  }
}
