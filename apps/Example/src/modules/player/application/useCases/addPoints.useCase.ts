import { toPureDomain } from "../../../../shared/core/domain";
import { Player, validatePlayerDomain } from "../../domain";
import { PlayerError } from "../../errors/player.errors";
import { IPlayerRepo } from "../spi/playerRepo.spi";

type Request = { playerId: string };
type Response = Player

type AddPointsUseCase = (playerRepo: IPlayerRepo) =>
  (dto: Request) => Promise<Response>;

export const addPointsUseCase: AddPointsUseCase = (playerRepo) =>
  async (dto) => {
    let player = await playerRepo.getById(dto.playerId);
    
    // @ts-ignore
    console.log("ICICICICI", player?.validatename(0) as any);
    
    if(!player)
      throw PlayerError.notFound(dto.playerId);
      
    console.log("ADD POINTS");
    player = player.addPoints(100);
    
    const playerToPersist = toPureDomain(player, validatePlayerDomain);
    
    console.log("SAVE PLAYER");
    await playerRepo.save(playerToPersist);
    
    return playerToPersist;
};
