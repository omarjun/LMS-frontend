import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFoundPage from './Pages/NotFoundPage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from "./Pages/LoginPage"
import CourseList from './Pages/Courses/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Courses/CourseDescription'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element= {<HomePage/>}/>
        <Route path='/about' element= {<AboutUs/>}/>
        <Route path='/signup' element= {<SignUpPage/>}/>
        <Route path='/denied' element= {<Denied/>}/>
        
        <Route path='/contact' element= {<Contact/>}/>


      <Route path='/courses' element = {<CourseList/>}/>
      <Route path='/courses/description' element = {<CourseDescription/>}/>

        <Route path='*' element = {<NotFoundPage/>}/>
       
      </Routes>
    </>
  )
}

export default App
