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

type InvestmentAccountProvisionRequestedMessage = Message & {
  accountId: string;
  dreamId: string;
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
  name: partnerEvents.accountProvisionInitiated;
  message: {
    requestId: string;
  }
}

type InvestmentAccountProvisionInitiatedEvent = {
  name: partnerEvents.investmentAccountProvisionInitiated;
  message: {
    requestId: string;
    dreamId?: string;
    accountId?: string;
  }
}

type UpdateTokenMessage = {
  requestId: string;
  idToken: string;
}

type UpdateTokenEvent = {
  name: partnerEvents.updateToken;
  message: UpdateTokenMessage
}

type NavigateToEvent = {
  name: partnerEvents.navigateTo;
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
