/**
 * Utility type such that `OneLess[i] = i - 1`.
 */
type OneLess = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * Type which returns a union of all valid key paths in an object. For example
 * for the following interface:
 *
 * ```
 * interface SomeType {
 *  foo: number;
 *  bar: {
 *    baz: number;
 *    bam: string;
 *  }
 * }
 *
 * type Paths = DeepKeyPaths<SomeType>;
 * ```
 *
 * The type `Paths` will be equivalent to the following:
 *
 * ```
 * type Paths = ['foo'] | ['bar'] | ['bar', 'baz'] | ['bar', 'bam'];
 * ```
 */
export type DeepKeyPaths<T, Depth extends number = 10> = {
  done: string[];
  recurse: {
    [P in keyof T]-?: P extends string
      ? T[P] extends object
        ? [P] | [P, ...DeepKeyPaths<T[P], OneLess[Depth]>]
        : [P]
      : never;
  }[keyof T];
}[Depth extends -1 ? "done" : "recurse"];

/**
 * Type which takes an array of object path segments `P` and returns the value
 * type at that path in the object `T`. For example, given the following
 * interface:
 *
 * ```
 * interface SomeType {
 *  foo: number;
 *  bar: {
 *    baz: number;
 *    bam: string;
 *  }
 * }
 *
 * type Value = DeepIndexType<SomeType, ['bar', 'baz']>;
 * ```
 *
 * The type `Value` will be equivalent to:
 *
 * ```
 * type Value = string;
 * ```
 */
export type DeepIndexType<T, P, Depth extends number = 10> = {
  done: any;
  recurse: P extends [infer K]
    ? K extends keyof T
      ? T[K]
      : never
    : P extends [infer K, ...infer Rest]
    ? K extends keyof T
      ? DeepIndexType<T[K], Rest, OneLess[Depth]>
      : never
    : never;
}[Depth extends -1 ? "done" : "recurse"];
