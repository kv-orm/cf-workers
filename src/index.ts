import {
  Key,
  Value,
  SearchStrategy,
  Datastore,
  SearchOptions,
  SearchResult,
} from '@kv-orm/core'
import { KVNamespace } from '@cloudflare/workers-types'

export class CloudflareWorkersKVDatastore extends Datastore {
  public searchStrategies = [SearchStrategy.prefix]

  public constructor(private namespace: KVNamespace, keySeparator?: string) {
    super(keySeparator)
  }

  read(key: Key): Promise<Value> {
    return this.namespace.get(key)
  }

  write(key: Key, value: Value): Promise<void> {
    return this.namespace.put(key, value)
  }

  delete(key: Key): Promise<void> {
    return this.namespace.delete(key)
  }

  async search({
    term,
    strategy = SearchStrategy.prefix,
    first = Infinity,
    after,
  }: SearchOptions): Promise<SearchResult> {
    this.assertSearchStrategyIsValid(strategy)

    const response = await this.namespace.list({
      prefix: term,
      limit: first,
      cursor: after,
    })

    return {
      keys: response.keys.map(key => key.name),
      hasNextPage: !response.list_complete,
      cursor: response.cursor,
    }
  }
}
