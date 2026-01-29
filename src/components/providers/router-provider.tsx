import { RouterProvider as TanstackRouterProvider } from "@tanstack/react-router"

import { router } from "@/libs/router"

const RouterProvider = () => {
  return <TanstackRouterProvider router={router} />
}

export { RouterProvider }
