import React, {Component} from "react";
import './index.css';
import {Table, Button, ButtonGroup} from "react-bootstrap";

export default class Main extends Component {
    constructor (props){
        super(props);
        this.state = {
            users : []
        }
    }

    // Após o compomente for inicializado.
    componentDidMount(){
        fetch(`https://localhost:5001/api/User`).then(users => 
            users.json().then( users => 
                this.setState({users}) 
            )
        );
    }

    render() {
        const {users} = this.state;
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user,index) => (
                    
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button href={`/user/${user.id}`} size="sm" >Details</Button>
                                        <Button variant="warning" href={`/user/${user.id}`} size="sm" >Edit</Button>
                                        <Button variant="danger" href={`/user/${user.id}`} size="sm" >Remove</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        
                        ))
                    }
                </tbody>
            </Table>
        )
    }

}