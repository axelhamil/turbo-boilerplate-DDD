import { MatchesExactly } from "../../../shared/core/app";
import { HookManager } from "../../../shared/infrastructure";
import { mockPlayer } from "../../__tests__/mocks";
import { IPlayerRepo } from "../application/spi/playerRepo.spi";
import { createPlayerWithLogic, Player, PlayerWithLogic } from "../domain";

export const createInMemoryPlayerRepo = (): IPlayerRepo => {
  const players: { [key: string]: Player } = {
    [mockPlayer.id]: mockPlayer,
  };
  
  return {
    getById: async (id: string): Promise<PlayerWithLogic | null> => {
      const player = players[id];
      return Promise.resolve(player ? createPlayerWithLogic(player) : null);
    },
    save: async <T>(player: MatchesExactly<T, Player>): Promise<void> => {
      players[player.id] = player;
      
      console.log("RUN HOOK");
      // I pin this hook here for this example, but use you ORM/ODM to do this
      await HookManager.runAfterHooks('savePlayer', player.id);
      
      return Promise.resolve();
    }
  };
};
