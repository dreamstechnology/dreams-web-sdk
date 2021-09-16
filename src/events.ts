const messages = {
  accountProvisioned: 'accountProvisioned',
  updateToken: 'updateToken'
}

type EventMessage = {
  message: {
    requestId: string;
  }
}

type IdTokenDidExpireEvent =  EventMessage & {
  name: 'onIdTokenDidExpire';
};

type AccountProvisionRequestedEvent =  EventMessage & {
  name: 'onAccountProvisionRequested';
};

type ExitRequestedEvent = {
  name: 'onExitRequested';
};

type DreamsEvent = IdTokenDidExpireEvent |
                   AccountProvisionRequestedEvent |
                   ExitRequestedEvent;

export default messages;
export {
  IdTokenDidExpireEvent,
  AccountProvisionRequestedEvent,
  ExitRequestedEvent,
  DreamsEvent
}
