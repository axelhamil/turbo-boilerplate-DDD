import { MatchesExactly } from "../../../shared/core/app";
import { HookManager } from "../../../shared/infrastructure";
import { mockTeam } from "../../__tests__/mocks";
import { ITeamRepo } from "../application/spi/teamRepo.spi";
import { createTeamWithLogic, Team, TeamWithLogic } from "../domain";

export const createInMemoryTeamRepo = (): ITeamRepo => {
  const teams: { [key: string]: Team } = {
    [mockTeam.id]: mockTeam,
  };

  return {
    getById: async (id: string): Promise<TeamWithLogic | null> => {
      const team = teams[id];
      
      return Promise.resolve(team ? createTeamWithLogic(team) : null);
    },
    save: async <T>(team: MatchesExactly<T, Team>): Promise<void> => {
      teams[team.id] = team;
      
      await HookManager.runAfterHooks('saveTeam', team.id); // I pin this hook here for this example, but use you ORM/ODM to do this

      return Promise.resolve();
    }
  };
};

//
