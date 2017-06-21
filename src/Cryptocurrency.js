import React, { Component } from 'react';
import './Cryptocurrency.css'

class Cryptocurrency extends Component {

    state = {
        BTCPrice: 0,
        LTCPrice: 0,
        DASHPrice: 0,
    }

    updatePriceForCurrency = (currencyCode) => {
        fetch(`https://chain.so/api/v2/get_price/${currencyCode}/USD`)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                const stateChange = {}
                stateChange[`${currencyCode}Price`] = response.data.prices[0].price
                this.setState(stateChange)
            })
    }

    fetchCurrencyData = () => {
        this.updatePriceForCurrency('BTC')
        this.updatePriceForCurrency('LTC')
        this.updatePriceForCurrency('DASH')
    }

    determineCurrencyType = (address) => {
        if(address[0] == 'X') {
            return 'DASH'
        } else if(address[0] == 'L') {
            return 'LTC'
        } else if(address[0] == '1') {
            return 'BTC'
        } else if(address[0] == 'D') {
            return 'DOGE'
        }
    }

    constructor(props) {
        super(props)
        this.fetchCurrencyData()
    }

    render() {
        return (
            <div className="crypto">
                <h1>Cryptocurrency</h1>
                <h3>Prices</h3>
                <div className="coinPrices">
                    <div className="coinCell">
                        <img src="http://www.canbike.org/public/images/030114/Bitcoin_Logo.png"/>
                        <h3>Bitcoin: ${this.state.BTCPrice}</h3>
                    </div>
                    <div className="coinCell">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Official_Litecoin_Logo.png"/>
                        <h3>Litecoin: ${this.state.LTCPrice}</h3>
                    </div>
                    <div className="coinCell">
                        <img src="https://bravenewcoin.com/assets/Coin-Logos/dash.png"/>
                        <h3>Dash: ${this.state.DASHPrice}</h3>
                    </div>
                </div>
                <h3>Address Lookup</h3>
                <p>Enter an address for Bitcoin, Litecoin, Dogecoin or Dash</p>
                <p>Sample addresses: LZcJVFw5osbujGKeQ7YMWGwK7DwMHQFD6s, 15KYSrudJty2Difq3EsTBkWqdzFKUEHqud</p>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <div>
                        <button type="submit">Look up Wallet Info</button>
                    </div>
                </form>
                <h3>Wallet</h3>
            </div>
        )
    }
}

export default Cryptocurrency