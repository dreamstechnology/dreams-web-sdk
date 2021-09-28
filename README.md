# Dreams Web SDK

## Dependencies

To install dependencies run

```
yarn install
```

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
## License

[Mozilla Public License Version 2.0](LICENSE)


