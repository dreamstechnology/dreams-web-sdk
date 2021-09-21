import messages, { MessageEvent, IdTokenDidExpireEvent, AccountProvisionRequestedEvent, ExitRequestedEvent, DreamsEvent } from './events';

export type ClientCallbacks = {
  onIdTokenDidExpire: Function;
  onAccountProvisionRequested: Function;
  onExitRequested?: Function;
}
class MessageHandler {
  iframe: HTMLIFrameElement;
  dreamsApiEndpoint: string;
  dreamsExitEndpoint: string;
  callbacks: ClientCallbacks;
  accountProvisionDelay: number;

  constructor(
    iframe: HTMLIFrameElement,
    callbacks: ClientCallbacks,
    dreamsApiEndpoint: string,
    dreamsExitEndpoint: string,
    accountProvisionDelay: number = 3000
  ) {
    this.validateParams(callbacks, dreamsApiEndpoint, dreamsExitEndpoint)
    this.iframe = iframe;
    this.dreamsApiEndpoint = dreamsApiEndpoint;
    this.callbacks = callbacks;
    this.dreamsExitEndpoint = dreamsExitEndpoint;
    this.accountProvisionDelay = accountProvisionDelay;
  }

  validateParams(callbacks: ClientCallbacks, dreamsApiEndpoint: string, dreamsExitEndpoint: string) {
    if (!dreamsApiEndpoint) {
      console.error("dreamsApiEndpoint must be specified")
      throw "Invalid parameters passed to the constructor"
    }

    if (!(callbacks.onExitRequested || dreamsExitEndpoint)) {
      console.error("Either onExitRequested or dreamsExitEndpoint must be specified")
      throw "Invalid parameters passed to the constructor"
    }
  }

  async onMessage(message: any) {
    let event: DreamsEvent;

    try {
      event = JSON.parse(message.data);
    } catch (error) {
      console.error("received: ", message);
      console.error(error);
      return;
    }

    switch (event.event) {
      case 'onIdTokenDidExpire':
        this.onIdTokenDidExpire(event);
        break;
      case 'onAccountProvisionRequested':
        this.onAccountProvisionRequested(event);
        break;
      case 'onExitRequested':
        this.onExitRequested(event);
        break;
      default:
        console.warn('unknown event type:', event);
    }
  }

  async onIdTokenDidExpire(event: IdTokenDidExpireEvent) {
    console.debug('onIdTokenDidExpire', event);

    const token: string = await this.callbacks.onIdTokenDidExpire(event);
    const message = this.buildMessage(messages.updateToken, event.message.requestId, token)

    this.postMessage(message);
  }

  async onAccountProvisionRequested(event: AccountProvisionRequestedEvent) {
    console.debug('onAccountProvisionRequested', event);

    // 1. Make dreams-enterprise aware that account provisioning has started
    const message = this.buildMessage(messages.accountProvisioned, event.message.requestId)

    this.postMessage(message);

    // 2. Automatically provision the account
    // NOTE: dreams-enterprise must be aware that account provisioning has started
    // before it accepts the backend call that the account was successfully provisioned.
    // So this is a bit prone to race-conditions, but wait 3 seconds before initiating the backend call.
    setTimeout(
      async () => {
        const resp = await this.callbacks.onAccountProvisionRequested(event);
        console.log(resp);
      },
      this.accountProvisionDelay
    );
  }

  async onExitRequested(event: ExitRequestedEvent) {
    console.debug('onExitRequested', event)

    if (this.callbacks.onExitRequested) {
      this.callbacks.onExitRequested(event);
    } else if (this.dreamsExitEndpoint) {
      window.location.href = this.dreamsExitEndpoint;
    }
  }

  buildMessage = (event: messages, requestId: string, idToken: string = undefined): MessageEvent => ({
    event, message: { requestId, idToken }
  });

  postMessage(message: any) {
    console.debug('postMessage', message);

    this.iframe.contentWindow.postMessage(JSON.stringify(message), this.dreamsApiEndpoint);
  }

  listen() {
    window.addEventListener('message', this.onMessage);
  }
}

export default MessageHandler;
