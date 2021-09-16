import DreamsMessageHandler from '../src/messageHandler';

describe('#onMessage', () => {
  describe('when message is not of expected type', () => {
    test("behaves correctly", () => {
      const iframe = document.createElement('iframe');
      const handler = new DreamsMessageHandler(iframe);
      const spy = jest.spyOn(global.console, 'warn');
      const message = { data: JSON.stringify({ foo: 'bar' }) };
      handler.onMessage(message)
      expect(spy).toHaveBeenCalled();
    });
  });
});
