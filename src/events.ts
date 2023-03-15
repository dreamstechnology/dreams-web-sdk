enum partnerEvents {
  // It's really unfortunate that we call this event "accountProvisioned",
  // when what we mean is "accountProvisionInitiated". But that's the current
  // name that is being used by the dreams backend
  accountProvisionInitiated = 'accountProvisioned',
  investmentAccountProvisionInitiated = 'investmentAccountProvisionInitiated',
  updateToken = 'updateToken',
  navigateTo = 'navigateTo',
  transferConsentSucceeded = 'onTransferConsentSucceeded',
  transferConsentCancelled = 'onTransferConsentCancelled',
  accountRequestedFailed = 'onAccountRequestedFailed',
  accountRequestedSucceeded = 'onAccountRequestedSucceeded',
}

type Message = {
  requestId: string;
};

type ShareMessage = Message & {
  url: string;
  text: string;
  title: string;
};

type TokenDidExpireMessage = Message & {
  idToken: string;
};

type TransferConsentRequestedMessage = Message & {
  consentId: string;
  consentRef: string;
};

type TransferConsentRequestSucceededMessage = Message & {
  consentId: string;
  consentRef: string;
};

type TransferConsentRequestCancelledMessage = Message & {
  consentId: string;
  reason?: string;
};

type AccountRequestedMessage = Message & {
  dream: {
    type: 'dream';
    id: string;
    name: string;
    target_amount: {
      cents: number;
      currency: string;
    };
    target_date: string;
    user: {
      type: 'user';
      id: string;
      externalId: string;
    };
  };
  successURL: string;
  cancelURL: string;
  errorURL: string;
};

type AccountRequestedFailedMessage = Message;
type AccountRequestedSucceededMessage = Message;

/**
 * AccountId is a shared id of a newly provisioned account. Whenever dreams will make a request to transfer money
 * to/from an account it will use this value to refer to that account.
 * CallbackUrl is the url that Dream will send so that after choosing investment is done the user can be redirected back
 * to appropriate part of the webapp
 */
type InvestmentAccountProvisionRequestedMessage = Message & {
  accountId: string;
  callbackPath: string;
  cancelUrl: string;
  errorUrl: string;
};

type Money = {
  quantity: number;
  currency: string;
};

type InvestmentSellRequestedMessage = Message & {
  amount: Money;
  accountId: string;
  callbackUrl: string;
  cancelUrl: string;
  errorUrl: string;
};

type IdTokenDidExpireEvent = {
  event: 'onIdTokenDidExpire';
  message: TokenDidExpireMessage;
};

type AccountProvisionRequestedEvent = {
  event: 'onAccountProvisionRequested';
  message: Message;
};

type InvestmentAccountProvisionRequestedEvent = {
  event: 'onInvestmentAccountProvisionRequested';
  message: InvestmentAccountProvisionRequestedMessage;
};

type InvestmentSellRequestedEvent = {
  event: 'onInvestmentSellRequested';
  message: InvestmentSellRequestedMessage;
};

type ShareEvent = {
  event: 'onShare';
  message: ShareMessage;
};

type ExitRequestedEvent = {
  event: 'onExitRequested';
};

type TransferConsentRequestedEvent = {
  event: 'onTransferConsentRequested';
  message: TransferConsentRequestedMessage;
};

type AccountRequestedEvent = {
  event: 'onAccountRequested';
  message: AccountRequestedMessage;
};

type DreamsEvent =
  | IdTokenDidExpireEvent
  | AccountProvisionRequestedEvent
  | InvestmentAccountProvisionRequestedEvent
  | InvestmentSellRequestedEvent
  | ExitRequestedEvent
  | ShareEvent
  | TransferConsentRequestedEvent
  | AccountRequestedEvent;

type AccountProvisionInitiatedEvent = {
  event: partnerEvents.accountProvisionInitiated;
  message: {
    requestId: string;
  };
};

type InvestmentAccountProvisionInitiatedEvent = {
  event: partnerEvents.investmentAccountProvisionInitiated;
  message: {
    requestId: string;
    accountId: string;
  };
};

type UpdateTokenMessage = {
  requestId: string;
  idToken: string;
};

type UpdateTokenEvent = {
  event: partnerEvents.updateToken;
  message: UpdateTokenMessage;
};

type NavigateToEvent = {
  event: partnerEvents.navigateTo;
  message: {
    location: string;
  };
};

type TransferConsentRequestSucceededEvent = {
  event: partnerEvents.transferConsentSucceeded;
  message: {
    consentId: string;
    consentRef: string;
  };
};

type TransferConsentRequestCancelledEvent = {
  event: partnerEvents.transferConsentCancelled;
  message: {
    consentId: string;
  };
};

type AccountRequestedFailedEvent = {
  event: partnerEvents.accountRequestedFailed;
  message: AccountRequestedFailedMessage;
};

type AccountRequestedSucceededEvent = {
  event: partnerEvents.accountRequestedSucceeded;
  message: AccountRequestedSucceededMessage;
};

type PartnerEvent =
  | NavigateToEvent
  | AccountProvisionInitiatedEvent
  | InvestmentAccountProvisionInitiatedEvent
  | UpdateTokenEvent
  | TransferConsentRequestSucceededEvent
  | TransferConsentRequestCancelledEvent
  | AccountRequestedFailedEvent
  | AccountRequestedSucceededEvent;

export default partnerEvents;

export {
  IdTokenDidExpireEvent,
  AccountProvisionRequestedEvent,
  InvestmentAccountProvisionRequestedEvent,
  InvestmentSellRequestedEvent,
  ExitRequestedEvent,
  ShareEvent,
  DreamsEvent,
  Message,
  ShareMessage,
  InvestmentAccountProvisionRequestedMessage,
  InvestmentSellRequestedMessage,
  UpdateTokenMessage,
  NavigateToEvent,
  AccountProvisionInitiatedEvent,
  InvestmentAccountProvisionInitiatedEvent,
  UpdateTokenEvent,
  PartnerEvent,
  Money,
  TransferConsentRequestedEvent,
  TransferConsentRequestedMessage,
  TransferConsentRequestSucceededEvent,
  TransferConsentRequestCancelledEvent,
  TransferConsentRequestCancelledMessage,
  TransferConsentRequestSucceededMessage,
  AccountRequestedEvent,
  AccountRequestedFailedMessage,
  AccountRequestedFailedEvent,
  AccountRequestedSucceededMessage,
  AccountRequestedSucceededEvent,
};
