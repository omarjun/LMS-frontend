import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFoundPage from './Pages/NotFoundPage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from "./Pages/LoginPage"
import CourseList from './Pages/Courses/CourseList'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element= {<HomePage/>}/>
        <Route path='/about' element= {<AboutUs/>}/>
        <Route path='/signup' element= {<SignUpPage/>}/>
        <Route path='/login' element= {<LoginPage/>}/>

      <Route path='/courses' element = {<CourseList/>}/>

        <Route path='*' element = {<NotFoundPage/>}/>
       
      </Routes>
    </>
  )
}

export default App
