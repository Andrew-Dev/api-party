import React, { Component } from 'react';
import './CryptoWallet.css'

class CryptoWallet extends Component {

    state = {
        currentCurrency: 'LTC',
        currentBalance: 0,
        currentAddress: '',
    }

    constructor(props) {
        super(props)
        this.lookupAddressBalance(props.match.params.address)
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
        alert("Invalid address. Must be either a BTC, LTC, DASH or DOGE address for balance lookup.")
        return null
    }

    lookupAddressBalance = (address) => {
        if(!this.determineCurrencyType(address)) return
        console.log("lookup address")
        fetch(`https://chain.so/api/v2/get_address_balance/${this.determineCurrencyType(address)}/${address}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    currentCurrency: response.data.network,
                    currentBalance: response.data.confirmed_balance,
                    currentAddress: response.data.address,
                })
            })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.location !== this.props.location) {
            this.lookupAddressBalance(nextProps.match.params.address)
        }
    }

    render() {
        return (
            <div className="cryptoWallet">
                <h3>{this.state.currentCurrency} address</h3>
                <h2>{this.state.currentAddress}</h2>
                <h2>Balance: {this.state.currentBalance} {this.state.currentCurrency}</h2>
            </div>
        );
    }
}

export default CryptoWallet;