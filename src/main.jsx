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
import Test from './Test.jsx'
import Test2 from './Test2.jsx'
import Test3 from './Test3.jsx'

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
    {
      path:"/test",Component:Test
    },
    {
      path:"/test2",Component:Test2
    },
    {
      path:"/test3",Component:Test3
    },
    

])





createRoot(document.getElementById('root')).render(
  
   <Provider store={store}>
     <RouterProvider router={router}/>
   </Provider>

)
