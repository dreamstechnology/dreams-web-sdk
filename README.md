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

To use it
```html

  <div id="dreams-web-sdk-container"></div>
  <script src="path/to/js/file">
    DreamsWebSDK.setup(
    // this has to be the same as the id of the div
    "dreams-web-sdk-container",
    // endpoint that we are going to call to verify users' token
    "http://dev.dreams.test:3030/users/verify_token",
    // user's jwk token
    "token");

    var messageHandler = DreamsWebSDK.getMessageHandler(
      // dreams api endpoint
      "http://dev.dreams.test:3030/",
      // if we provide this value, we'll get redirected once the user decides to exit the dreams app.
      "http://dev-partner-api.dreams-demo.test:3000/webapp",
      // those two callbacks have to exist
      {
        onIdTokenDidExpire: () => {},
        onAccountProvisionRequested: () => {}
      }
    );

    // internally this adds an event listener on the window
    messageHandler.listen();
  <scirpt>
```
## License

[Mozilla Public License Version 2.0](LICENSE)


