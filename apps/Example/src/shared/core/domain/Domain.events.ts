export type DomainEvent = Record<string, unknown> & {
  type: string;
  dateTimeOccurred: Date;
}

type EventHandler<T extends DomainEvent> = (event: T) => void;

type EventHandlers<T extends DomainEvent = DomainEvent> = {
  [key: string]: EventHandler<T>[];
};

type Events = { [id: string]: DomainEvent[] }

export class DomainEvents {
  public eventHandlers: EventHandlers = {};
  public events: Events = {};
  
  constructor() {
    this.eventHandlers = {};
    this.events = {};
  }
  
  public subscribe<T extends DomainEvent>(eventType: string, listener: EventHandler<T>): void {
    if (!this.eventHandlers[eventType]) {
      this.eventHandlers[eventType] = [];
    }
    this.eventHandlers[eventType].push(listener as EventHandler<DomainEvent>); // Cast is necessary here because of the general EventListeners type
  }
  
  public registerEvent(entityId: string, event: DomainEvent): void {
    if (!this.events[entityId]) {
      this.events[entityId] = [];
    }
    this.events[entityId].push(event);
  }
  
  public dispatch(entityId: string): void {
    const eventsForEntity = this.events[entityId];
    if (eventsForEntity && eventsForEntity.length > 0) {
      for (const event of eventsForEntity) {
        const listeners = this.eventHandlers[event.type] || [];
        for (const listener of listeners) {
          listener(event);
        }
      }
      delete this.events[entityId];
    }
  }
}
