import {
  addTeamToPlayer,
  Player
} from "../../../player/domain";
import { Team } from "../team.domain";
import { addContribution, addMember } from "../team.logic";

type AddPlayerToTeamOutput = { team: Team, player: Player };
type AddPlayerToTeam = (player: Player, team: Team, teamMax: number) => AddPlayerToTeamOutput;

export const addPlayerToTeam: AddPlayerToTeam = (player: Player, team: Team, teamMax: number): AddPlayerToTeamOutput => {
  
  team = addMember(team, player, teamMax);
  team = addContribution(team, player);
  
  player = addTeamToPlayer(player, team.id);
  
  return { team, player };
};
