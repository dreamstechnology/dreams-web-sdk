import { MessageHandler } from '../src/messageHandler';

const buildMessage = (event, requestId = '123', messageData: any = undefined) => ({
  data: JSON.stringify({ event, message: { requestId, messageData } }),
});

const callbacks = {
  onExitRequested: async () => {},
};

describe('#constructor', () => {
  test('dreams api endpoint not provided', () => {
    const iframe = document.createElement('iframe');
    const throwable = () => {
      new MessageHandler(iframe, undefined as any as string, callbacks);
    };
    expect(throwable).toThrow();
  });
});

describe('#onMessage', () => {
  describe('when message is unreadable', () => {
    test('behaves correctly', () => {
      const iframe = document.createElement('iframe');
      const handler = new MessageHandler(iframe, 'www.example.com/123', callbacks);
      const spy = jest.spyOn(global.console, 'error');
      const message = '';
      handler.onMessage(message);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when message is not of expected type', () => {
    test('behaves correctly', () => {
      const iframe = document.createElement('iframe');
      const handler = new MessageHandler(iframe, 'www.example.com/123', callbacks);
      const spy = jest.spyOn(global.console, 'warn');
      const message = { data: JSON.stringify({ foo: 'bar' }) };
      handler.onMessage(message);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when message is of expected type', () => {
    let iframe;
    let postMessageSpy;
    let onIdTokenDidExpire;
    let onAccountProvisionRequested;
    let onInvestmentAccountProvisionRequested;
    let onInvestmentSellRequested;
    let onExitRequested;
    let onShare;
    let callbacks;
    let onTransferConsentRequested;
    let onAccountRequested;

    beforeEach(() => {
      iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      postMessageSpy = jest.spyOn(iframe.contentWindow, 'postMessage');
      onIdTokenDidExpire = jest.fn(() => Promise.resolve('token'));
      onAccountProvisionRequested = jest.fn(() => Promise.resolve());
      onInvestmentAccountProvisionRequested = jest.fn(() => Promise.resolve());
      onInvestmentSellRequested = jest.fn(() => Promise.resolve());
      onExitRequested = jest.fn(() => Promise.resolve());
      onShare = jest.fn(() => Promise.resolve());
      onTransferConsentRequested = jest.fn(() => Promise.resolve());
      onAccountRequested = jest.fn(() => Promise.resolve());
      callbacks = {
        onAccountProvisionRequested,
        onIdTokenDidExpire,
        onExitRequested,
        onShare,
        onInvestmentAccountProvisionRequested,
        onInvestmentSellRequested,
        onTransferConsentRequested,
        onAccountRequested,
      };
    });

    describe('onIdTokenDidExpire', () => {
      describe('when callback was passed', () => {
        describe('callback promise resolves', () => {
          test('behaves correctly', async () => {
            const handler = new MessageHandler(iframe, 'http://www.example.com/123', callbacks);
            const message = buildMessage('onIdTokenDidExpire');

            await handler.onMessage(message);

            expect(onIdTokenDidExpire).toHaveBeenCalled();
            expect(onAccountProvisionRequested).not.toHaveBeenCalled();
            expect(postMessageSpy).toHaveBeenCalled();
          });
        });

        describe('callback promise rejects', () => {
          test('behaves correctly', async () => {
            onIdTokenDidExpire = jest.fn(() => Promise.reject('nope!'));
            const handler = new MessageHandler(iframe, 'http://www.example.com/123', {
              ...callbacks,
              onIdTokenDidExpire,
            });
            const message = buildMessage('onIdTokenDidExpire');
            const spy = jest.spyOn(global.console, 'error');

            await handler.onMessage(message);

            expect(onIdTokenDidExpire).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('onIdTokenDidExpire error: ', 'nope!');
          });
        });
      });

      describe('when callback was not passed', () => {
        test('behaves correctly', async () => {
          const handler = new MessageHandler(iframe, 'http://www.example.com/123', {
            ...callbacks,
            onIdTokenDidExpire: undefined,
          });
          const message = buildMessage('onIdTokenDidExpire');

          await handler.onMessage(message);

          expect(onIdTokenDidExpire).not.toHaveBeenCalled();
          expect(onAccountProvisionRequested).not.toHaveBeenCalled();
          expect(postMessageSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('onAccountProvisionRequested', () => {
      describe('callback promise fulfills', () => {
        test('behaves correctly', async () => {
          const handler = new MessageHandler(iframe, 'http://www.example.com/123', callbacks);
          const message = buildMessage('onAccountProvisionRequested');

          await handler.onMessage(message);

          expect(onIdTokenDidExpire).not.toHaveBeenCalled();
          expect(postMessageSpy).toHaveBeenCalled();
        });
      });

      describe('callback promise rejects', () => {
        test('behaves correctly', async () => {
          onAccountProvisionRequested = jest.fn(() => Promise.reject('nope!'));
          const handler = new MessageHandler(iframe, 'http://www.example.com/123', {
            ...callbacks,
            onAccountProvisionRequested,
          });
          const message = buildMessage('onAccountProvisionRequested');
          const spy = jest.spyOn(global.console, 'error');

          await handler.onMessage(message);

          expect(onAccountProvisionRequested).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith('onAccountProvisionRequested error: ', 'nope!');
        });
      });
    });

    describe('onInvestmentAccountProvisionRequested', () => {
      describe('callback promise fulfills', () => {
        test('behaves correctly', async () => {
          const handler = new MessageHandler(iframe, 'http://www.example.com/123', callbacks);
          const message = buildMessage('onInvestmentAccountProvisionRequested');

          await handler.onMessage(message);

          expect(postMessageSpy).toHaveBeenCalled();
        });
      });

      describe('callback promise rejects', () => {
        test('behaves correctly', async () => {
          onInvestmentAccountProvisionRequested = jest.fn(() => Promise.reject('nope!'));
          const handler = new MessageHandler(iframe, 'http://www.example.com/123', {
            ...callbacks,
            onInvestmentAccountProvisionRequested,
          });
          const message = buildMessage('onInvestmentAccountProvisionRequested');
          const spy = jest.spyOn(global.console, 'error');

          await handler.onMessage(message);

          expect(onInvestmentAccountProvisionRequested).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith('onInvestmentAccountProvisionRequested error: ', 'nope!');
        });
      });
    });

    describe('onInvestmentSellRequested', () => {
      describe('callback promise fulfills', () => {
        test('behaves correctly', async () => {
          const handler = new MessageHandler(iframe, 'http://www.example.com/123', callbacks);
          const message = buildMessage('onInvestmentSellRequested');

          await handler.onMessage(message);

          expect(postMessageSpy).not.toHaveBeenCalled();
        });
      });

      describe('callback promise rejects', () => {
        test('behaves correctly', async () => {
          onInvestmentSellRequested = jest.fn(() => Promise.reject('nope!'));
          const handler = new MessageHandler(iframe, 'http://www.example.com/123', {
            ...callbacks,
            onInvestmentSellRequested,
          });
          const message = buildMessage('onInvestmentSellRequested');
          const spy = jest.spyOn(global.console, 'error');

          await handler.onMessage(message);

          expect(onInvestmentSellRequested).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith('onInvestmentSellRequested error: ', 'nope!');
        });
      });
    });

    describe('onExitRequested', () => {
      test('behaves correctly', async () => {
        const handler = new MessageHandler(iframe, 'http://www.example.com/123', callbacks);
        const message = buildMessage('onExitRequested');

        await handler.onMessage(message);

        expect(onExitRequested).toHaveBeenCalled();
        expect(onIdTokenDidExpire).not.toHaveBeenCalled();
        expect(postMessageSpy).not.toHaveBeenCalled();
        expect(onIdTokenDidExpire).not.toHaveBeenCalled();
      });
    });

    describe('onShare', () => {
      test('behaves correctly', async () => {
        const handler = new MessageHandler(iframe, 'http://www.example.com/123', callbacks);
        const message = buildMessage('onShare');

        await handler.onMessage(message);

        expect(onShare).toHaveBeenCalled();
        expect(postMessageSpy).not.toHaveBeenCalled();
      });
    });

    describe('onTransferConsentRequested', () => {
      test('sends onTransferRequestedSucceeds when callback resolves', async () => {
        const consentId = 'foo';
        const consentRef = 'bar';
        const apiUrl = 'http://www.example.com/123';
        onTransferConsentRequested = jest.fn(() => Promise.resolve({ consentId, consentRef }));
        const handler = new MessageHandler(iframe, apiUrl, {
          ...callbacks,
          onTransferConsentRequested,
        });
        const message = buildMessage('onTransferConsentRequested', '123', { consentId, consentRef });

        await handler.onMessage(message);

        expect(onTransferConsentRequested).toHaveBeenCalled();
        expect(postMessageSpy).toHaveBeenCalledWith(
          JSON.stringify({
            event: 'onTransferConsentSucceeded',
            message: {
              consentId: consentId,
              consentRef: consentRef,
            },
          }),
          apiUrl,
        );
      });

      test('sends onTransferRequestedCancelled when callback rejects', async () => {
        const consentId = 'bar';
        const apiUrl = 'http://www.example.com/123';
        onTransferConsentRequested = jest.fn(() => Promise.reject({ consentId }));
        const handler = new MessageHandler(iframe, apiUrl, { onExitRequested, onTransferConsentRequested });
        const message = buildMessage('onTransferConsentRequested');

        await handler.onMessage(message);

        expect(onTransferConsentRequested).toHaveBeenCalled();
        expect(postMessageSpy).toHaveBeenCalledWith(
          JSON.stringify({
            event: 'onTransferConsentCancelled',
            message: {
              consentId: consentId,
            },
          }),
          apiUrl,
        );
      });

      test('does nothing when there is no callback', async () => {
        const consentId = 'bar';
        const apiUrl = 'http://www.example.com/123';
        const handler = new MessageHandler(iframe, apiUrl, { onExitRequested });
        const message = buildMessage('onTransferConsentRequested', '123', consentId);

        await handler.onMessage(message);

        expect(postMessageSpy).not.toHaveBeenCalled();
      });
    });

    describe('onAccountRequested', () => {
      test('behaves correctly', async () => {
        const handler = new MessageHandler(iframe, 'http://www.example.com/123', callbacks);
        const message = buildMessage('onAccountRequested');

        await handler.onMessage(message);

        expect(onAccountRequested).toHaveBeenCalled();
      });

      test('sends onAccountRequestedFailed when callback rejects', async () => {
        const apiUrl = 'http://www.example.com/123';
        onAccountRequested = jest.fn(() => Promise.reject({ reason: 'error' }));
        const handler = new MessageHandler(iframe, apiUrl, { onExitRequested, onAccountRequested });
        const message = buildMessage('onAccountRequested');

        await handler.onMessage(message);

        expect(onAccountRequested).toHaveBeenCalled();
        expect(postMessageSpy).toHaveBeenCalledWith(
          JSON.stringify({
            event: 'onAccountRequestedFailed',
            message: {
              reason: 'error',
            },
          }),
          apiUrl,
        );
      });

      test('sends onAccountRequestedSucceeded when callback fulfills', async () => {
        const apiUrl = 'http://www.example.com/123';
        onAccountRequested = jest.fn(() => Promise.resolve({ message: 'foo' }));
        const handler = new MessageHandler(iframe, apiUrl, { onExitRequested, onAccountRequested });
        const message = buildMessage('onAccountRequested');

        await handler.onMessage(message);

        expect(onAccountRequested).toHaveBeenCalled();
        expect(postMessageSpy).toHaveBeenCalledWith(
          JSON.stringify({
            event: 'onAccountRequestedSucceeded',
            message: {
              message: 'foo',
            },
          }),
          apiUrl,
        );
      });

      test('does nothing when there is no callback', async () => {
        const apiUrl = 'http://www.example.com/123';
        const handler = new MessageHandler(iframe, apiUrl, { onExitRequested });
        const message = buildMessage('onAccountRequested');

        await handler.onMessage(message);

        expect(postMessageSpy).not.toHaveBeenCalled();
      });
    });
  });
});

describe('#listen', () => {
  test('adds proper event listener', () => {
    const iframe = document.createElement('iframe');
    const handler = new MessageHandler(iframe, '123', callbacks);
    const spy = jest.spyOn(window, 'addEventListener');

    handler.listen();
    expect(spy).toHaveBeenCalled();
  });
});

describe('commands', () => {
  let spy: jest.SpyInstance;
  let handler: MessageHandler;

  beforeEach(() => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    handler = new MessageHandler(iframe, 'http://www.example.com/', callbacks);
    spy = jest.spyOn(iframe.contentWindow!, 'postMessage');
  });

  describe('#navigateTo', () => {
    test('posts appropriate message', () => {
      handler.navigateTo('/example-url');
      expect(spy).toHaveBeenCalledWith(
        '{"event":"navigateTo","message":{"location":"/example-url"}}',
        'http://www.example.com/',
      );
    });
  });

  describe('#signOut', () => {
    test('posts appropriate message', () => {
      handler.signOut();
      expect(spy).toHaveBeenCalledWith('{"event":"onSignOutRequested","message":{}}', 'http://www.example.com/');
    });
  });

  describe('#sessionKeepAlive', () => {
    test('posts appropriate message', () => {
      handler.sessionKeepAlive();
      expect(spy).toHaveBeenCalledWith('{"event":"sessionKeepAlive","message":{}}', 'http://www.example.com/');
    });
  });
});
