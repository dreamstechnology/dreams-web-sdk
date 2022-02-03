import partnerEvents, {
  ShareEvent, IdTokenDidExpireEvent, AccountProvisionRequestedEvent, ExitRequestedEvent, DreamsEvent, InvestmentAccountProvisionRequestedEvent,
  InvestmentAccountProvisionMessage, PartnerEvent,
  UpdateTokenEvent,
  NavigateToEvent,
  AccountProvisionInitiatedEvent,
  InvestmentAccountProvisionInitiatedEvent,
  Message,
  UpdateTokenMessage
} from './events';

export type ClientCallbacks = {
  onIdTokenDidExpire?: (event: IdTokenDidExpireEvent) => Promise<any>;
  onAccountProvisionRequested?: (event: AccountProvisionRequestedEvent) => Promise<any>;
  onInvestmentAccountProvisionRequested?: (event: InvestmentAccountProvisionRequestedEvent) => Promise<any>;
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
        this.onInvestmentAccountProvisionRequested(event)
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

  /**
  * You can use this method if you need to manually update the token.
  */
  postUpdateToken = (message: UpdateTokenMessage) => {
    const event: UpdateTokenEvent = {
      name: partnerEvents.updateToken,
      message
    }

    this.postMessage(event);
  }

  /**
  * You can use this method if you need to manually inform the dreams app that account provision has been initiated.
  */
  postAccountProvisionInitiated = (message: Message) => {
    const event: AccountProvisionInitiatedEvent = {
      name: partnerEvents.accountProvisionInitiated,
      message
    }

    this.postMessage(event);
  }

  /**
  * You can use this method if you need to manually inform the dreams app that investment account provision has been initiated.
  * DreamId should match the one received initially with the onInvestmentAccountProvisionRequested event.
  * AccountId is a shared id of a newly provisioned account. Whenever dreams will make a request to transfer money
  * to/from an account it will use this value to refer to that account.
  */
  postInvestmentAccountProvisionInitiated = (message: InvestmentAccountProvisionMessage) => {
    const event: InvestmentAccountProvisionInitiatedEvent = {
      name: partnerEvents.investmentAccountProvisionInitiated,
      message
    }

    this.postMessage(event);
  }

  /**
  * @param location the part of the dreams app where you want to take the user to. You have to only pass the path.
  */
  navigateTo = (location: string) => {
    const event: NavigateToEvent = {
      name: partnerEvents.navigateTo,
      message: { location }
    }

    this.postMessage(event);
  }

  private onIdTokenDidExpire = async (event: IdTokenDidExpireEvent) => {
    if (!this.callbacks.onIdTokenDidExpire) return;

    try {
      const token: string = await this.callbacks.onIdTokenDidExpire(event);
      const msg = { requestId: event.message.requestId, idToken: token };
      this.postUpdateToken(msg);
    } catch(err) {
      console.error('onIdTokenDidExpire error: ', err);
    }
  }

  private onAccountProvisionRequested = async (event: AccountProvisionRequestedEvent) => {
    if (!this.callbacks.onAccountProvisionRequested) return;

    try {
      await this.callbacks.onAccountProvisionRequested(event);
      this.postAccountProvisionInitiated(event.message);
    } catch(err) {
      console.error('onAccountProvisionRequested error: ', err);
    }
  }

  private onInvestmentAccountProvisionRequested = async (event: InvestmentAccountProvisionRequestedEvent) => {
    if (!this.callbacks.onInvestmentAccountProvisionRequested) return;

    try {
      await this.callbacks.onInvestmentAccountProvisionRequested(event);
      this.postInvestmentAccountProvisionInitiated(event.message);
    } catch(err) {
      console.error('onInvestmentAccountProvisionRequested error: ', err);
    }
  }

  private onShare = async (event: ShareEvent) => {
    if (this.callbacks.onShare) await this.callbacks.onShare(event);
  }

  private postMessage = (message: PartnerEvent) => {
    console.debug('postMessage', message);

    if (this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage(JSON.stringify(message), this.apiUrl);
    } else {
      console.error('iframe has no content window!', this.iframe);
    }
  }

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
