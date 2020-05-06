/* eslint-disable @typescript-eslint/camelcase */
import { KVNamespace } from "@cloudflare/workers-types";
import Cloudworker from "@dollarshaveclub/cloudworker";

const LIST_MAX_LIMIT = 1000;

const namespace = new (Cloudworker as any).KeyValueStore() as KVNamespace;
namespace.list = async function (
  this,
  {
    limit = 1000,
    prefix = ``,
    cursor = `-1`,
  }: {
    prefix?: string;
    limit?: number;
    cursor?: string;
  }
): Promise<{
  keys: {
    name: string;
    expiration?: number;
  }[];
  list_complete: boolean;
  cursor: string;
}> {
  if (limit > LIST_MAX_LIMIT) limit = LIST_MAX_LIMIT;
  if (limit < 0) limit = 0;

  const { store } = this as any;

  let keys = Array.from(store.keys() as string[]).filter((key: string) =>
    key.startsWith(prefix)
  );

  keys = keys.slice(+cursor + 1);

  const list_complete = keys.length <= limit;

  keys = keys.slice(0, limit);

  const nextCursor = (
    +cursor + (list_complete ? keys.length : limit)
  ).toString();

  return Promise.resolve({
    keys: keys.map((key) => ({
      name: key,
    })),
    list_complete,
    cursor: nextCursor,
  });
};

export { namespace };
