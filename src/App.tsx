import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ROUTES from "./routes/Route"
// import { ThemeProvider } from "./components/common/theme-provider"

const router = createBrowserRouter(ROUTES)
function App() {

  return (
    <>
      {/* <ThemeProvider> */}
      <RouterProvider router={router} />
      {/* </ThemeProvider> */}

    </>
  )
}

export default App
