import { Team } from "../../domain";

export interface ITeamRepo {
  getById: (id: string) => Promise<Team | null>;
  save: (team: Team) => Promise<void>;
}
