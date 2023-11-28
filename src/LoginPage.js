import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
// const { Buffer } = require('node:buffer');

function LoginPage() {

    const API_URL =  "http://localhost:3000"
    
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
    
    // const getBasicAuthHeader = (username, password) => {
    //     const credentials = `${username}:${password}`;
    //     const buf = Buffer.from(credentials)
    //     const base64Credentials = buf.toString('base64'); // Base64 encoding
    //     return `Basic ${base64Credentials}`;
    // }
    
    const getBasicAuthHeader = (username, password) => {
        const credentials = `${username}:${password}`;
        const textEncoder = new TextEncoder()
        const encodedCredentials = textEncoder.encode(credentials)
        const base64Credentials = btoa(String.fromCharCode(...encodedCredentials))// Base64 encoding
        return `Basic ${base64Credentials}`;
    }
    
 
    const fetchData = async () => {
        const url = `${API_URL}/home`

        try {
            const response = await axios.get(url, {
                auth: {
                    username: formData.userName,
                    password: formData.password
                },
            });
            
            if (response.status === 200) {
                navigate("/home")
            } else {
                alert('Invalid credentials')
            }
        } catch (error) {
            console.error('Athentication failed:', error)
        }
        
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetchData()
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
  
