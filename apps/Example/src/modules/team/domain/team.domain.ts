import { DomainObject, DomainProps } from "../../../shared/core/domain";
import { Player } from "../../player/domain";

export type TeamWithLogic = Team & TeamLogic;

export type Team = DomainObject & {
  readonly name: string;
  readonly captain: string;
  readonly members: string[];
  readonly points: number;
  readonly contributions?: {
    [id: string]: number;
  };
}

export type TeamProps = DomainProps &  {
  name: string;
  captain: string;
  members?: string[];
  points?: number;
  contributions?: {
    [id: string]: number;
  }
}

export type TeamLogic = {
  addMember: (player: Player, teamMax: number) => TeamWithLogic;
  alreadyHasMember: (player: Player) => boolean;
  spacesAvailable: (teamMax: number) => boolean;
  addContribution: (player: Player) => TeamWithLogic;
}
