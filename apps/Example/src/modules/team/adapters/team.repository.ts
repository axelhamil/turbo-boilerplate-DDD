import { runAfterHooks } from "../../../shared/infrastructure";
import { mockTeam } from "../../__tests__/mocks";
import { ITeamRepo } from "../application/spi/teamRepo.spi";
import { createTeam, Team } from "../domain";

export const createInMemoryTeamRepo = (): ITeamRepo => {
  const teams: { [key: string]: Team } = {
    [mockTeam.id]: mockTeam,
  };

  return {
    getById: async (id: string): Promise<Team | null> => {
      const team = teams[id];
      return Promise.resolve(team ? createTeam(team) : null);
    },
    save: async (team: Team): Promise<void> => {
      teams[team.id] = team;
      await runAfterHooks('saveTeam', team.id);
      return Promise.resolve();
    }
  };
};
