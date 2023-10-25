import { MatchesExactly } from "../../../../shared/core/app";
import { Team, TeamWithLogic } from "../../domain";

export interface ITeamRepo {
  getById: (id: string) => Promise<TeamWithLogic | null>;
  save: <T>(team: MatchesExactly<T, Team>) => Promise<void>;
}
