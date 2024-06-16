import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import store from './store.js'
import { Provider } from 'react-redux'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// user components
import SignUp from './screens/userScreen/SignUp.jsx'
import Login from './screens/userScreen/Login.jsx'
import HomeScreen from './screens/userScreen/HomeScreen.jsx'
import Profile from './screens/userScreen/Profile.jsx'
import PrivateRoute from './components/userComponent/PrivateRoute.jsx'

// admin components
import AdminLogin from './screens/adminScreen/AdminLogin.jsx'
import AdminPrivateRoute from './components/adminComponent/AdminPrivateRoute.jsx'
import Admin from './screens/adminScreen/Admin.jsx'
import AdminHome from './screens/adminScreen/AdminHome.jsx'
import AdminDashboard from './screens/adminScreen/AdminDashboard.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '',
    element: <PrivateRoute />,
    children: [
      {
        path: '/profile', 
        element: <Profile />

      },
      {
        path: '/home',
        element: <HomeScreen />
      }
    ]
  },

  // Admin Side
  {
    path: '/admin',
    element: <AdminLogin />
  },
  {
    path: '/admin',
    element: <AdminPrivateRoute><Admin /></AdminPrivateRoute>,
    children: [
      {
        path: 'home',
        element: <AdminHome />
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer autoClose={1000} />
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)