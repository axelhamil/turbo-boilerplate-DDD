import { PlayerPointsAddedEvent } from "../player.domain";

export const playerPointsAddedEvent = (playerId: string): PlayerPointsAddedEvent => ({
  type: 'PLAYER_POINTS_ADDED',
  dateTimeOccurred: new Date(),
  id: playerId,
});
