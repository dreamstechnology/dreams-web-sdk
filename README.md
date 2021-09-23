# Dreams Web SDK

## Dependecies

To install dependecies run

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
    // this callback has to return a string value (which is a token)
    onIdTokenDidExpire: async () => {
      const resp = await fetch('/token-expired-endpoint');
      const data = await resp.json();

      return data.token;
    },
    // this callback may but doesn't have to return anything
    onAccountProvisionRequested: () => {
      await fetch('/provision-account-enpoint')
    },
    // this callback doesn't have to return anything
    onExitRequested: () => {
      window.location.href = "http://dev.dreams-demo.test:3000/webapp"
    }
  }

  var sdk = new DreamsWebSDK('https://dreams.api.endpoint');

  sdk.setup(user_jwk_token_value, 'dreams-web-sdk-container');
  sdk.start(callbacks);
</script>
```
## License

[Mozilla Public License Version 2.0](LICENSE)


