import { z } from "zod";

import {
  PlayerId,
  PlayerIdSchema,
  PointsSchema,
  TeamIdSchema
} from "../../common/domain";

export const TeamCaptainSchema = PlayerIdSchema;
export const TeamNameSchema = z.string().min(1);
export const TeamMembersSchema = z.array(PlayerIdSchema).default([]);
export const ContributorSchema = z.record(z.number()).default({});

export const TeamSchema = z.object({
  id: TeamIdSchema,
  name: TeamNameSchema,
  captain: TeamCaptainSchema,
  members: TeamMembersSchema,
  points: PointsSchema,
  contributions: ContributorSchema,
});

export type TeamName = z.infer<typeof TeamNameSchema>;
export type TeamCaptain = PlayerId;
export type TeamMembers = z.infer<typeof TeamMembersSchema>;
export type Contributor = z.infer<typeof ContributorSchema>;

export type Team = z.infer<typeof TeamSchema>;
export type TeamProps = {
  id?: string | null;
  name: string;
  captain: string;
  members?: string[];
  points?: number;
  contributions?: {
    [id: string]: number;
  }
}
