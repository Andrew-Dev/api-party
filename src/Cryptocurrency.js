import React, { Component } from 'react';

class Cryptocurrency extends Component {

    state = {
        btcPrice: 0,
        ltcPrice: 0,
        dashPrice: 0,
    }

    updatePriceForCurrency = (currencyCode) => {
        fetch(`https://chain.so/api/v2/get_price/${currencyCode}/USD`)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
            })
    }

    fetchCurrencyData = () => {

    }

    constructor(props) {
        super(props)
        this.updatePriceForCurrency('BTC')
    }

    render() {
        return (
            <div>
                <h1>Cryptocurrency</h1>
                <h3>Prices</h3>

                <h3>Address Lookup</h3>
                <h3>Wallet</h3>
            </div>
        )
    }
}

export default Cryptocurrency