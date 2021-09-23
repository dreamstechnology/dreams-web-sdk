import DreamsMessageHandler from '../src/messageHandler';

const buildMessage = (event, requestId = '123', idToken = undefined) => ({
  data: JSON.stringify({ event, message: { requestId, idToken } })
});

describe('#constructor', () => {
  test('dreams api endpoint not provided', () => {
    const iframe = document.createElement('iframe');
    const throwable = () => {
      new DreamsMessageHandler(iframe, undefined, {}, '123')
    }
    expect(throwable).toThrow();
  });
});

describe('#onMessage', () => {
  describe("when message is unreadable", () => {
    test("behaves correctly", () => {
      const iframe = document.createElement('iframe');
      const handler = new DreamsMessageHandler(iframe, 'www.example.com/123', {});
      const spy = jest.spyOn(global.console, 'error');
      const message = "";
      handler.onMessage(message)
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("when message is not of expected type", () => {
    test("behaves correctly", () => {
      const iframe = document.createElement('iframe');
      const handler = new DreamsMessageHandler(iframe, 'www.example.com/123', {});
      const spy = jest.spyOn(global.console, 'warn');
      const message = { data: JSON.stringify({ foo: 'bar' }) };
      handler.onMessage(message)
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when message is of expected type', () => {
    let iframe;;
    let postMessageSpy;
    let onIdTokenDidExpire;
    let onAccountProvisionRequested;
    let onExitRequested;
    let callbacks;

    beforeEach(() => {
      iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      postMessageSpy = jest.spyOn(iframe.contentWindow, 'postMessage');
      onIdTokenDidExpire = jest.fn(() => Promise.resolve("token"));
      onAccountProvisionRequested = jest.fn(() => Promise.resolve());
      onExitRequested = jest.fn(() => Promise.resolve());
      callbacks = { onAccountProvisionRequested, onIdTokenDidExpire, onExitRequested }
    });

    describe("onIdTokenDidExpire", () => {
      test("behaves correctly", async () => {
        const handler = new DreamsMessageHandler(iframe, 'http://www.example.com/123', callbacks);
        const message = buildMessage('onIdTokenDidExpire');

        await handler.onMessage(message);

        expect(onIdTokenDidExpire).toHaveBeenCalled();
        expect(onAccountProvisionRequested).not.toHaveBeenCalled();
        expect(postMessageSpy).toHaveBeenCalled();
      });
    });

    describe("onAccountProvisionRequested", () => {
      test("behaves correctly", async () => {
        const handler = new DreamsMessageHandler(iframe, 'http://www.example.com/123', callbacks);
        const message = buildMessage('onAccountProvisionRequested');

        await handler.onMessage(message);

        expect(onIdTokenDidExpire).not.toHaveBeenCalled();
        expect(postMessageSpy).toHaveBeenCalled();
      });
    });

    describe("onExitRequested", () => {
      test("behaves correctly", async () => {
        const handler = new DreamsMessageHandler(iframe, 'http://www.example.com/123', callbacks);
        const message = buildMessage('onExitRequested');

        await handler.onMessage(message);

        expect(onExitRequested).toHaveBeenCalled();
        expect(onIdTokenDidExpire).not.toHaveBeenCalled();
        expect(postMessageSpy).not.toHaveBeenCalled();
        expect(onIdTokenDidExpire).not.toHaveBeenCalled();
      });
    });
  });
});

describe('#listen', () => {
  test("adds proper event listener", () => {
    const iframe = document.createElement('iframe');
    const handler = new DreamsMessageHandler(iframe, '123', {});
    const spy = jest.spyOn(window, 'addEventListener');

    handler.listen();
    expect(spy).toHaveBeenCalled();
  });
});
