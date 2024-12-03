import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './output.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Auth from './pages/Auth'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import ReadProdects from './pages/ReadProdects'
import Products from './pages/Products'
import CreateProduct from './pages/CreateProduct'
import ProductsDetails from './pages/ProductsDetails'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'
import ProtectedRoute from './pages/ProtectedRoute'

const router=createBrowserRouter([
  {
    path:'/auth',
    element:<Auth/>,
    children:[
      {
        path:'',
        element:<Login/>
      },
      {
        path:'signup',
        element:<SignUp/>
      }
    ]
  },
  {
    path:'/',
    element:<ProtectedRoute/>,
    children:[
      {
        path:'',
        element:<Dashboard/>,
        children:[
          {
            path:'',
            element:<Products/>,
            children:[
              {
                path:'',
                element:<ReadProdects/>
              },{
                path:'create',
                element:<CreateProduct/>
              },
              {
                path:'product/:id',
                element:<ProductsDetails/>
              },{
                path:'favorites',
        element:<Favorites/>
              },{
                
                  path:'orders',
                  element:<Orders/>
                
              }

            ]
          }
        ]
      }
      
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer />
  </StrictMode>,
)
