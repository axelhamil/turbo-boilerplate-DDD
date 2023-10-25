import { MatchesExactly } from "../../../../shared/core/app";
import { Player, PlayerWithLogic } from "../../domain";

export interface IPlayerRepo {
  getById: (id: string) => Promise<PlayerWithLogic | null>;
  save: <T>(player: MatchesExactly<T, Player>) => Promise<void>;
}
