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

### Commit naming

We use commitlint to make sure commit messages adhere to certain rules. These are:

- [Angular Contribution Rules](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type)
- [Conventional Commit Rules](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification)
- [Commitlint Rules](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum)

Semantic release takes care of automatically bumping release versions provided that we name commits correctly.
[Here](https://github.com/semantic-release/semantic-release#commit-message-format) you can find what constitutes a patch/feature/breaking release.

### Manual release process

It's possible to manually release a new version locally.
Prerequisites:
- Obtain [npm token](https://start.1password.com/open/i?a=IRGTGSWMBZEMXJFPUSWVVIKOBE&v=xfh2geajq6tugtv5d5eby3vtni&i=uely6p4tyot2hsl72bnucwyle4&h=doconomyab.1password.com) used for releasing. It needs to be put in [.npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc#auth-related-configuration) file

In order to leverage semantic-release modify `release.config.js` file as follows:
- change the `branches` setting to allow current branch (or `'*'`) if different than main
- set `ci` to `false` to allow running it locally
- remove `@semantic-release/github` and `@semantic-release/git` plugins

Then the process can be started with `yarn semantic-release`.

Besides publishing the package it will generate the changelog that should be committed.

## License

[Mozilla Public License Version 2.0](LICENSE)
