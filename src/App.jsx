import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MockMateDashboard from './Component/MockMateDashboard'
import CompactMockTest from './Component/CompactMockTest'
import { sampleQuestions } from '../sampleQuestions'
import { ThemeProvider } from './Component/ThemeProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <ThemeProvider>
      <CompactMockTest
        questions={sampleQuestions}
        duration={60}
        userName="Arjun Sharma"
        examTitle="MLT Mock Test - 01"
      />
    </ThemeProvider>
    
    </>
  )
}

export default App
