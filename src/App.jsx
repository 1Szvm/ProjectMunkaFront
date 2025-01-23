import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Header } from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const router=createBrowserRouter([
  {element:<Header/>,
    children:[
      {path:'/',element:<Home />},
      {path:'*',element:<NotFound />},
    ]
  }
],
{
  future: {
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true,
    v7_fetcherPersist: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  }} 
)

function App() {
  return <RouterProvider router={router}   future={{v7_startTransition: true}}/>
}

export default App
