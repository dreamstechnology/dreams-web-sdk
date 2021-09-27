import messages, { IdTokenDidExpireEvent, AccountProvisionRequestedEvent, ExitRequestedEvent, DreamsEvent } from './events';

export type ClientCallbacks = {
  onIdTokenDidExpire?: Function;
  onAccountProvisionRequested?: Function;
  onExitRequested: Function;
  onShare: Function;
}
class MessageHandler {
  iframe: HTMLIFrameElement;
  apiUrl: string;
  callbacks: ClientCallbacks;

  constructor(iframe: HTMLIFrameElement, apiUrl: string, callbacks: ClientCallbacks, accountProvisionDelay: number = 3000) {
    this.validateParams(apiUrl);
    this.iframe = iframe;
    this.apiUrl = apiUrl;
    this.callbacks = callbacks;
  }

  listen = () => window.addEventListener('message', this.onMessage);

  onMessage = async (message: any) => {
    console.debug("onMessage: ", message);
    const event = this.parseEvent(message);

    if (!event) return;

    switch (event.event) {
      case 'onIdTokenDidExpire':
        if (this.callbacks.onIdTokenDidExpire) {
          this.onIdTokenDidExpire(event);
        }
        break;
      case 'onAccountProvisionRequested':
        if (this.callbacks.onAccountProvisionRequested) {
          this.onAccountProvisionRequested(event);
        }
        break;
      case 'onExitRequested':
        this.callbacks.onExitRequested(event);
        break;
      case 'onShare':
        this.callbacks.onShare(event);
      default:
        console.warn('Unknown event type:', event);
    }
  }

  postUpdateToken = (requestId: string, token: string) => {
    const message = this.buildMessage(messages.updateToken, requestId, token);

    this.postMessage(message);
  }

  postAccountProvisionInitiated = (requestId: string) => {
    const message = this.buildMessage(messages.accountProvisioned, requestId);

    this.postMessage(message);
  }

  navigateTo = (location: string) => {
    const message = { event: messages.navigateTo, message: { location } }

    this.postMessage(message);
  }

  private onIdTokenDidExpire = async (event: IdTokenDidExpireEvent) => {
    try {
      const token: string = await this.callbacks.onIdTokenDidExpire(event);
      this.postUpdateToken(event.message.requestId, token);
    } catch(err) {
      console.error('onIdTokenDidExpire error: ', err);
    }
  }

  private onAccountProvisionRequested = async (event: AccountProvisionRequestedEvent) => {
    try {
      await this.callbacks.onAccountProvisionRequested(event);
      this.postAccountProvisionInitiated(event.message.requestId);
    } catch(err) {
      console.error('onAccountProvisionRequested error: ', err);
    }
  }

  private postMessage = (message: any) => {
    console.debug('postMessage', message);

    this.iframe.contentWindow.postMessage(JSON.stringify(message), this.apiUrl);
  }

  private buildMessage = (event: messages, requestId: string, idToken: string = undefined) => ({
    event, message: { requestId, idToken }
  });

  private parseEvent = (message: any): DreamsEvent | null => {
    try {
      return JSON.parse(message.data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private validateParams = (apiUrl: string) => {
    if (!apiUrl) throw "Invalid parameters: dreamsApiEndpoint must be specified";
  }
}

export default MessageHandler;
