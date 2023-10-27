export type DomainEvent = Record<string, unknown> & {
  type: string;
  dateTimeOccurred: Date;
};

type EventHandler<T extends DomainEvent> = (event: T) => void;

type EventHandlers<T extends DomainEvent = DomainEvent> = {
  [key: string]: EventHandler<T>[];
};

type Events = { [id: string]: DomainEvent[] };

let events: Events = {};
let eventHandlers: EventHandlers = {};

function withHandlers(subscriber: typeof subscribeWithHandlers) {
  return function<T extends DomainEvent>(eventType: string, listener: EventHandler<T>): void {
    eventHandlers = subscriber(eventHandlers, eventType, listener);
  };
}

function withEvents(register: typeof registerEventWithState) {
  return function(entityId: string, event: DomainEvent): void {
    events = register(events, entityId, event);
  };
}

function withDispatch(dispatcher: typeof dispatchWithState) {
  return function(entityId: string): void {
    events = dispatcher(events, eventHandlers, entityId);
  };
}

function subscribeWithHandlers<T extends DomainEvent>(
    eventHandlers: EventHandlers,
    eventType: string,
    listener: EventHandler<T>
): EventHandlers {
  const updatedHandlers = { ...eventHandlers };
  if (!updatedHandlers[eventType]) {
    updatedHandlers[eventType] = [];
  }
  updatedHandlers[eventType].push(listener as EventHandler<DomainEvent>);
  return updatedHandlers;
}

function registerEventWithState(
    events: Events,
    entityId: string,
    event: DomainEvent
): Events {
  const updatedEvents = { ...events };
  if (!updatedEvents[entityId]) {
    updatedEvents[entityId] = [];
  }
  updatedEvents[entityId].push(event);
  return updatedEvents;
}

function dispatchWithState(
    events: Events,
    eventHandlers: EventHandlers,
    entityId: string
): Events {
  const updatedEvents = { ...events };
  const eventsForEntity = updatedEvents[entityId];
  if (eventsForEntity && eventsForEntity.length > 0) {
    for (const event of eventsForEntity) {
      const listeners = eventHandlers[event.type] || [];
      for (const listener of listeners) {
        listener(event);
      }
    }
    delete updatedEvents[entityId];
  }
  return updatedEvents;
}

export const subscribe = withHandlers(subscribeWithHandlers);
export const registerEvent = withEvents(registerEventWithState);
export const dispatch = withDispatch(dispatchWithState);
