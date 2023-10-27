import {
  UniqueIdentifier,
  UniqueIdentifierCodec
} from "../../../shared/core/domain/utils/io";

export type TeamId = UniqueIdentifier;
export const TeamIdCodec = UniqueIdentifierCodec;

export type PlayerId = UniqueIdentifier;
export const PlayerIdCodec = UniqueIdentifierCodec;
