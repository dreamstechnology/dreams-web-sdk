# Dreams Web SDK

## Usage

See [examples](./examples/) for fully functional versions of the below usage scenarios:

### Browser (UMD)

```html
<script src="dreams-web-sdk.min.js"></script>
<script>
    const sdk = new dreamsWebSdk.DreamsSDK('https://<des-uri>');
</script>
```

### Browser (ESM)

```html
<script type="module">
  import { DreamsSDK } from 'dreams-web-sdk/dist/esm/index.js';
  const sdk = new DreamsSDK('https://<des-uri>');
</script>
```

### Bundler (ESM)

```sh
npm install dreams-web-sdk
```

```javascript
import { DreamsSDK } from 'dreams-web-sdk';
const sdk = new DreamsSDK('https://<des-uri>');
```

### Bundler (CJS)

```sh
npm install dreams-web-sdk
```

```javascript
const { DreamsSDK } = require('dreams-web-sdk');
const sdk = new DreamsSDK('https://<des-uri>');
```

## Contributing

### Dependencies

We use the [Yarn Classic (v1)](https://classic.yarnpkg.com/en/docs) package manager.

To install dependencies:

```shell
yarn install
```

We use [lefthook](https://github.com/evilmartians/lefthook) for git hooks.
Please refer to their [github page](https://github.com/evilmartians/lefthook)
for installation instructions.

### Testing

We use [jest](https://jestjs.io/) for testing.

```shell
yarn test
```

### Building

We use [rollup.js](https://rollupjs.org/) for building.

```shell
yarn run build
```

### Release management

1. Decide which PRs to include in the release, and if that results in a new
   patch, minor or major release.
2. Create a branch for the upcoming release named `release-<semver>`
3. Start a new [CHANGELOG.md](./CHANGELOG.md) entry for the new version.
4. Push the release branch.
5. Merge all pull requests that should be included into the release branch.
6. Use `npm version <strategy>` to bump the package version. For example `npm version premajor --preid=rc`
7. Dry-run the release: `yarn publish --dry-run`
8. Make a cautious release `yarn publish --tag=next` and verify the release works
9. Push the branch and tag
10. Merge to main and publish `latest`:
  - `npm dist-tag add dreams-web-sdk@<semver> latest`
  - `npm dist-tag rm dreams-web-sdk next`

## License

[Mozilla Public License Version 2.0](LICENSE)
