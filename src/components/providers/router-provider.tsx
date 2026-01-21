import { RouterProvider as TanstackRouterProvider } from "@tanstack/react-router"

import { router } from "@/lib/router"

const RouterProvider = () => {
  return <TanstackRouterProvider router={router} />
}

export { RouterProvider }
