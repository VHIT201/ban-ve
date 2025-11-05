// Core
import { RouteObject } from 'react-router-dom'

// App
import { ROUTE_PATHS } from '@/constants/paths'

// Main route paths
const { app } = ROUTE_PATHS

// Main routes
const mainRoutes: RouteObject = {
  path: app.path,
  lazy: async () => {
    const { default: Main } = await import('../layout')
    return {
      element: <Main />
    }
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: Home } = await import('../views/home/page')
        return {
          element: <Home />
        }
      }
    },
    {
      path: 'product/:id',
      lazy: async () => {
        const { default: Product } = await import('../views/product/page')
        return {
          element: <Product />
        }
      }
    }
  ]
}

export default mainRoutes
