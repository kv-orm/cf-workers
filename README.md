<h1 align="center">Welcome to @kv-orm/cf-workers 👋</h1>
<p>
  <a href="https://github.com/kv-orm/cf-workers/actions" target="_blank">
    <img alt="GitHub Actions Checks" src="https://github.com/kv-orm/cf-workers/workflows/Test/badge.svg">
  </a>
  <a href="https://lgtm.com/projects/g/kv-orm/cf-workers/alerts/" target="_blank">
    <img alt="LGTM Alerts" src="https://img.shields.io/lgtm/alerts/g/kv-orm/cf-workers.svg?logo=lgtm">
  </a>
  <a href="" target="_blank">
    <img alt="Codecov" src="https://codecov.io/gh/kv-orm/cf-workers/branch/master/graph/badge.svg">
  </a>
  <a href="https://lgtm.com/projects/g/kv-orm/cf-workers/context:javascript" target="_blank">
    <img alt="LGTM Code Quality" src="https://img.shields.io/lgtm/grade/javascript/g/kv-orm/cf-workers.svg?logo=lgtm">
  </a>
  <a href="https://github.com/kv-orm/cf-workers/packages" target="_blank">
    <img alt="Version" src="https://img.shields.io/github/package-json/v/kv-orm/cf-workers" />
  </a>
  <a href="https://github.com/kv-orm/cf-workers/blob/master/LICENSE" target="_blank">
    <img alt="License" src="https://img.shields.io/github/license/kv-orm/cf-workers" />
  </a>
  <a href="https://greenkeeper.io" target="_blank">
    <img alt="Greenkeeper" src="https://badges.greenkeeper.io/kv-orm/cf-workers.svg">
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img alt="Types" src="https://img.shields.io/npm/types/kv-orm.svg">
  </a>
  <a href="https://github.com/kv-orm/cf-workers" target="_blank">
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/kv-orm/cf-workers.svg?logo=github" />
  </a>
</p>

> A Cloudflare Workers KV datastore plugin for kv-orm.

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

## Usage

```typescript
import { KVNamespace } from '@cloudflare/workers-types'
import { CloudflareWorkersKVDatastore } from '@kv-orm/cf-workers'
import { Entity } from '@kv-orm/core'

declare global {
  const myKVNamespaceBinding: KVNamespace
}

const datastore = new CloudflareWorkersKVDatastore(myKVNamespaceBinding)

@Entity({ datastore })
class MyEntity {
  // ...
}
```

# Development

## Clone and Install Dependencies

```sh
git clone git@github.com:kv-orm/cf-workers.git
npm install
```

## Run tests

```sh
npm run lint
npm test
```

## 📝 License

Copyright © 2019 [Greg Brimble](https://github.com/GregBrimble).<br />
This project is [MIT](https://github.com/kv-orm/cf-workers/blob/master/LICENSE) licensed.
