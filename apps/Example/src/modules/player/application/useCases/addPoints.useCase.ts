import { create } from "../../../../shared/core/domain";
import { PlayerId, PlayerIdSchema } from "../../../common/domain";
import { addPointsToPlayer } from "../../domain";
import {
    Player,
} from "../../domain";
import { playerNotFound } from "../../errors/player.errors";
import { IPlayerRepo } from "../spi/playerRepo.spi";

type Request = { playerId: string };
type Response = Player

type AddPointsUseCase = (playerRepo: IPlayerRepo) =>
  (dto: Request) => Promise<Response>;

export const addPointsUseCase: AddPointsUseCase = (playerRepo) =>
  async (dto) => {
    
    const playerId = create<PlayerId>(PlayerIdSchema, dto.playerId);
    
    let player = await playerRepo.getById(playerId);
    
    if(!player)
        throw playerNotFound(dto.playerId);

    player = addPointsToPlayer(player, 10);
    
    await playerRepo.save(player);
    
    console.log("END USECASE ADD POINTS", { result: player });
    return player;
};
