import '@tanstack/react-query'

export type MutationMetadata = {
  invalidateQueries?: Array<import('@tanstack/react-query').QueryKey>
}

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: MutationMetadata
  }
}
