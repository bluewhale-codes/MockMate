import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { useDispatch , useSelector } from 'react-redux'
import './App.css'
import MockMateDashboard from './Component/MockMateDashboard'
import CompactMockTest from './Component/CompactMockTest'
import { sampleQuestions } from '../sampleQuestions'
import { ThemeProvider } from './Component/ThemeProvider'
import { getMocktest } from './Store/slice/mocktestSlice'
function App() {
  const [count, setCount] = useState(0)
  const {questions,duration,username,currentQuestion,answers} = useSelector((state)=>state.mocktest);
  const dispatch = useDispatch();
  

  useEffect(()=>{
   dispatch(getMocktest());
  },[])

  return (
    <>
      <ThemeProvider>
      <CompactMockTest
        questions={questions}
        duration={duration}
        userName={username}
        CurrentQuestion={currentQuestion}
        Answers={answers}
        examTitle="MLT Mock Test - 01"
      />
    </ThemeProvider>
    
    </>
  )
}

export default App
