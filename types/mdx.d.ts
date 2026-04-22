/**
 * Augment the .mdx module type to allow named exports from MDX files.
 * The default declaration from @types/mdx only covers the default export
 * (the MDX component). Devlog posts also export `meta`; this declaration
 * makes TypeScript happy with that pattern.
 */
declare module '*.mdx' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const meta: Record<string, any> | undefined
}
