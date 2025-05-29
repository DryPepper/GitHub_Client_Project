import { RootRoute, Router } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import AppLayout from 'app/AppLayout'
import { notFoundRoute, routes } from './routes'

export const rootRoute = new RootRoute({
  component: () => (
    <>
      <AppLayout />
      {process.env.NODE_ENV !== 'production' && <TanStackRouterDevtools />}
    </>
  )
})

const routeTree = rootRoute.addChildren(routes)

export const router = new Router({ routeTree, notFoundRoute, basepath: '/' })
