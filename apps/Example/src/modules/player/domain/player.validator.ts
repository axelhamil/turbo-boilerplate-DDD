
import { z } from "zod";

import { ValidationResult } from "../../../shared/core/domain";
import { defaultAvatar } from "../../__tests__/mocks";
import { Player, PlayerProps } from "./player.domain";

export const PlayerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  points: z.number().min(0).default(0),
  avatar: z.array(z.object({
    assetId: z.union([z.string().cuid(), z.string().uuid()]),
    category: z.string().min(1),
    color: z.string().nullable().default(null),
    type: z.string().min(1),
  })).default(defaultAvatar),
  teamId: z.string().uuid().nullable().default(null),
});

export const validatePlayerDomain = (props: PlayerProps | Player): ValidationResult<Player> => {
  
  const zResult = PlayerSchema.safeParse(props);
  
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


