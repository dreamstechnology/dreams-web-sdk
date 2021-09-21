import DreamsMessageHandler from '../src/messageHandler';
const buildMessage = (event, requestId = '123', idToken = undefined) => ({
  data: JSON.stringify({ event, message: { requestId, idToken } })
});

describe('#constructor', () => {
  test('dreams api endpoint not provided', () => {
    const iframe = document.createElement('iframe');
    const throwable = () => {
      new DreamsMessageHandler(iframe, {}, undefined, '123')
    }
    expect(throwable).toThrow();
  });

  test('dreams exit endpoint and exit callback not provided', () => {
    const iframe = document.createElement('iframe');
    const throwable = () => {
      new DreamsMessageHandler(iframe, {}, '123')
    }
    expect(throwable).toThrow();
  });
});

describe('#onMessage', () => {
  describe("when message is unreadable", () => {
    test("behaves correctly", () => {
      const iframe = document.createElement('iframe');
      const handler = new DreamsMessageHandler(iframe, {}, '123', '123');
      const spy = jest.spyOn(global.console, 'error');
      const message = "";
      handler.onMessage(message)
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("when message is not of expected type", () => {
    test("behaves correctly", () => {
      const iframe = document.createElement('iframe');
      const handler = new DreamsMessageHandler(iframe, {}, '123', '123');
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

    beforeEach(() => {
      iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      postMessageSpy = jest.spyOn(iframe.contentWindow, 'postMessage');
      onIdTokenDidExpire = jest.fn(() => { return Promise.resolve("token") });
      onAccountProvisionRequested = jest.fn();
    });

    describe("onIdTokenDidExpire", () => {
      test("behaves correctly", async () => {
        const handler = new DreamsMessageHandler(iframe, { onAccountProvisionRequested, onIdTokenDidExpire }, '123', '123');
        const message = buildMessage('onIdTokenDidExpire');

        await handler.onMessage(message);

        expect(onIdTokenDidExpire).toHaveBeenCalled();
        expect(onAccountProvisionRequested).not.toHaveBeenCalled();
        expect(postMessageSpy).toHaveBeenCalled();
      });
    });

    describe("onAccountProvisionRequested", () => {
      test("behaves correctly", async () => {
        const handler = new DreamsMessageHandler(iframe, { onAccountProvisionRequested, onIdTokenDidExpire }, '123', '123', 0);
        const message = buildMessage('onAccountProvisionRequested');

        await handler.onMessage(message);

        expect(onIdTokenDidExpire).not.toHaveBeenCalled();
        expect(postMessageSpy).toHaveBeenCalled();
      });
    });

    describe("onExitRequested", () => {
      describe("callback is passed", () => {
        test("behaves correctly", async () => {
          const onExitRequested = jest.fn(() => { return Promise.resolve() });
          const handler = new DreamsMessageHandler(iframe, { onAccountProvisionRequested, onIdTokenDidExpire, onExitRequested }, '123', '123', 0);
          const message = buildMessage('onExitRequested');

          await handler.onMessage(message);

          expect(onExitRequested).toHaveBeenCalled();
          expect(onIdTokenDidExpire).not.toHaveBeenCalled();
          expect(postMessageSpy).not.toHaveBeenCalled();
          expect(onIdTokenDidExpire).not.toHaveBeenCalled();
        });
      });

      describe("no callback is passed", () => {
        test("behaves correctly", async () => {
          const exitUri = 'www.example.com'
          const handler = new DreamsMessageHandler(iframe, { onAccountProvisionRequested, onIdTokenDidExpire }, '123', exitUri, 0);
          const message = buildMessage('onExitRequested');
          delete window.location
          window.location = { href: '' };
          await handler.onMessage(message);

          expect(window.location.href).toBe(exitUri);
          expect(onIdTokenDidExpire).not.toHaveBeenCalled();
          expect(postMessageSpy).not.toHaveBeenCalled();
          expect(onIdTokenDidExpire).not.toHaveBeenCalled();
        });
      });
    });
  });
});

describe('#listen', () => {
  test("adds proper event listener", () => {
    const iframe = document.createElement('iframe');
    const handler = new DreamsMessageHandler(iframe, {}, '123', '123');
    const spy = jest.spyOn(window, 'addEventListener');
    handler.listen();
    expect(spy).toHaveBeenCalled();
  });
})
