import t from "io-ts";

export const UniqueIdentifierCodec = t.refinement(
  t.string,
  (s): s is string => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(s);
  },
  'UUID'
);

const UUIDWithOptional = t.union([UniqueIdentifierCodec, t.undefined, t.null]);

export type UniqueIdentifier = t.TypeOf<typeof UUIDWithOptional>;

export const PositiveNumberCodec = t.refinement(
  t.number,
  (n): n is number => n >= 0,
  'PositiveNumber'
);
