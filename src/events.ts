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
  event: messages.accountProvisionInitiated;
  message: {
    requestId: string;
  }
}

type InvestmentAccountProvisionInitiatedEvent = {
  event: messages.investmentAccountProvisionInitiated;
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
  event: messages.updateToken;
  message: UpdateTokenMessage
}

type NavigateToEvent = {
  event: messages.navigateTo;
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
  Message,
  ShareMessage,
  InvestmentAccountProvisionMessage,
  UpdateTokenMessage,
  NavigateToEvent,
  AccountProvisionInitiatedEvent,
  InvestmentAccountProvisionInitiatedEvent,
  UpdateTokenEvent,
  PartnerEvent,
}
