import { create, registerEvent } from "../../../shared/core/domain";
import { playerPointsAddedEvent } from "./events/playerPointsAdded.event";
import { Player, PlayerProps, PlayerSchema } from "./player.domain";

export const createPlayer = (props: PlayerProps | Player): Player => create<Player>(PlayerSchema, props);

export function addPointsToPlayer(player: Player, pointsToAdd: number): Player {
  const newPlayer = createPlayer({ ...player, points: player.points + pointsToAdd });
  registerEvent(newPlayer.id, playerPointsAddedEvent(newPlayer.id));
  return newPlayer;
}

export function addTeamToPlayer(player: Player, teamId: string): Player {
  return createPlayer({ ...player, teamId });
}

