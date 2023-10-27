
// export const UniqueIdentifierSchema = z.string().uuid().default(randomUUID());
// export type UniqueIdentifier = z.infer<typeof UniqueIdentifierSchema>;
//
// export function create<T>(schema: z.ZodTypeAny, data: unknown): T | never {
//   const result = schema.safeParse(data);
//   if (!result.success)
//     throw new Error(result.error.errors[0].message);
//   return result.data;
// }



