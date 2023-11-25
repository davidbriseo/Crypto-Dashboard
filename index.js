//const PORT = 8000

const express = require('express')
const cors = require('cors')
const axios = require('axios');
require('dotenv').config()

const app = express()

app.use(cors())
app.disable('etag');


function isAuth(req, res, next) {
        const auth = req.headers.authorization;

        if(auth === "password"){
                next()
        } else {
                res.status(401)
                res.send("Access forbidden")
        }
}


app.get("/", (req, res) => {
    res.json("hi")
})

app.get("/news", (req, res) => {
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

app.get("/secrets", isAuth, (req, res) => {
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
