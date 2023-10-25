import {
  DomainEvent,
  DomainObject,
  DomainProps
} from "../../../shared/core/domain";

export type PlayerWithLogic = Player & PlayerLogic;

export type Player = DomainObject & {
  readonly teamId: string | null;
  readonly name: string;
  readonly points: number;
  readonly avatar: Avatar;
}

export type PlayerProps = DomainProps & {
  teamId?: string | null;
  name: string;
  points?: number;
  avatar?: Avatar;
}

export type Avatar = AvatarAsset[];

export type AvatarAsset = {
  assetId: string;
  category: string;
  color: string | null;
  type: string;
}

export type PlayerLogic = {
  addPoints: (pointsToAdd: number) => PlayerWithLogic;
  addTeam: (teamId: string) => PlayerWithLogic;
}

export type PlayerPointsAddedEvent = DomainEvent & {
  id: string;
};

