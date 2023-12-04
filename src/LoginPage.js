import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function LoginPage({handleData, formData, setIsSubmitted, setIsAuth}) {

    // const API_URL =  "http://localhost:8000"
    const API_URL = "http://ec2-18-116-63-216.us-east-2.compute.amazonaws.com:8000"

    
    const navigate = useNavigate()
    
    const [showError, setShowError] = React.useState(false)
    
    const showMessage = {
        display: showError? "block" : "none"
    }

    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        return handleData(name, value, type, checked)
    }

    const changeAuth = () => setIsAuth(true)  
    
    
    const fetchData = (user, pass) => {
        const options = {
            method: 'GET',
            url: `${API_URL}/login`,
            auth: {
                username: user,
                password: pass
            }
        }
        
        axios.request(options).then(function (response) {
            if (response.status === 200) {
                setShowError(false)
                navigate("/")
                changeAuth()
            } else {
                alert('Invalid credentials')
            }
        }).catch(function (error) {
            console.error(error) 
            if(error.toJSON().status === 401){
                setShowError(true)
            }
        });
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)
        setShowError(false)
        fetchData(formData.userName, formData.password)
    }

    function handleClick(){
        return (setIsSubmitted(true))
    }
    
    return (
        <div className="login-page"> 
            <header className="header">
                <p>Crypto Dashboard</p>
            </header>
            <div className="container">

                <div className="container-form">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input className="form-input"
                            type="text"
                            placeholder="Username"
                            onChange={handleChange}
                            name="userName"
                            value = {formData.userName}
                            />
                        <input className="form-input"
                            type={formData.showPassword?"text" : "password"}
                            placeholder="Password"
                            onChange={handleChange}
                            name="password"
                            value={formData.password}
                            />
                        <span style={showMessage} className="error-message">
                            Wrong credentials
                        </span>
                        <input 
                            id="showText"
                            type="checkbox"
                            onChange={handleChange}
                            name="showPassword"
                            checked={formData.showPassword}
                            className="form-checkbox"
                            />
                        <label htmlFor="showText">Show Password</label>
                        
                        <button className="submit-button" onClick={handleClick}>Submit</button>
                    </form>
                </div>
            </div>

      </div>
    )
  }
  
  export default LoginPage
  
