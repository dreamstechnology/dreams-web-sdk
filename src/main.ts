import MessageHandler, { ClientCallbacks } from "./messageHandler";
import { createForm, createIFrame } from './util';

class DreamsSDK {
  apiUrl: string;
  form: HTMLFormElement;
  iframe: HTMLIFrameElement;
  messageHandler: MessageHandler;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  setup(token: string, containerId: string = "dreams-web-sdk-container", locale: string = 'en') {
    const dreamdDiv = document.getElementById(containerId);

    if (!dreamdDiv) throw "can't find dreams web sdk container";

    const tokenInputProps = { type: 'hidden', name: 'token', value: token };
    const localeInputProps = { type: 'hidden', name: 'locale', value: locale };
    const formTargetUrl = `${this.apiUrl}/users/verify_token`;

    this.form = createForm(formTargetUrl, tokenInputProps, localeInputProps);
    this.iframe = createIFrame();

    dreamdDiv.appendChild(this.form);
    dreamdDiv.appendChild(this.iframe);
  }

  start(callbacks: ClientCallbacks, accountProvisionDelay: 3000) {
    if (!this.iframe) throw 'there is no iframe specified!';
    if (!this.form) throw 'there is no form specified!';
    if (!this.apiUrl) throw 'there is no api url specified!';

    this.messageHandler = new MessageHandler(this.iframe, this.apiUrl, callbacks, accountProvisionDelay);

    this.messageHandler.listen();
    this.form.submit();
  }
}

export default DreamsSDK

export {
  MessageHandler,
}
