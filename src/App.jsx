import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Futamok } from './pages/Futamok'
import { NotFound } from './pages/NotFound'
import { Auth } from './pages/Auth'
import Profile from './pages/Profile'
import PwReset from './pages/Pwreset'
import Bajnoksagok from './pages/Bajnoksagok'
import Forum from './pages/Forum'
import Adminpage from './pages/Adminpage'


const router=createBrowserRouter([
  {element:<Header/>,
    
    children:[
      {path:'/',element:<Home />},
      {path:'/auth/in',element:<Auth />},
      {path:'/auth/up',element:<Auth />},
      {path:'/futamok',element:<Futamok/>},
      {path:'/profile',element:<Profile/>},
      {path:'*',element:<NotFound />},
      {path:'/pwreset',element:<PwReset/>},
      {path:'/bajnoksagok',element:<Bajnoksagok/>},
      {path:'/forum',element:<Forum/>},
      {path:'/admin',element:<Adminpage/>}
      
    ],
   
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
  return <RouterProvider router={router}  future={{v7_startTransition: true}} /> 
}

export default App
