import './App.css'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Contact from './Components/Contact/Contact'
import Reservation from './Components/Reservation/Reservation'
import Menu from './Components/Menu/Menu'
import About from './Components/About/About'
import Gallery from './Components/Gallery/Gallery'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login /></div>
  },
  {
    path: '/register',
    element: <div><Register /></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard /></div>
  },
  {
    path: '/contact',
    element: <div><Contact /></div>
  },
  {
    path: '/reservation',
    element: <div><Reservation /></div>
  },
  {
    path: '/about',
    element: <div><About /></div>
  },
  {
    path: '/menu',
    element: <div><Menu /></div>
  },
  {
  path: '/gallery',
   element: <div><Gallery /></div>
   }
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App