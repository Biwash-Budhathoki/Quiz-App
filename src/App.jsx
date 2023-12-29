import { useState } from 'react'
import Quiz from './Components/Quiz/Quiz'
import Quiz1 from './Components/Quiz/Quiz1'
import HomePage from './Components/HomePage/HomePage'
//import HomePage1 from './Components/HomePage/HomePage1'
import { BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {

  return (
    // <>
    // <Quiz1/>
    //<HomePage/>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz1" element={<Quiz1 />} />
    </Routes>
  </BrowserRouter>
    // </>
  )
}

export default App
