import { toPureDomain } from "../../../../shared/core/domain";
import {
    createPlayerWithLogic,
    Player,
    PlayerProps,
    validatePlayerDomain
} from "../../domain";
import { IPlayerRepo } from "../spi/playerRepo.spi";

type Request = PlayerProps;
type Response = Player;

type CreatePayerUseCase = (playerRepo: IPlayerRepo) =>
  (dto: Request) => Promise<Response>;

export const createPlayerUseCase: CreatePayerUseCase = (playerRepo) =>
  async (dto) => {
    const player = createPlayerWithLogic(dto);
    
    const playerToPersist = toPureDomain(player, validatePlayerDomain);
  
    await playerRepo.save(playerToPersist);
 
    return playerToPersist;
};
