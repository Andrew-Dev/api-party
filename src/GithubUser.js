import React, { Component } from 'react';

class GithubUser extends Component {
    constructor(props) {
        super(props)

        this.fetchUserData()
    }

    fetchUserData = () => {
        fetch(`https://api.github.com/users/${this.props.match.params.username}`)
            .then((response) => response.json())
            .then((user) => console.log(user))
    }

    render() {
        return (
            <div>
                <h1>Github User</h1>
            </div>
        )
    }
}

export default GithubUser