enum messages {
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

type InvestmentAccountProvisionMessage = Message & {
  accountId: string;
  dreamId: string;
}

type MessageEvent = {
  event: messages;
  message: Message;
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
  message: InvestmentAccountProvisionMessage;
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
  event: 'accountProvisioned';
  message: {
    requestId: string;
  }
}

type InvestmentAccountProvisionInitiatedEvent = {
  event: 'investmentAccountProvisionInitiated';
  message: {
    requestId: string;
    dreamId?: string;
    accountId?: string;
  }
}

type UpdateTokenEvent = {
  event: 'updateToken';
  message: {
    requestId: string;
    idToken: string;
  }
}

type NavigateToEvent = {
  event: 'navigateTo';
  message: {
    location: string;
  }
}

type PartnerEvent = NavigateToEvent |
                    AccountProvisionInitiatedEvent |
                    InvestmentAccountProvisionInitiatedEvent |
                    UpdateTokenEvent;

export default messages;

export {
  IdTokenDidExpireEvent,
  AccountProvisionRequestedEvent,
  InvestmentAccountProvisionRequestedEvent,
  ExitRequestedEvent,
  ShareEvent,
  DreamsEvent,
  MessageEvent,
  Message,
  ShareMessage,
  InvestmentAccountProvisionMessage,
  NavigateToEvent,
  AccountProvisionInitiatedEvent,
  InvestmentAccountProvisionInitiatedEvent,
  UpdateTokenEvent,
  PartnerEvent,
}
