import { createDomain, createDomainWithLogic } from "../../../shared/core/domain";
import { domainEvents } from "../../../shared/infrastructure/hook";
import { playerPointsAddedEvent } from "./events/playerPointsAdded.event";
import {
  Player,
  PlayerLogic,
  PlayerProps,
  PlayerWithLogic
} from "./player.domain";
import { validatePlayerDomain } from "./player.validator";

// DOMAIN CREATION
const createPlayer = createDomain<PlayerProps, Player>(validatePlayerDomain);
export const createPlayerWithLogic = createDomainWithLogic<PlayerProps, Player, PlayerLogic>(
  createPlayer,
  getPlayerLogic
);

// BUSINESS LOGIC
function addPointsToPlayer(player: Player, pointsToAdd: number): PlayerWithLogic {
  const newPlayer = createPlayerWithLogic({
    ...player,
    points: player.points + pointsToAdd
  });
  
  domainEvents.registerEvent(newPlayer.id, playerPointsAddedEvent(newPlayer.id));
  console.log("REGISTER EVENT");
  
  return newPlayer;
}

function addTeamToPlayer(player: Player, teamId: string): PlayerWithLogic {
  return createPlayerWithLogic({ ...player, teamId });
}

function getPlayerLogic(player: Player): PlayerLogic {
  return {
    addPoints: (pointsToAdd: number) => addPointsToPlayer(player, pointsToAdd),
    addTeam: (teamId: string) => addTeamToPlayer(player, teamId)
  };
}

