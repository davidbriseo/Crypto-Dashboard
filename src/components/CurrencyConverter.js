import ExchangeRate from "./ExchangeRate"
import React from "react"
import axios from 'axios'

function CurrencyConverter() {
    const currencies = ["BTC", "ETH", "USD", "MXN","XRP", "LTC", "ADA"]

    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = React.useState("BTC")
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = React.useState("BTC")
    const [amount, setAmount] = React.useState(1)
    const [result, setResult] = React.useState(0)
    const [exchangeData, setExchangeData] = React.useState({
        primaryCurrency: "BTC",
        secondaryCurrency: "BTC",
        exchangeRate: 0
    })


    const optionCurrencies = currencies.map((currency, index) => {
        return(
            <option key={index}>{currency}</option>
        )
    })

    function convert(){

        const options = {
            method: 'GET',
            url: 'http://localhost:8000/convert',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency}
          }
          
          axios.request(options).then(function (response) {
              setResult(response.data*amount)
              setExchangeData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: response.data
              })
              
          }).catch(function (error) {
              console.error(error)
          });
}


    return (
      <div className="currency-converter">
        <h2>Currency Converter</h2>
        <div className="input-box">
            <table>
                <tbody>
                    <tr>
                        <td>Primary Currency:</td>
                        <td>
                            <input
                                type="number"
                                name="currency-amount-1"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                            />
                        </td>
                        <td>
                            <select
                                value={chosenPrimaryCurrency}
                                name="currency-option-1"
                                className="currency-options"
                                onChange={e => setChosenPrimaryCurrency(e.target.value)}
                                >
                                    {optionCurrencies}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Secondary Currency:</td>
                        <td>
                            <input
                                type="number"
                                name="currency-amount-2"
                                value={result}
                                disabled={true}
                            />
                        </td>
                        <td>
                            <select
                                value={chosenSecondaryCurrency}
                                name="currency-option-2"
                                className="currency-options"
                                onChange={e => setChosenSecondaryCurrency(e.target.value)}
                                >
                                    {optionCurrencies}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="convert-button" onClick={convert}>Convert</button>
        </div>
        <ExchangeRate 
            exchangeData={exchangeData}
        />
      </div>
    )
  }
  
  export default CurrencyConverter
  