import { MessageHandler, ClientCallbacks } from './messageHandler';
import { createForm, createIFrame, iframeName } from './util';

export class DreamsSDK {
  apiUrl: string;
  form: HTMLFormElement;
  iframe: HTMLIFrameElement;
  messageHandler: MessageHandler;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  setup(
    callbacks: ClientCallbacks,
    containerId: string = 'dreams-web-sdk-container',
    iframeClassName: string = iframeName) {
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

  start(token: string, locale: string) {
    if (!this.iframe) throw Error('there is no iframe specified!');
    if (!this.form) throw Error('there is no form specified!');
    if (!this.messageHandler) throw Error('there is no message handler specified!');

    const tokenInput: HTMLInputElement = this.form.querySelector("input[name='token']");
    tokenInput.setAttribute('value', token);

    const localeInput: HTMLInputElement = this.form.querySelector("input[name='locale']");
    localeInput.setAttribute('value', locale);

    this.messageHandler.listen();
    this.form.submit();
  }
}

export { MessageHandler };
