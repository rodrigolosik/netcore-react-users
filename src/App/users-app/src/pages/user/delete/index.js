import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import './index.css';


class DeleteUser extends Component{
    constructor (props) {
        super(props);

        this.state = {
            user : {},
            redirect : false,
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;

        fetch(`https://localhost:5001/api/User/${id}`)
        .then(data => {
            data.json().then(data => {
                this.setState({user : data})
            })
        })
    }

    render(){
        const {redirect} = this.state;

        if(redirect)
            return <Redirect to="/users"/>
        else {
            return (
                <fieldset>
                    <legend>Delete User</legend>
                    <div className="user-delete">
                        <label>{this.state.user.name}</label>
                        <p>excluir ?</p>
                        <button onClick={this.handleClick}>Remove</button>
                        <Link to={`/users`}>cancel</Link>
                    </div>
                </fieldset>
            )
        }
    }

    handleClick = event => {
        const {id} = this.props.match.params;

        fetch(`https://localhost:5001/api/User/${id}`,
        {
            method: "DELETE",
        })
        .then( data => {
            if(data.ok){
                this.setState({redirect : true})
            }
        })

        event.preventDefault();
    }
}

export default DeleteUser;