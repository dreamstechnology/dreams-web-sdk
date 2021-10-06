import messages, { ShareEvent, IdTokenDidExpireEvent, AccountProvisionRequestedEvent, ExitRequestedEvent, DreamsEvent } from './events';

export type ClientCallbacks = {
  onIdTokenDidExpire?: (event: IdTokenDidExpireEvent) => Promise<any>;
  onAccountProvisionRequested?: (event: AccountProvisionRequestedEvent) => Promise<any>;
  onExitRequested: (event: ExitRequestedEvent) => Promise<any>;
  onShare: (event: ShareEvent) => Promise<any>;
};

export class MessageHandler {
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
    const message = { event: messages.navigateTo, message: { location } };

    this.postMessage(message);
  }

  private onIdTokenDidExpire = async (event: IdTokenDidExpireEvent) => {
    if (!this.callbacks.onIdTokenDidExpire) return;

    try {
      const token: string = await this.callbacks.onIdTokenDidExpire(event);
      this.postUpdateToken(event.message.requestId, token);
    } catch(err) {
      console.error('onIdTokenDidExpire error: ', err);
    }
  }

  private onAccountProvisionRequested = async (event: AccountProvisionRequestedEvent) => {
    if (!this.callbacks.onAccountProvisionRequested) return;

    try {
      await this.callbacks.onAccountProvisionRequested(event);
      this.postAccountProvisionInitiated(event.message.requestId);
    } catch(err) {
      console.error('onAccountProvisionRequested error: ', err);
    }
  }

  private onShare = async (event: ShareEvent) => {
    if (this.callbacks.onShare) await this.callbacks.onShare(event);
  }

  private postMessage = (message: any) => {
    console.debug('postMessage', message);

    this.iframe.contentWindow.postMessage(JSON.stringify(message), this.apiUrl);
  }

  private buildMessage = (event: messages, requestId: string, idToken: string = undefined) => ({
    event, message: { requestId, idToken }
  })

  private parseEvent = (message: any): DreamsEvent | null => {
    try {
      return JSON.parse(message.data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private validateParams = (apiUrl: string) => {
    if (!apiUrl) throw Error('Invalid parameters: dreamsApiEndpoint must be specified');
  }
}
