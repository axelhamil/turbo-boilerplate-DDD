import {
  UniqueIdentifier,
  UniqueIdentifierSchema
} from "../../../shared/core/domain";

export type TeamId = UniqueIdentifier;
export const TeamIdSchema = UniqueIdentifierSchema;

export type PlayerId = UniqueIdentifier;
export const PlayerIdSchema = UniqueIdentifierSchema;
