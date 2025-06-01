import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ROUTES from "./routes/Route"
import { ThemeProvider } from "./components/common/theme-provider"
import { Provider } from "react-redux"
import { store } from "./redux/store"

const router = createBrowserRouter(ROUTES)
function App() {

  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>

    </>
  )
}

export default App
