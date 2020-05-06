<h1 align="center">Welcome to @kv-orm/cf-workers 👋</h1>
<p>
  <a href="https://github.com/kv-orm/cf-workers/actions?query=workflow%3ATest" target="_blank">
    <img alt="GitHub Actions Checks" src="https://github.com/kv-orm/cf-workers/workflows/Test/badge.svg" />
  </a>
  <a href="https://lgtm.com/projects/g/kv-orm/cf-workers/alerts/" target="_blank">
    <img alt="LGTM Alerts" src="https://img.shields.io/lgtm/alerts/g/kv-orm/cf-workers.svg?logo=lgtm&style=plastic" />
  </a>
  <a href="https://snyk.io/test/github/kv-orm/cf-workers?targetFile=package.json" target="_blank">
    <img alt="Synk Vulnerabilities" src="https://snyk.io/test/github/kv-orm/cf-workers/badge.svg?targetFile=package.json" />
  </a>
  <a href="https://codecov.io/gh/kv-orm/cf-workers" target="_blank">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/kv-orm/cf-workers?logo=codecov&style=plastic" />
  </a>
  <a href="https://lgtm.com/projects/g/kv-orm/cf-workers/context:javascript" target="_blank">
    <img alt="LGTM Code Quality" src="https://img.shields.io/lgtm/grade/javascript/g/kv-orm/cf-workers.svg?logo=lgtm&style=plastic" />
  </a>
  <a href="https://codeclimate.com/github/kv-orm/cf-workers/maintainability" target="_blank">
    <img alt="Code Climate Maintainability" src="https://img.shields.io/codeclimate/maintainability/kv-orm/cf-workers.svg?style=plastic" />
  </a>
  <a href="https://github.com/kv-orm/cf-workers/packages" target="_blank">
    <img alt="Version" src="https://img.shields.io/github/package-json/v/kv-orm/cf-workers?style=plastic" />
  </a>
  <a href="https://github.com/kv-orm/cf-workers/blob/master/LICENSE" target="_blank">
    <img alt="License" src="https://img.shields.io/github/license/kv-orm/cf-workers?style=plastic" />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img alt="Types" src="https://img.shields.io/npm/types/kv-orm.svg?style=plastic" />
  </a>
  <a href="https://github.com/kv-orm/cf-workers" target="_blank">
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/kv-orm/cf-workers.svg?logo=github&style=plastic" />
  </a>
</p>

A Cloudflare Workers KV datastore plugin for [kv-orm](https://github.com/kv-orm/core).

## Author

👤 **Greg Brimble**

- Github: [@GregBrimble](https://github.com/GregBrimble)
- Personal Website: [https://gregbrimble.com/](https://gregbrimble.com/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/kv-orm/cf-workers/issues).

## 😍 Show your support

Please consider giving this project a <a href="https://github.com/kv-orm/cf-workers/stargazers" target="_blank" title="Thank you!">⭐️</a> if you use it, or if it provides some inspiration!

# Usage

## Install

```sh
npm install --save @kv-orm/core @kv-orm/cf-workers
npm install --save-dev @cloudflare/workers-types
```

## Quick Start

```typescript
import { KVNamespace } from "@cloudflare/workers-types";
import { CloudflareWorkersKVDatastore } from "@kv-orm/cf-workers";
import { Entity } from "@kv-orm/core";

declare global {
  const myKVNamespaceBinding: KVNamespace;
}

const datastore = new CloudflareWorkersKVDatastore(myKVNamespaceBinding);

@Entity({ datastore })
class MyEntity {
  // ...
}
```

## Options

The constructor can also take a couple of options:

- `keySeparator` defaults to a colon, `:`
- `optionsGenerator`, for a given `key` and `value` can return options to pass to the KV Namespace `put` method: `expiration` or `expirationTtl`. More information about expiring data can be found on [the official Cloudflare documentation](https://developers.cloudflare.com/workers/reference/apis/kv/#creating-expiring-keys).

```typescript
const datastore = new CloudflareWorkersKVDatastore(myKVNamespaceBinding, {
  keySeparator: ":",
  optionsGenerator: (key, value) => ({
    expirationTtl: 120, // Or, alternatively, `expiration`
  }),
});
```

In this particular example, all data will expire after 120 seconds.

**Note**: this expiration only affects data from _new_ read/search operations. Data already in the memory cache will persist until purged (if using within a Worker context, this is until the end of the single request).

# Development

## Clone and Install Dependencies

```sh
git clone git@github.com:kv-orm/cf-workers.git
npm install
```

## Run tests

```sh
npm run lint  # 'npm run lint:fix' will automatically fix most problems
npm test
```

## 📝 License

Copyright © 2019 [Greg Brimble](https://github.com/GregBrimble).<br />
This project is [MIT](https://github.com/kv-orm/cf-workers/blob/master/LICENSE) licensed.
