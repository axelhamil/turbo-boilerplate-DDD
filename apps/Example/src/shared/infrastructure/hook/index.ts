import { PlayerPointsAddedEvent } from "../../../modules/player/domain";
import {
  afterPlayerPointsAdded
} from "../../../modules/team/application/subscriptions/afterPlayerPointsAdded";
import { DomainEvents } from "../../core/domain";
import { HookManager } from "../HookManager";

export const domainEvents = new DomainEvents();

(async function initialiseEventsListeners(): Promise<void> {
  domainEvents.subscribe<PlayerPointsAddedEvent>('PLAYER_POINTS_ADDED', async (event) => {
    await afterPlayerPointsAdded(event);
  });
  
  HookManager.addAfterHook('savePlayer', (id: string) => {
    console.log("DISPATCH EVENT");
    domainEvents.dispatch(id);
  });
})();
