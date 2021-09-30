# Dreams Web SDK

## Dependencies

To install dependencies run

```
yarn install
```

We use [lefthook](https://github.com/evilmartians/lefthook). Refer to their github page for installation instructions.
## Testing

```
yarn test
```
We use [jest](https://jestjs.io/) for testing.
## Building

To build distros run

```
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
      const resp = await fetch('/token-expired-endpoint');
      const data = await resp.json();

      return data.token;
    },
    onAccountProvisionRequested: () => {
      await fetch('/provision-account-enpoint')
    },
    onExitRequested: () => {
      window.location.href = "http://example.com/some/path"
    }
  }

  var sdk = new DreamsWebSDK('https://dreams.api.endpoint');

  sdk.setup(callbacks);
  sdk.start(user_jwk_token_value, 'en');
</script>
```
## Contributing

### Commit naming

We use commitlint to make sure commit messages adhere to certain rules. These are:
- [Anglar Contribution Rules](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type)
- [Conventional Commit Rules](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification)
- [Commitlint Rules](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum)

Semantic release takes care of automatically bumping release verions provided that we name commits correctly.
[Here](https://github.com/semantic-release/semantic-release#commit-message-format) you can find what constitutes a patch/feature/breaking release.
## License

[Mozilla Public License Version 2.0](LICENSE)


