enum partnerEvents {
  // It's really unfortunate that we call this event "accountProvisioned",
  // when what we mean is "accountProvisionInitiated". But that's the current
  // name that is being used by the dreams backend
  accountProvisionInitiated = 'accountProvisioned',
  investmentAccountProvisionInitiated = 'investmentAccountProvisionInitiated',
  updateToken = 'updateToken',
  navigateTo = 'navigateTo'
}

type Message = {
  requestId: string;
}

type ShareMessage = Message & {
  url: string;
  text: string;
  title: string;
}

type TokenDidExpireMessage = Message & {
  idToken: string;
}

/**
* AccountId is a shared id of a newly provisioned account. Whenever dreams will make a request to transfer money
* to/from an account it will use this value to refer to that account.
* CallbackUrl is the url that Dream will send so that after choosing investment is done the user can be redirected back
* to appropriate part of the webapp
*/
type InvestmentAccountProvisionRequestedMessage = Message & {
  accountId: string;
  callbackPath: string;
}

type IdTokenDidExpireEvent = {
  event: 'onIdTokenDidExpire';
  message: TokenDidExpireMessage;
}

type AccountProvisionRequestedEvent = {
  event: 'onAccountProvisionRequested';
  message: Message;
}

type InvestmentAccountProvisionRequestedEvent = {
  event: 'onInvestmentAccountProvisionRequested';
  message: InvestmentAccountProvisionRequestedMessage;
}

type ShareEvent = {
  event: 'onShare';
  message: ShareMessage;
};

type ExitRequestedEvent = {
  event: 'onExitRequested';
}

type DreamsEvent = IdTokenDidExpireEvent |
                   AccountProvisionRequestedEvent |
                   InvestmentAccountProvisionRequestedEvent |
                   ExitRequestedEvent |
                   ShareEvent;

type AccountProvisionInitiatedEvent = {
  event: partnerEvents.accountProvisionInitiated;
  message: {
    requestId: string;
  }
}

type InvestmentAccountProvisionInitiatedEvent = {
  event: partnerEvents.investmentAccountProvisionInitiated;
  message: {
    requestId: string;
    accountId: string;
  }
}

type UpdateTokenMessage = {
  requestId: string;
  idToken: string;
}

type UpdateTokenEvent = {
  event: partnerEvents.updateToken;
  message: UpdateTokenMessage
}

type NavigateToEvent = {
  event: partnerEvents.navigateTo;
  message: {
    location: string;
  }
}

type PartnerEvent = NavigateToEvent |
                    AccountProvisionInitiatedEvent |
                    InvestmentAccountProvisionInitiatedEvent |
                    UpdateTokenEvent;

export default partnerEvents;

export {
  IdTokenDidExpireEvent,
  AccountProvisionRequestedEvent,
  InvestmentAccountProvisionRequestedEvent,
  ExitRequestedEvent,
  ShareEvent,
  DreamsEvent,
  Message,
  ShareMessage,
  InvestmentAccountProvisionRequestedMessage,
  UpdateTokenMessage,
  NavigateToEvent,
  AccountProvisionInitiatedEvent,
  InvestmentAccountProvisionInitiatedEvent,
  UpdateTokenEvent,
  PartnerEvent,
}
