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
import Test4 from './Test4.jsx'
import Test5 from './Test5.jsx'
import MyHome from './SkinstoreComponents/MyHome.jsx'

const router = createBrowserRouter([
    {
      path:"/home",Component:MockMateDashboard
    },
    {
      path:"/mrspa",Component:App
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
    {
      path:"/test4",Component:Test4
    },
    {
      path:"/test5",Component:Test5
    },
    {
      path:"/skinHome",Component:MyHome
    },
    

])





createRoot(document.getElementById('root')).render(
  
   <Provider store={store}>
     <RouterProvider router={router}/>
   </Provider>

)
