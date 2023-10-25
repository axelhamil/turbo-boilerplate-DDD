/**
 * @description
 * Matches exactly two types T and U.
 *
 * @example
 * type A = MatchesExactly<{ a: string }, { a: string }>; // true
 * type B = MatchesExactly<{ a: string }, { a: number }>; // false
 */
export type MatchesExactly<T, U> = T extends U ? (U extends T ? T : never) : never;

// JSDOC create a good description, use toPureDomain() to transofrm to Pure<T> domain object

/**
 * @description
 * A type that is the intersection of T and MatchesExactly<T, T>.
 * Use toPureDomain() to transform to Pure<T> domain object.
 *
 * @example
 * type A = Pure<{ a: string }>; // { a: string }
 */
export type Pure<T> = T & MatchesExactly<T, T>;
