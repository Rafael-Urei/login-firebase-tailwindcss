import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Register from './pages/register.jsx'
import './styles/global.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Welcome from './pages/welcome.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },

  {
    path: 'register',
    element: <Register/>
  },

  {
    path: 'welcome',
    element: <Welcome/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
