import "./shared/infrastructure";

import {
  executeAddPointsUseCase
} from "./modules/player/application/di/useCases.di";


(async (): Promise<void> => {
  console.log("DEPART");
  const result = await executeAddPointsUseCase({ playerId: "645affce-23c2-4a3b-a0cd-8b0fd4ab448f" });
})();
