// Core
import { useContext } from 'react'

// Internal
import { DYNAMIC_FILTER_CONTEXT } from './constants'
import { DynamicFilterContextValue } from './types'

export const useDynamicFilterContext = (): DynamicFilterContextValue => {
  const context = useContext(DYNAMIC_FILTER_CONTEXT)

  if (!context) {
    throw new Error('useDynamicFilterContext must be used within DynamicFilter component')
  }

  return context
}
