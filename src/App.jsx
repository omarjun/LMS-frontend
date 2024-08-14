import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFoundPage from './Pages/NotFoundPage'
import SignUpPage from './Pages/SignUpPage'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element= {<HomePage/>}/>
        <Route path='/about' element= {<AboutUs/>}/>
        <Route path='/signup' element= {<SignUpPage/>}/>
        <Route path='*' element = {<NotFoundPage/>}/>
       
      </Routes>
    </>
  )
}

export default App
