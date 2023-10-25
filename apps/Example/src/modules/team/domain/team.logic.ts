import { createDomain, createDomainWithLogic } from "../../../shared/core/domain";
import { Player } from "../../player/domain";
import { TeamError } from "../errors/team.errors";
import { addPlayerToTeam } from "./interactions/teamPlayer.interactions";
import { Team, TeamLogic, TeamProps, TeamWithLogic } from "./team.domain";
import { validateTeamDomain } from "./team.validator";

// DOMAIN CREATION
const createTeam = createDomain<TeamProps, Team>(validateTeamDomain);

export const createTeamWithLogic = createDomainWithLogic<TeamProps, Team, TeamLogic>(
  createTeam,
  getTeamLogic
);

// BUSINESS LOGIC
function alreadyHasMember(team: Team, player: Player): boolean {
  return team.members.includes(player.id);
}

function spacesAvailable(team: Team, teamMax: number): boolean {
  return team.members.length < teamMax;
}

function addContribution(team: Team, player: Player): TeamWithLogic {
  if (player.teamId !== team.id)
    throw TeamError.playerIsNotIsTeam(player.id);
  
  const newContributions = { ...team.contributions, [player.id]: player.points };
  const newPoints = Object.values(newContributions).reduce((acc, curr) => acc + curr, 0);
  
  return createTeamWithLogic({
    ...team,
    contributions: newContributions,
    points: newPoints
  });
}

function addMember(team: Team, player: Player, teamMax: number): TeamWithLogic {
  if(alreadyHasMember(team, player))
    throw TeamError.alreadyHasTeam();

  const { team: newTeam, player: newPlayer } = addPlayerToTeam(player, team, teamMax);

  return createTeamWithLogic({ ...newTeam, members: [...newTeam.members, newPlayer.id] });
}

function getTeamLogic(team: Team): TeamLogic {
  return {
    addContribution: (player: Player) => addContribution(team, player),
    addMember: (player: Player, teamMax: number) => addMember(team, player, teamMax),
    alreadyHasMember: (player: Player) => alreadyHasMember(team, player),
    spacesAvailable: (teamMax: number) => spacesAvailable(team, teamMax)
  };
}



