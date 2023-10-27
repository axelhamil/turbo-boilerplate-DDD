import t from 'io-ts';

import { PositiveNumberCodec } from "../../../shared/core/domain/utils/io";

export const PointsCodec = PositiveNumberCodec;
export type Points = t.TypeOf<typeof PositiveNumberCodec>;
