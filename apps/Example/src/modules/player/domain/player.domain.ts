import { z } from "zod";

import { defaultAvatar } from "../../__tests__/mocks";
import { PlayerIdSchema, PointsSchema, TeamIdSchema } from "../../common/domain";

export const AvatarAssetSchema = z.object({
  assetId: z.string(),
  category: z.string(),
  color: z.string().nullable(),
  type: z.string(),
});

export const AvatarSchema = z.array(AvatarAssetSchema).default(defaultAvatar);
export const PlayerNameSchema = z.string().min(1);

export const PlayerSchema = z.object({
  id: PlayerIdSchema,
  teamId: TeamIdSchema,
  name: PlayerNameSchema,
  points: PointsSchema,
  avatar: AvatarSchema,
});

export type Avatar = z.infer<typeof AvatarSchema>;
export type AvatarAsset = z.infer<typeof AvatarAssetSchema>;
export type PlayerName = z.infer<typeof PlayerNameSchema>;

export type Player = z.infer<typeof PlayerSchema>;
export type PlayerProps = {
  id?: string | null;
  teamId?: string | null;
  name: string;
  points?: number;
  avatar?: Avatar;
}

export type PlayerPointsAddedEvent = {
  type: 'PLAYER_POINTS_ADDED';
  dateTimeOccurred: Date;
  id: string;
}
