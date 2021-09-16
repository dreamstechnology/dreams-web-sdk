import uris from './uris';
import requests from './requests';
import messages, { IdTokenDidExpireEvent, AccountProvisionRequestedEvent, ExitRequestedEvent, DreamsEvent } from './events';

class DreamsMessageHandler {
  // ACCOUNT_PROVISION_DELAY = 3000

  iframe: HTMLIFrameElement;

  constructor(iframe: HTMLIFrameElement) {
    this.iframe = iframe;
  }

  onMessage(message: any) {
    let event: DreamsEvent;

    try {
      event = JSON.parse(message.data);
    } catch (error) {
      console.warn(error);
      return;
    }

    switch (event.name) {
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

    const token: string = await requests.refreshAccessTokenRequest();
    const message = this.buildMessage(messages.updateToken, event.message.requestId, token)

    this.postMessage(message);
  }

  buildMessage = (event: string, requestId: string, idToken: string = undefined) => ({
    event, message: { requestId, idToken }
  });

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
        const resp = await requests.accountProvisionRequest();
        console.log(resp);
      },
      3000
    );
  }

  async onExitRequested(event: ExitRequestedEvent) {
    console.debug('onExitRequested', event);
    // where to get the exit location uri from?
    window.location.href = uris.dreamApp;
  }

  postMessage(message: any) {
    console.debug('postMessage', message);
    this.iframe.contentWindow.postMessage(JSON.stringify(message), window.DREAMS_APP_ENDPOINT);
  }
}

export default DreamsMessageHandler;
