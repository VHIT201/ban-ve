// Core
import { ReactNode } from 'react'
import { UseQueryResult } from '@tanstack/react-query'

// Types
export interface Props<T> {
  query: UseQueryResult<T>
  children: (data: T) => ReactNode
  additional?: {
    isFetching?: boolean
    isError?: boolean
    isSuccess?: boolean
    error?: Error | null
  }
  emptyView?: ReactNode
  successView?: ReactNode
  fetchingView?: ReactNode
  forbiddenView?: ReactNode
  errorView?: ReactNode | ((error: Error | null) => ReactNode)
}
