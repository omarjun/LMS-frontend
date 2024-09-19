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
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Courses/CreateCourse'
import Profile from './Pages/Users/Profile'
import EditProfile from './Pages/Users/EditProfile'
import Checkout from './Pages/Payment/Checkout'
import ChecktoutSuccess from './Pages/Payment/ChecktoutSuccess'
import CheckoutFail from './Pages/Payment/CheckoutFail'
import DisplayLecture from './Pages/Dashboard/DisplayLecture'
import Addlecture from './Pages/Dashboard/Addlecture'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element= {<HomePage/>}/>
        <Route path='/about' element= {<AboutUs/>}/>
        <Route path='/signup' element= {<SignUpPage/>}/>
        <Route path='/login' element= {<LoginPage/>}/>
        <Route path='/contact' element= {<Contact/>}/>

        <Route path='/denied' element= {<Denied/>}/>
        
      <Route path='/courses' element = {<CourseList/>}/>
      <Route path='/courses/description' element = {<CourseDescription/>}/>

      <Route element ={<RequireAuth allowedRoles={["Admin"]}/>} >
          <Route path='/courses/create' element = {<CreateCourse/>}/>
          <Route path='/courses/addlecture' element = {<Addlecture/>}/>

      </Route>

      <Route element ={<RequireAuth allowedRoles={["Admin", "User"]}/>} >
          <Route path='/users/profile' element = {<Profile/>}/>
          <Route path='/users/editprofile' element = {<EditProfile/>}/>
          <Route path='/checkout' element = {<Checkout/>}/>
          <Route path='/checkout/success' element = {<ChecktoutSuccess/>}/>
          <Route path='/checkout/fail' element = {<CheckoutFail/>}/>
          <Route path='/courses/displaylecture' element = {<DisplayLecture/>}/>

      </Route>

        <Route path='*' element = {<NotFoundPage/>}/>
       
      </Routes>
    </>
  )
}

export default App
