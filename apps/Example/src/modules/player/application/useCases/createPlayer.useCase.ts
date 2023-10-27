import { createPlayer, Player, PlayerProps } from "../../domain";
import { IPlayerRepo } from "../spi/playerRepo.spi";

type Request = PlayerProps;
type Response = Player;

type CreatePayerUseCase = (playerRepo: IPlayerRepo) =>
  (dto: Request) => Promise<Response>;

export const createPlayerUseCase: CreatePayerUseCase = (playerRepo) =>
  async (dto) => {
    const player = createPlayer(dto);
    await playerRepo.save(player);
    return player;
};
