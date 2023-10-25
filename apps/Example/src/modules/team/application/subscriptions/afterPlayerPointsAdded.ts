import { PlayerPointsAddedEvent } from "../../../player/domain";
import { executeAddTeamContributionsUseCase } from "../di/useCases.di";

export const afterPlayerPointsAdded = async (event: PlayerPointsAddedEvent): Promise<void> => {
    console.log("LAUNCH ADD TEAM CONTRIBUTIONS");
    await executeAddTeamContributionsUseCase(event);
};
