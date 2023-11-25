import React from "react"
import { useNavigate } from "react-router-dom"

function LoginPage() {
    
    const [formData, setFormData] = React.useState({
        userName:"",
        password: "",
        showPassword: false
    })
    
    const navigate = useNavigate()

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox"? checked : value
            }
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)
        navigate("/home")
        
    }
    
    console.log(formData)
    
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
                            //type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            name="password"
                            value={formData.password}
                            />
                            <input 
                                id="showText"
                                type="checkbox"
                                onChange={handleChange}
                                name="showPassword"
                                checked={formData.showPassword}
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
  
