import { KVNamespace } from '@cloudflare/workers-types'
import Cloudworker from '@dollarshaveclub/cloudworker'

import { CloudflareWorkersKVDatastore } from './index'

describe(`the universe`, () => {
  it(`can do math`, () => {
    expect(1 + 1).toEqual(2)
  })
})

describe(`CloudflareWorkersKVDatastore`, () => {
  it(`can be initialized, written to, and read from`, async () => {
    const namespace = new (Cloudworker as any).KeyValueStore() as KVNamespace

    const datastore = new CloudflareWorkersKVDatastore(namespace)

    await datastore.write(`key`, `value`)
    expect(await datastore.read(`key`)).toEqual(`value`)
  })
})
