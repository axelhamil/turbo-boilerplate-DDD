import t from "io-ts";

import { defaultAvatar } from "../../__tests__/mocks";
import { PlayerIdCodec, PointsCodec, TeamIdCodec } from "../../common/domain";

export const AvatarAssetSchema = t.type({
  assetId: t.string,
  category: t.string,
  color: t.string,
  type: t.string,
});

export const AvatarSchema = t.array(AvatarAssetSchema).default(defaultAvatar);
export const PlayerNameSchema = t.string.min(1);

export const PlayerSchema = t.type({
  id: PlayerIdCodec,
  teamId: TeamIdCodec,
  name: PlayerNameSchema,
  points: PointsCodec,
  avatar: AvatarSchema,
});

export type Avatar = t.TypeOf<typeof AvatarSchema>;
export type AvatarAsset = t.TypeOf<typeof AvatarAssetSchema>;
export type PlayerName = t.TypeOf<typeof PlayerNameSchema>;

export type Player = t.TypeOf<typeof PlayerSchema>;
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
