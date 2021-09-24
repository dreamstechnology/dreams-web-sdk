import messages, { IdTokenDidExpireEvent, AccountProvisionRequestedEvent, ExitRequestedEvent, DreamsEvent } from './events';

export type ClientCallbacks = {
  onIdTokenDidExpire: Function;
  onAccountProvisionRequested: Function;
  onExitRequested: Function;
  onShare: Function;
}
class MessageHandler {
  iframe: HTMLIFrameElement;
  apiUrl: string;
  callbacks: ClientCallbacks;
  accountProvisionDelay: number;

  constructor(iframe: HTMLIFrameElement, apiUrl: string, callbacks: ClientCallbacks, accountProvisionDelay: number = 3000) {
    this.validateParams(apiUrl);
    this.iframe = iframe;
    this.apiUrl = apiUrl;
    this.callbacks = callbacks;
    this.accountProvisionDelay = accountProvisionDelay;
  }

  listen = () => window.addEventListener('message', this.onMessage);

  onMessage = async (message: any) => {
    console.debug("onMessage: ", message);
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

  // it's not implemented in des-enterprise. Treat it as something that can change
  navigateTo = (location: string) => {
    const message = { event: messages.navigateTo, message: { location } }

    this.postMessage(message);
  }

  private onIdTokenDidExpire = async (event: IdTokenDidExpireEvent) => {
    const token: string = await this.callbacks.onIdTokenDidExpire(event);

    this.postUpdateToken(event.message.requestId, token);
  }

  private onAccountProvisionRequested = (event: AccountProvisionRequestedEvent) => {
    // 1. Make dreams-enterprise aware that account provisioning has started
    this.postAccountProvisionInitiated(event.message.requestId);

    // 2. Automatically provision the account
    // NOTE: dreams-enterprise must be aware that account provisioning has started
    // before it accepts the backend call that the account was successfully provisioned.
    // So this is a bit prone to race-conditions, but wait 3 seconds before initiating the backend call.
    const callback = async () => {
      const resp = await this.callbacks.onAccountProvisionRequested(event);
      console.debug(resp);
    }

    setTimeout(callback, this.accountProvisionDelay);
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
