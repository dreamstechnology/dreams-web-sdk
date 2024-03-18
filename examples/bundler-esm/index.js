import { DreamsSDK } from 'dreams-web-sdk';

const callbacks = {
  onIdTokenDidExpire: async () => {
    return 'token';
  },
};
export const sdk = new DreamsSDK('https://demo.dreams.test:3000');
sdk.setup(callbacks);
sdk.start('jwt-token', 'en');
