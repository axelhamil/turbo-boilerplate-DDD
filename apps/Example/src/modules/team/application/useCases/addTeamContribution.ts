import { toPureDomain } from "../../../../shared/core/domain";
import { IPlayerRepo } from "../../../player/application/spi/playerRepo.spi";
import { PlayerPointsAddedEvent } from "../../../player/domain";
import { PlayerError } from "../../../player/errors/player.errors";
import { Team, TeamWithLogic, validateTeamDomain } from "../../domain";
import { TeamError } from "../../errors/team.errors";
import { ITeamRepo } from "../spi/teamRepo.spi";

type Request = PlayerPointsAddedEvent;
type Response = Promise<Team>;

type AddTeamContributionUseCase = (teamRepo: ITeamRepo, playerRepo: IPlayerRepo) =>
  (event: Request) => Response;

export const addTeamContributionUseCase: AddTeamContributionUseCase = (teamRepo, playerRepo) =>
  async (event: Request): Response => {
    const { id } = event;
    
    let team: TeamWithLogic | null = null;
    
    const player = await playerRepo.getById(id);
    
    if(!player)
        throw PlayerError.notFound(id);
    if(!player?.teamId)
        throw PlayerError.playerHasNoTeam();

    team = await teamRepo.getById(player?.teamId);

    if(!team)
        throw TeamError.notFound(player?.teamId);
    
    console.log({ initialTeam: toPureDomain(team, validateTeamDomain) });
    team = team.addContribution(player);
    
    const teamToPersist = toPureDomain(team, validateTeamDomain);
    await teamRepo.save(teamToPersist);
    
    console.log("END ADD TEAM CONTRIBUTIONS");
    
    console.log("teamToPersist:", teamToPersist);
    return team;
};
