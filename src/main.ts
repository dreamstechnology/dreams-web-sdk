import { MessageHandler, ClientCallbacks } from './messageHandler';
import { createForm, createIFrame, iframeName } from './util';

/**
 * DreamSDK is an utility class responsible for setting up and listening
 * to messages being exchanged between the your context and Dreams iframe.
 *
 * ```typescript
 * const sdk = new DreamsSDK('https://dreams.api.endpoint');
 * sdk.setup(callbacks);
 * sdk.start(jwk_token, locale);
 * ```
 */
export class DreamsSDK {
  apiUrl: string;
  form: HTMLFormElement | undefined;
  iframe: HTMLIFrameElement | undefined;
  messageHandler: MessageHandler | undefined;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  /**
   * @param callbacks as time goes this object might contain more keys than right now. Think about that when writing your code.
   * @param containerId you are free to specify your own value if that's needed. OTherwise leave the default.
   * @param iframeClassName if you want the iframe to have a specific class, you can do it vie this param.
   */
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

  /**
   * @param token  jwk token for the user
   * @param locale this param partly determines which internationalisation will be used. Essentialy what language will be used when displaying texts in the iframe.
   */
  start(token: string, locale: string) {
    if (!this.iframe) throw Error('there is no iframe specified!');
    if (!this.form) throw Error('there is no form specified!');
    if (!this.messageHandler) throw Error('there is no message handler specified!');

    const tokenInput: HTMLInputElement | null = this.form.querySelector("input[name='token']") as HTMLInputElement;

    if (tokenInput) tokenInput.setAttribute('value', token);

    const localeInput: HTMLInputElement = this.form.querySelector("input[name='locale']") as unknown as HTMLInputElement;

    if (localeInput) localeInput.setAttribute('value', locale);

    this.messageHandler.listen();
    this.form.submit();
  }
}

export { MessageHandler };
