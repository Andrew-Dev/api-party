import React, { Component } from 'react';

class componentName extends Component {
    render() {
        return (
            <div className="coinCell">
                <img src={this.props.metadata.coinImage} />
                <h3>{this.props.metadata.coinFullName}: ${this.props.price}</h3>
            </div>
        );
    }
}

export default componentName;