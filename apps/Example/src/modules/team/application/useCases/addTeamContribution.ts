import { create } from "../../../../shared/core/domain";
import {
  PlayerId,
  PlayerIdSchema,
  TeamId,
  TeamIdSchema
} from "../../../common/domain";
import { IPlayerRepo } from "../../../player/application/spi/playerRepo.spi";
import {
  PlayerPointsAddedEvent
} from "../../../player/domain";
import {
  playerHasNoTeam,
  playerNotFound
} from "../../../player/errors/player.errors";
import {
  addContribution,
  Team,
} from "../../domain";
import { teamNotFound } from "../../errors/team.errors";
import { ITeamRepo } from "../spi/teamRepo.spi";

type Request = PlayerPointsAddedEvent;
type Response = Promise<Team>;

type AddTeamContributionUseCase = (teamRepo: ITeamRepo, playerRepo: IPlayerRepo) =>
  (event: Request) => Response;

export const addTeamContributionUseCase: AddTeamContributionUseCase = (teamRepo, playerRepo) =>
  async ({ id }: Request): Response => {
    const playerId = create<PlayerId>(PlayerIdSchema, id);
    const player = await playerRepo.getById(playerId);
    
    if(!player)
        throw playerNotFound(id);
    if(!player?.teamId)
        throw playerHasNoTeam();
    
    const teamId = create<TeamId>(TeamIdSchema, player?.teamId);
    let team = await teamRepo.getById(teamId);
    console.log({ initialTeam: team });

    if(!team)
        throw teamNotFound(player?.teamId);
    
    team = addContribution(team, player);

    await teamRepo.save(team);
    
    console.log("END ADD TEAM CONTRIBUTIONS", { result: team });
    return team;
};
