import React, { Component } from "react";
import { Link } from "react-router-dom";
import './index.css';

export default class User extends Component {
    state = {
        user : {}
    };

    componentDidMount(){
        const {id} = this.props.match.params;

        fetch(`https://localhost:5001/api/User/${id}`)
        .then(user => 
            user.json().then(user => this.setState({user}))
        )
    }

    render() {
        const {user} = this.state;
        return (
            <div className="user-info">
                <h1>{user.name}</h1>
                <h1>{user.email}</h1>
                <Link to={`/users`}>Back</Link>
                <Link to={`/edit`}>Edit</Link>
                <Link to={`/delete`}>Delete</Link>
            </div>
        )
    }
}