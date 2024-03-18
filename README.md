# Dreams Web SDK

## Dependencies

To install dependencies run

```shell
yarn install
```

We use [lefthook](https://github.com/evilmartians/lefthook). Refer to their github page for installation instructions.

## Testing

```shell
yarn test
```

We use [jest](https://jestjs.io/) for testing.

## Building

To build distros run

```shell
yarn run build
```

New distros are going to be created in the `dist` folder.

For more info about building packages refer to [rollup webpage](https://rollupjs.org/guide/en/#overview).

## Usage

```html
<div id="dreams-web-sdk-container"></div>

<script src="path/to/dreams/sdk/js/file">
  var callbacks = {
    onIdTokenDidExpire: async () => {
      const resp = await fetch("/token-expired-endpoint");
      const data = await resp.json();

      return data.token;
    },
    onAccountProvisionRequested: async () => {
      await fetch("/provision-account-endpoint")
    },
    onExitRequested: () => {
      window.location.href = "http://example.com/some/path"
    },
    onTransferConsentRequested: (event) => promise.resolve({consentId: event.message.consentId, requestId: event.message.requestId, consentRef: 'foo'}),
    onAccountRequested: (event) => promise.resolve({requestId: event.message.requestId})
  }

  var sdk = new DreamsWebSDK("https://dreams.api.endpoint");

  // Optional param to redirect user inside dreams app
  var location = "marketplace";

  sdk.setup(callbacks);
  sdk.start(user_jwk_token_value, "en", location);
</script>
```

## Manually sending a message

```html
<div id="dreams-web-sdk-container"></div>

<script src="path/to/dreams/sdk/js/file">
  var callbacks = {}
  var sdk = new DreamsWebSDK("https://dreams.api.endpoint");
  var messageHandler = sdk.setup(callbacks);

  sdk.start(user_jwk_token_value, "en");

  const new_token = await fetch("/token-endpoint");

  messageHandler.postUpdateToken('request-id-string', new_token)
</script>
```

### message types

currently we can:

- `postUpdateToken` a response to `onIdTokenDidExpire` message
- `postAccountProvisionInitiated` a response to `onAccountProvisionRequested` message
- `postInvestmentAccountProvisionInitiated` a response to `onInvestmentAccountProvisionRequested` message
- `navigateTo` that has no corresponding dreams side message

see the docs about their usage.

## Contributing

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
