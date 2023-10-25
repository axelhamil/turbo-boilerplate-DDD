import { z } from "zod";

import { generateNewUuid, ValidationResult } from "../../../shared/core/domain";
import { Team, TeamProps } from "./team.domain";

export const validateTeamDomain = (props: TeamProps | Team): ValidationResult<Team> => {
  
  const schema = z.object({
    id: z.string().uuid().default(generateNewUuid()),
    name: z.string().min(1),
    members: z.array(z.string().uuid()).min(0).default([]),
    captain: z.string().uuid(),
    contributions: z.record(z.number()).default({}),
    points: z.number().min(0).default(0),
  });
  
  const zResult = schema.safeParse(props);
  
  if(zResult.success) {
    return {
      isValid: true,
      value: zResult.data
    };
  } else {
    return {
      isValid: false,
      errors: zResult.error.issues.map(issue => issue.message)
    };
  }
};
