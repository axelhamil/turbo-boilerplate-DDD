import { runAfterHooks } from "../../../shared/infrastructure";
import { mockPlayer } from "../../__tests__/mocks";
import { IPlayerRepo } from "../application/spi/playerRepo.spi";
import { createPlayer, Player } from "../domain";

export const createInMemoryPlayerRepo = (): IPlayerRepo => {
  const players: { [key: string]: Player } = {
    [mockPlayer.id]: mockPlayer,
  };
  
  return {
    getById: async (id: string): Promise<Player | null> => {
      const player = players[id];
      return Promise.resolve(player ? createPlayer(player) : null);
    },
    save: async (player: Player): Promise<void> => {
      players[player.id] = player;
      
      await runAfterHooks('savePlayer', player.id);
      
      return Promise.resolve();
    }
  };
};
