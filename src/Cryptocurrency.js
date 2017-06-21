import React, { Component } from 'react';
import './Cryptocurrency.css'
import CryptoWallet from './CryptoWallet'
import { Route } from 'react-router-dom'
import CryptoPrice from './CryptoPrice'

class Cryptocurrency extends Component {

    state = {
        BTCPrice: 0,
        LTCPrice: 0,
        DASHPrice: 0, 
        ETHPrice: 0,
        DOGEPrice: 0,
        XRPPrice: 0,
        addressValue: '',
    }

    updatePriceForCurrency = (currencyCode) => {
        fetch(`https://api.cryptonator.com/api/ticker/${currencyCode}-usd`)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                const stateChange = {}
                let price = response.ticker.price
                if(currencyCode === 'DOGE') price = price * 1000
                stateChange[`${currencyCode}Price`] = parseFloat(price).toFixed(2)
                this.setState(stateChange)
            })
    }

    fetchCurrencyPriceData = () => {
        this.updatePriceForCurrency('BTC')
        this.updatePriceForCurrency('LTC')
        this.updatePriceForCurrency('DASH')
        this.updatePriceForCurrency('ETH')
        this.updatePriceForCurrency('DOGE')
        this.updatePriceForCurrency('XRP')
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

    determineCurrencyMetadata = (type) => {
        let metadata = {
            code: type,
            coinImage: '',
            coinFullName: '',
        }
        if(type === 'BTC') {
            metadata.coinImage = 'http://www.canbike.org/public/images/030114/Bitcoin_Logo.png'
            metadata.coinFullName = 'Bitcoin'
        } else if(type === 'LTC') {
            metadata.coinImage = 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Official_Litecoin_Logo.png'
            metadata.coinFullName = 'Litecoin'
        } else if(type === 'DASH') {
            metadata.coinImage = 'https://bravenewcoin.com/assets/Coin-Logos/dash.png'
            metadata.coinFullName = 'Dash'
        } else if(type === 'DOGE') {
            metadata.coinImage = 'http://dogecoin.com/imgs/dogecoin-300.png'
            metadata.coinFullName = 'Dogecoin (per 1000)'
        } else if(type === 'ETH') {
            metadata.coinImage = 'https://k60.kn3.net/taringa/3/2/8/3/3/7/Axtron/45C.png'
            metadata.coinFullName = 'Ethereum'
        } else if(type === 'XRP') {
            metadata.coinImage = 'https://ripple.com/wp-content/uploads/2014/10/mark.png'
            metadata.coinFullName = 'Ripple'
        } 

        return metadata
    }

    render() {
        return (
            <div className="crypto">
                <h1>Cryptocurrency</h1>
                <h3>Prices</h3>
                <div className="coinPrices">
                    <CryptoPrice price={this.state.BTCPrice} metadata={this.determineCurrencyMetadata('BTC')} />
                    <CryptoPrice price={this.state.LTCPrice} metadata={this.determineCurrencyMetadata('LTC')} />
                    <CryptoPrice price={this.state.ETHPrice} metadata={this.determineCurrencyMetadata('ETH')} />
                    <CryptoPrice price={this.state.DASHPrice} metadata={this.determineCurrencyMetadata('DASH')} />
                    <CryptoPrice price={this.state.DOGEPrice} metadata={this.determineCurrencyMetadata('DOGE')} />
                    <CryptoPrice price={this.state.XRPPrice} metadata={this.determineCurrencyMetadata('XRP')} />
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