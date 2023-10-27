import { Player } from "../../domain";

export interface IPlayerRepo {
  getById: (id: string) => Promise<Player | null>;
  save: (player: Player) => Promise<void>;
}
