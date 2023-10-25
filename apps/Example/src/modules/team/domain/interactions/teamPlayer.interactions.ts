import { createPlayerWithLogic, Player } from "../../../player/domain";
import { Team } from "../team.domain";
import { createTeamWithLogic } from "../team.logic";

type AddPlayerToTeamOutput = { team: Team, player: Player };
type AddPlayerToTeam = (player: Player, team: Team, teamMax: number) => AddPlayerToTeamOutput;

export const addPlayerToTeam: AddPlayerToTeam = (player: Player, team: Team, teamMax: number): AddPlayerToTeamOutput => {
  
  const playerWithActions = createPlayerWithLogic(player);
  let teamWithActions = createTeamWithLogic(team);
  
  teamWithActions = teamWithActions.addMember(player, teamMax);
  
  teamWithActions.addContribution(player);
  playerWithActions.addTeam(team.id);
  
  return { team, player };
};
