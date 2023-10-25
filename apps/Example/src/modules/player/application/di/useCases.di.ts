import { addPointsUseCase } from "../useCases/addPoints.useCase";
import { createPlayerUseCase } from "../useCases/createPlayer.useCase";
import { executeInMemoryPlayerRepo } from "./repos.di";

export const executeCreatePlayerUseCase = createPlayerUseCase(executeInMemoryPlayerRepo);
export const executeAddPointsUseCase = addPointsUseCase(executeInMemoryPlayerRepo);
