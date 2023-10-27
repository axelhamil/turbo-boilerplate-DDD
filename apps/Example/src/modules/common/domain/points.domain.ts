import { z } from "zod";

export type Points = z.infer<typeof PointsSchema>;
export const PointsSchema = z.number().min(0).default(0);
