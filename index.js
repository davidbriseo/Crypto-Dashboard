//const PORT = 8000

const express = require('express')
const cors = require('cors')
const axios = require('axios');
require('dotenv').config()

const app = express()

app.use(cors())
app.disable('etag');

const API_URL =  "http://localhost:3000"

const validCredentials = [
    {username: "user1", password: "pass1"},
    {username: "user2", password: "pass2"},
    {username: "user3", password: "pass3"}
]

const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).send("Unauthorized")
    }

    const base64Credentials = authHeader.split(" ")[1]
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii")
    const [username, password] = credentials.split(":")

    //Check if provided credentials match any valid pair
    const isValidCredentials = validCredentials.some(
        cred => cred.username === username && cred.password === password
    )

    if (isValidCredentials) {
        next()
        // return res.json({ success: true})
    } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
}

// example middleware for Basic Authentication
// function isAuth(req, res, next) {
//         const auth = req.headers.authorization;

//         if(auth === "password"){
//                 next()
//         } else {
//                 res.status(401)
//                 res.send("Access forbidden")
//         }
// }


app.get("/", (req, res) => {
    res.json("hi")
})

// app.post("/login", basicAuth, (req, res) => {
//     return res.json({ success: true})
// })

app.get(`${API_URL}/home`, basicAuth, (req, res) => {
    res.json({success: true, message: "Home Page"})
})

app.get("/news", basicAuth, (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://crypto-news16.p.rapidapi.com/news/coindesk',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
        }
    }
      
    axios.request(options).then(function (response) {
    res.json(response.data)
    }).catch(function (error) {
    console.error(error)
    });
})

app.get("/convert", (req, res) => {
    
    const toCurrency = req.query.to_currency || "USD"
    const fromCurrency = req.query.from_currency || "BTC"

    console.log(fromCurrency, toCurrency)

    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {from_currency: fromCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: toCurrency},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };
      
    axios.request(options).then(function (response) {
        res.json(response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])  
    }).catch(function (error) {
        console.error(error)
    });
})

// example protected Route
app.get("/secrets", (req, res) => {
    const secrets = [
        {
            id: 1,
            name: "secret 1"
        },
        {
            id: 2,
            name: "secret 2"
        }
    ]

    res.json(secrets)
})

app.listen(process.env.REACT_APP_PORT, '0.0.0.0');
