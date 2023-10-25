import {
  executeInMemoryPlayerRepo
} from "../../../player/application/di/repos.di";
import { addTeamContributionUseCase } from "../useCases/addTeamContribution";
import { executeInMemoryTeamRepo } from "./repos.di";

export const executeAddTeamContributionsUseCase = addTeamContributionUseCase(executeInMemoryTeamRepo, executeInMemoryPlayerRepo);
