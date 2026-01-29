import { createRouter } from "@tanstack/react-router"

import { routeTree } from "../routeTree.gen"

import { RoutePendingSkeleton } from "@/components/ui/route-pending-skeleton"

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const router = createRouter({
  routeTree,
  defaultPendingComponent: RoutePendingSkeleton,
  defaultPendingMs: 0
})

export { router }
