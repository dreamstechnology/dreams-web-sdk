enum messages {
  // It's really unfortunate that we call this event "accountProvisioned",
  // when what we mean is "accountProvisionInitiated". But that's the current
  // name that is being used by the dreams backend
  accountProvisioned = 'accountProvisioned',
  updateToken = 'updateToken',
  navigateTo = 'navigateTo'
}

type Message = {
  message: {
    requestId: string;
    idToken?: string;
  };
}

type ShareMessage = {
  message: {
    url: string;
    text: string;
    title: string;
  };
}

type MessageEvent = Message & {
  event: messages;
}

type IdTokenDidExpireEvent =  Message & {
  event: 'onIdTokenDidExpire';
}

type AccountProvisionRequestedEvent =  Message & {
  event: 'onAccountProvisionRequested';
}

type ShareEvent = ShareMessage & {
  event: 'onShare';
};

type ExitRequestedEvent = {
  event: 'onExitRequested';
}

type DreamsEvent = IdTokenDidExpireEvent |
                   AccountProvisionRequestedEvent |
                   ExitRequestedEvent |
                   ShareEvent;

export default messages;
export {
  IdTokenDidExpireEvent,
  AccountProvisionRequestedEvent,
  ExitRequestedEvent,
  ShareEvent,
  DreamsEvent,
  MessageEvent,
}
