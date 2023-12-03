
import Dashboard from './Dashboard'
import LoginPage from './LoginPage'
import PrivateRoutes from './utils/PrivateRoutes'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'


function App() {
  
  function handleData(name, value, type, checked){
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox"? checked : value
      }
    })
  }
  
  const [formData, setFormData] = React.useState({
    userName:"",
    password: "",
    showPassword: false
  })

  const [isAuth, setIsAuth] = React.useState(false)


  const [isSubmitted, setIsSubmitted] = React.useState(false)
  
  console.log(`isAuth: ${isAuth}`)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes 
            formData={formData}
            isSubmitted={isSubmitted}
            isAuth={isAuth}
        />}>
          <Route path="/" element={<Dashboard />}/>
        </Route>
        <Route 
          path="/login" 
          element={<LoginPage
            formData = {formData}
            handleData={handleData}
            setIsSubmitted={setIsSubmitted}
            setIsAuth={setIsAuth}
          />} 
        /> 
      </Routes> 
    </BrowserRouter>
  )
}

export default App