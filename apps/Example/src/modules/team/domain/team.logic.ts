import { create } from "../../../shared/core/domain";
import { Player } from "../../player/domain";
import { alreadyHasTeam, playerIsNotInTeam } from "../errors/team.errors";
import { addPlayerToTeam } from "./interactions/teamPlayer.interactions";
import { Team, TeamProps, TeamSchema } from "./team.domain";

export const createTeam = (props: TeamProps | Team): Team => create<Team>(TeamSchema, props);

export function alreadyHasMember(team: Team, player: Player): boolean {
  return team.members.includes(player.id);
}

export function addContribution(team: Team, player: Player): Team {
  if (player.teamId !== team.id)
    throw playerIsNotInTeam(player.id);
  
  const newContributions = { ...team.contributions, [player.id]: player.points };
  const newPoints = Object.values(newContributions).reduce((acc, curr) => acc + curr, 0);
  
  return createTeam({
    ...team,
    contributions: newContributions,
    points: newPoints
  });
}

export function addMember(team: Team, player: Player, teamMax: number): Team {
  if(alreadyHasMember(team, player))
    throw alreadyHasTeam();

  const {
    team: newTeam,
    player: newPlayer
  } = addPlayerToTeam(player, team, teamMax);

  return createTeam({
    ...newTeam,
    members: [...newTeam.members, newPlayer.id]
  });
}


