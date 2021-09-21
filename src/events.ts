enum messages {
  accountProvisioned = 'accountProvisioned',
  updateToken = 'updateToken'
}

type Message = {
  message: {
    requestId: string;
    idToken?: string;
  }
}

type MessageEvent = Message & {
  event: messages;
}

type IdTokenDidExpireEvent =  Message & {
  event: 'onIdTokenDidExpire';
};

type AccountProvisionRequestedEvent =  Message & {
  event: 'onAccountProvisionRequested';
};

type ExitRequestedEvent = {
  event: 'onExitRequested';
};

type DreamsEvent = IdTokenDidExpireEvent |
                   AccountProvisionRequestedEvent |
                   ExitRequestedEvent;

export default messages;
export {
  IdTokenDidExpireEvent,
  AccountProvisionRequestedEvent,
  ExitRequestedEvent,
  DreamsEvent,
  MessageEvent
}
