import type {
  DESEvent,
  OnAccountProvisionRequestedEvent,
  OnAccountRequestedEvent,
  OnExitRequestedEvent,
  OnIdTokenDidExpireEvent,
  OnInvestmentAccountProvisionRequestedEvent,
  OnInvestmentSellRequestedEvent,
  OnShareEvent,
  OnTransferConsentRequestedEvent,
} from './des_events';

import type {
  AccountProvisionedEvent,
  AccountProvisionedMessage,
  InvestmentAccountProvisionInitiatedEvent,
  InvestmentAccountProvisionInitiatedMessage,
  OnAccountRequestedFailedEvent,
  OnAccountRequestedFailedMessage,
  OnAccountRequestedSucceededEvent,
  OnAccountRequestedSucceededMessage,
  OnTransferConsentCancelledEvent,
  OnTransferConsentCancelledMessage,
  OnTransferConsentSucceededEvent,
  OnTransferConsentSucceededMessage,
  PartnerEvent,
  UpdateTokenEvent,
  UpdateTokenMessage,
} from './partner_events';

export type ClientCallbacks = {
  onIdTokenDidExpire?: (event: OnIdTokenDidExpireEvent) => Promise<string>;
  onAccountProvisionRequested?: (event: OnAccountProvisionRequestedEvent) => Promise<void>;
  onInvestmentAccountProvisionRequested?: (event: OnInvestmentAccountProvisionRequestedEvent) => Promise<void>;
  onInvestmentSellRequested?: (event: OnInvestmentSellRequestedEvent) => Promise<void>;
  onShare?: (event: OnShareEvent) => Promise<void>;
  onExitRequested: (event: OnExitRequestedEvent) => Promise<void>;
  onTransferConsentRequested?: (event: OnTransferConsentRequestedEvent) => Promise<OnTransferConsentSucceededMessage>;
  onAccountRequested?: (event: OnAccountRequestedEvent) => Promise<OnAccountRequestedSucceededMessage>;
};

export class MessageHandler {
  iframe: HTMLIFrameElement;
  apiUrl: string;
  callbacks: ClientCallbacks;

  constructor(iframe: HTMLIFrameElement, apiUrl: string, callbacks: ClientCallbacks) {
    this.validateParams(apiUrl);
    this.iframe = iframe;
    this.apiUrl = apiUrl;
    this.callbacks = callbacks;
  }

  listen = () => window.addEventListener('message', this.onMessage);

  /*
   * This method handles all possible messages coming from dreams app.
   * For each type of message an appropriate function defined in the callbacks has to be added.
   * Check {@linkcode ClientCallbacks}.
   */
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
      case 'onInvestmentAccountProvisionRequested':
        this.onInvestmentAccountProvisionRequested(event);
        break;
      case 'onInvestmentSellRequested':
        this.onInvestmentSellRequested(event);
        break;
      case 'onExitRequested':
        await this.callbacks.onExitRequested(event);
        break;
      case 'onShare':
        this.onShare(event);
        break;
      case 'onTransferConsentRequested':
        this.onTransferConsentRequested(event);
        break;
      case 'onAccountRequested':
        this.onAccountRequested(event);
        break;
      default:
        console.warn('Unknown event type:', event);
    }
  };

  /**
   * You can use this method if you need to manually update the token.
   */
  postUpdateToken = (message: UpdateTokenMessage) => {
    const event: UpdateTokenEvent = {
      event: 'updateToken',
      message,
    };

    this.postMessage(event);
  };

  /**
   * You can use this method if you need to manually inform the dreams app that account provision has been initiated.
   */
  postAccountProvisionInitiated = (message: AccountProvisionedMessage) => {
    const event: AccountProvisionedEvent = {
      event: 'accountProvisioned',
      message,
    };

    this.postMessage(event);
  };

  /**
   * You can use this method if you need to manually inform the dreams app that investment account provision has been initiated.
   * AccountId is a shared id of a newly provisioned account. Whenever dreams will make a request to transfer money
   * to/from an account it will use this value to refer to that account.
   */
  postInvestmentAccountProvisionInitiated = (message: InvestmentAccountProvisionInitiatedMessage) => {
    const event: InvestmentAccountProvisionInitiatedEvent = {
      event: 'investmentAccountProvisionInitiated',
      message,
    };

    this.postMessage(event);
  };

  private postTransferConsentRequestSucceeded = (message: OnTransferConsentSucceededMessage) => {
    const event: OnTransferConsentSucceededEvent = {
      event: 'onTransferConsentSucceeded',
      message,
    };

    this.postMessage(event);
  };

  private postTransferConsentRequestCancelled = (message: OnTransferConsentCancelledMessage) => {
    const event: OnTransferConsentCancelledEvent = {
      event: 'onTransferConsentCancelled',
      message,
    };

    this.postMessage(event);
  };

  private postAccountRequestFailed = (message: OnAccountRequestedFailedMessage) => {
    const event: OnAccountRequestedFailedEvent = {
      event: 'onAccountRequestedFailed',
      message,
    };

    this.postMessage(event);
  };

  private postAccountRequestSucceeded = (message: OnAccountRequestedSucceededMessage) => {
    const event: OnAccountRequestedSucceededEvent = {
      event: 'onAccountRequestedSucceeded',
      message,
    };

    this.postMessage(event);
  };

  /**
   * @param location the part of the dreams app where you want to take the user to. You have to only pass the path.
   */
  navigateTo = (location: string) => {
    this.postMessage({ event: 'navigateTo', message: { location } });
  };

  /**
   * Sign Out the current user. Once the current cookie-based session has been
   * reset, DES will send back `onExitRequested`.
   */
  signOut = () => {
    this.postMessage({ event: 'onSignOutRequested', message: {} });
  };

  /**
   * Tell DES to keep the session alive for another Partner.session_inactivity_timeout
   */
  sessionKeepAlive = () => {
    this.postMessage({ event: 'sessionKeepAlive', message: {} });
  };

  private onIdTokenDidExpire = async (event: OnIdTokenDidExpireEvent) => {
    if (!this.callbacks.onIdTokenDidExpire) return;

    try {
      const token: string = await this.callbacks.onIdTokenDidExpire(event);
      const msg = { requestId: event.message.requestId, idToken: token };
      this.postUpdateToken(msg);
    } catch (err) {
      console.error('onIdTokenDidExpire error: ', err);
    }
  };

  private onAccountProvisionRequested = async (event: OnAccountProvisionRequestedEvent) => {
    if (!this.callbacks.onAccountProvisionRequested) return;

    try {
      await this.callbacks.onAccountProvisionRequested(event);
      this.postAccountProvisionInitiated(event.message);
    } catch (err) {
      console.error('onAccountProvisionRequested error: ', err);
    }
  };

  private onInvestmentAccountProvisionRequested = async (event: OnInvestmentAccountProvisionRequestedEvent) => {
    if (!this.callbacks.onInvestmentAccountProvisionRequested) return;

    try {
      await this.callbacks.onInvestmentAccountProvisionRequested(event);
      this.postInvestmentAccountProvisionInitiated(event.message);
    } catch (err) {
      console.error('onInvestmentAccountProvisionRequested error: ', err);
    }
  };

  private onInvestmentSellRequested = async (event: OnInvestmentSellRequestedEvent) => {
    if (!this.callbacks.onInvestmentSellRequested) return;

    try {
      await this.callbacks.onInvestmentSellRequested(event);
    } catch (err) {
      console.error('onInvestmentSellRequested error: ', err);
    }
  };

  private onShare = async (event: OnShareEvent) => {
    if (this.callbacks.onShare) await this.callbacks.onShare(event);
  };

  private onTransferConsentRequested = async (event: OnTransferConsentRequestedEvent) => {
    if (!this.callbacks.onTransferConsentRequested) {
      return;
    }
    try {
      const transferConsentData = await this.callbacks.onTransferConsentRequested(event);
      this.postTransferConsentRequestSucceeded(transferConsentData);
    } catch (err) {
      // FIXME: inspect err and map to a proper OnTransferConsentCancelledMessage
      this.postTransferConsentRequestCancelled(err as OnTransferConsentCancelledMessage);
      console.error('onTransferConsentRequested error', err);
    }
  };

  private async onAccountRequested(event: OnAccountRequestedEvent) {
    if (!this.callbacks.onAccountRequested) {
      return;
    }
    try {
      const accountRequestedResult = await this.callbacks.onAccountRequested(event);
      this.postAccountRequestSucceeded(accountRequestedResult);
    } catch (err) {
      // FIXME: inspect err and map to a proper OnAccountRequestedFailedMessage
      this.postAccountRequestFailed(err as OnAccountRequestedFailedMessage);
      console.error('onAccountRequested error: ', err);
    }
  }

  private postMessage = (message: PartnerEvent) => {
    console.debug('postMessage', message);

    if (this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage(JSON.stringify(message), this.apiUrl);
    } else {
      console.error('iframe has no content window!', this.iframe);
    }
  };

  private parseEvent = (message: any): DESEvent | null => {
    try {
      return JSON.parse(message.data);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  private validateParams = (apiUrl: string) => {
    if (!apiUrl) throw Error('Invalid parameters: dreamsApiEndpoint must be specified');
  };
}
