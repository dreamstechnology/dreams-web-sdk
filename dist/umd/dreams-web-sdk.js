(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DreamsWebSDK = {}));
}(this, (function (exports) { 'use strict';

  var messages;

  (function (messages) {
    messages["accountProvisioned"] = "accountProvisioned";
    messages["updateToken"] = "updateToken";
    messages["navigateTo"] = "navigateTo";
  })(messages || (messages = {}));

  var messages$1 = messages;

  class MessageHandler {
    constructor(iframe, apiUrl, callbacks, accountProvisionDelay = 3000) {
      this.validateParams(apiUrl);
      this.iframe = iframe;
      this.apiUrl = apiUrl;
      this.callbacks = callbacks;
    }

    listen = () => window.addEventListener('message', this.onMessage);
    onMessage = async message => {
      console.debug('onMessage: ', message);
      const event = this.parseEvent(message);
      if (!event) return;

      switch (event.event) {
        case 'onIdTokenDidExpire':
          this.onIdTokenDidExpire(event);
          break;

        case 'onAccountProvisionRequested':
          this.onAccountProvisionRequested(event);
          break;

        case 'onExitRequested':
          await this.callbacks.onExitRequested(event);
          break;

        case 'onShare':
          this.onShare(event);
          break;

        default:
          console.warn('Unknown event type:', event);
      }
    };
    postUpdateToken = (requestId, token) => {
      const message = this.buildMessage(messages$1.updateToken, requestId, token);
      this.postMessage(message);
    };
    postAccountProvisionInitiated = requestId => {
      const message = this.buildMessage(messages$1.accountProvisioned, requestId);
      this.postMessage(message);
    };
    navigateTo = location => {
      const message = {
        event: messages$1.navigateTo,
        message: {
          location
        }
      };
      this.postMessage(message);
    };
    onIdTokenDidExpire = async event => {
      if (!this.callbacks.onIdTokenDidExpire) return;

      try {
        const token = await this.callbacks.onIdTokenDidExpire(event);
        this.postUpdateToken(event.message.requestId, token);
      } catch (err) {
        console.error('onIdTokenDidExpire error: ', err);
      }
    };
    onAccountProvisionRequested = async event => {
      if (!this.callbacks.onAccountProvisionRequested) return;

      try {
        await this.callbacks.onAccountProvisionRequested(event);
        this.postAccountProvisionInitiated(event.message.requestId);
      } catch (err) {
        console.error('onAccountProvisionRequested error: ', err);
      }
    };
    onShare = async event => {
      if (this.callbacks.onShare) await this.callbacks.onShare(event);
    };
    postMessage = message => {
      console.debug('postMessage', message);
      this.iframe.contentWindow.postMessage(JSON.stringify(message), this.apiUrl);
    };
    buildMessage = (event, requestId, idToken = undefined) => ({
      event,
      message: {
        requestId,
        idToken
      }
    });
    parseEvent = message => {
      try {
        return JSON.parse(message.data);
      } catch (error) {
        console.error(error);
        return null;
      }
    };
    validateParams = apiUrl => {
      if (!apiUrl) throw Error('Invalid parameters: dreamsApiEndpoint must be specified');
    };
  }

  const iframeName = 'dreams-web-sdk-iframe';
  const createForm = (endpoint, tokenProps = {
    type: 'hidden',
    name: 'token',
    value: ''
  }, localeProps = {
    type: 'hidden',
    name: 'locale',
    value: 'en'
  }) => {
    const form = document.createElement('form');
    form.setAttribute('target', iframeName);
    form.setAttribute('method', 'POST');
    form.setAttribute('action', endpoint);
    form.setAttribute('class', 'hidden');
    const formInputLocale = document.createElement('input');
    formInputLocale.setAttribute('type', localeProps.type);
    formInputLocale.setAttribute('name', localeProps.name);
    formInputLocale.setAttribute('value', localeProps.value);
    const formInputToken = document.createElement('input');
    formInputToken.setAttribute('type', tokenProps.type);
    formInputToken.setAttribute('name', tokenProps.name);
    formInputToken.setAttribute('value', tokenProps.value);
    form.appendChild(formInputLocale);
    form.appendChild(formInputToken);
    return form;
  };
  const createIFrame = (className = 'dreams-web-sdk-iframe') => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('name', iframeName);
    iframe.setAttribute('class', className);
    return iframe;
  };

  class DreamsSDK {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
    }

    setup(callbacks, containerId = 'dreams-web-sdk-container', iframeClassName = iframeName) {
      if (!this.apiUrl) throw Error('there is no api url specified!');
      const dreamdDiv = document.getElementById(containerId);
      if (!dreamdDiv) throw Error("can't find dreams web sdk container");
      const formTargetUrl = `${this.apiUrl}/users/verify_token`;
      this.form = createForm(formTargetUrl);
      this.iframe = createIFrame(iframeClassName);
      dreamdDiv.appendChild(this.form);
      dreamdDiv.appendChild(this.iframe);
      this.messageHandler = new MessageHandler(this.iframe, this.apiUrl, callbacks);
      return this.messageHandler;
    }

    start(token, locale) {
      if (!this.iframe) throw Error('there is no iframe specified!');
      if (!this.form) throw Error('there is no form specified!');
      if (!this.messageHandler) throw Error('there is no message handler specified!');
      const tokenInput = this.form.querySelector("input[name='token']");
      tokenInput.setAttribute('value', token);
      const localeInput = this.form.querySelector("input[name='locale']");
      localeInput.setAttribute('value', locale);
      this.messageHandler.listen();
      this.form.submit();
    }

  }

  exports.MessageHandler = MessageHandler;
  exports['default'] = DreamsSDK;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
