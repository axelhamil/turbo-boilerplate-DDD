import { PlayerPointsAddedEvent } from "../../../modules/player/domain";
import {
  afterPlayerPointsAdded
} from "../../../modules/team/application/subscriptions/afterPlayerPointsAdded";
import { dispatch, subscribe } from "../../core/domain";
import { addAfterHook } from "../HookManager";

(async function initialiseEventsListeners(): Promise<void> {
  subscribe<PlayerPointsAddedEvent>('PLAYER_POINTS_ADDED', async (event) => {
    await afterPlayerPointsAdded(event);
  });
  
  addAfterHook('savePlayer', (id: string) => {
    console.log("DISPATCH EVENT");
    dispatch(id);
  });
})();
