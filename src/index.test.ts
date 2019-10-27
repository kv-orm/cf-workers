import { CloudflareWorkersKVDatastore } from './index'
import { Datastore, SearchStrategy } from '@kv-orm/core'
import { namespace } from './namespace.test'

describe(`the universe`, () => {
  it(`can do math`, () => {
    expect(1 + 1).toEqual(2)
  })
})

describe(`CloudflareWorkersKVDatastore`, () => {
  let datastore: Datastore

  beforeEach(async () => {
    datastore = new CloudflareWorkersKVDatastore(namespace)
    await datastore.write(`key`, `value`)
  })

  it(`supports writes and reads`, async () => {
    expect(await datastore.read(`key`)).toEqual(`value`)
  })

  it(`supports deletes`, async () => {
    await datastore.delete(`key`)
    expect(await datastore.read(`key`)).toBeNull()
  })

  it(`supports searches`, async () => {
    expect(
      await datastore.search({ term: `k`, strategy: SearchStrategy.prefix })
    ).toEqual({ keys: [`key`], hasNextPage: false, cursor: `0` })
  })
})
