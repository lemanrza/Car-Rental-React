import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ROUTES from "./routes/Route"
import { ThemeProvider } from "./components/common/theme-provider"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { Toaster } from "sonner"

const router = createBrowserRouter(ROUTES)
function App() {

  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </Provider>

    </>
  )
}

export default App
