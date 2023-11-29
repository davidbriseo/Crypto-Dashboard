import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function LoginPage() {

    const API_URL =  "http://localhost:8000"
    
    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        userName:"",
        password: "",
        showPassword: false
    })

    const [showError, setShowError] = React.useState(false)
    
    const showMessage = {
        display: showError? "block" : "none"
    }
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox"? checked : value
            }
        })
    }
    
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
            console.log(response)
            if (response.status === 200) {
                setShowError(false)
                navigate("/home")
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
                        
                        <button className="submit-button">Submit</button>
                    </form>
                </div>
            </div>

      </div>
    )
  }
  
  export default LoginPage
  
