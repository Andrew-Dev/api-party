import React, { Component } from 'react';
import './Cryptocurrency.css'
import CryptoWallet from './CryptoWallet'
import { Route } from 'react-router-dom'

class Cryptocurrency extends Component {

    state = {
        BTCPrice: 0,
        LTCPrice: 0,
        DASHPrice: 0, 
        addressValue: '',
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

    fetchCurrencyPriceData = () => {
        this.updatePriceForCurrency('BTC')
        this.updatePriceForCurrency('LTC')
        this.updatePriceForCurrency('DASH')
    }

    constructor(props) {
        super(props)
        this.fetchCurrencyPriceData()
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.history.push(`/crypto/${this.state.addressValue}`)
    }

    handleChange = (event) => {
        const addressValue = event.currentTarget.value
        this.setState({ addressValue })
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
                <p>Sample addresses: LZcJVFw5osbujGKeQ7YMWGwK7DwMHQFD6s, DKAPUWTuUKZm1bggsVULo4vaC88n3So9fY</p>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" value={this.state.addressValue} onChange={this.handleChange} />
                    </div>
                    <div>
                        <button type="submit">Look up Wallet Info</button>
                    </div>
                </form>
                <Route exact path='/crypto' render={() => <h3>Please enter an address to look up balance info.</h3>} />
                <Route path='/crypto/:address' component={CryptoWallet} />
            </div>
        )
    }
}

export default Cryptocurrency