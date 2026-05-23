import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import MockMateDashboard from './Component/MockMateDashboard.jsx'
import ScoreCard from './Component/ScoreCard.jsx'

const router = createBrowserRouter([
    {
      path:"/home",Component:MockMateDashboard
    },
    {
      path:"/mocktest",Component:App
    },
    {
      path:"/score",Component:ScoreCard
    },
    

])





createRoot(document.getElementById('root')).render(
  
   <Provider store={store}>
     <RouterProvider router={router}/>
   </Provider>

)
