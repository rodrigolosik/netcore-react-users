import React, {Component} from "react";
import './index.css';
import {Table, Button, ButtonGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

export default class Main extends Component {
    constructor (props){
        super(props);
        this.state = {
            users : [],
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
                                        
                                        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={this.renderEditTooltip}>
                                            <Button variant="warning" href={`/edit/${user.id}`} size="sm" tool >
                                                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={this.renderRemoveTooltip}>
                                        <Button variant="danger" onClick={ () => this.clickRemove(user.id)} size="sm" >
                                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                        </Button>
                                        </OverlayTrigger>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )
    }

    renderEditTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Edit
        </Tooltip>
    );

    renderRemoveTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Remove
        </Tooltip>
    );

    clickRemove = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.removeUser(id);
                swal(`User removed`, {
                    icon: "success"
                }).then(() => window.location.reload()); 
            } else {
                swal(`id: ${id}`);
            }
        })
        .catch(err => {
            if(err) {
                swal("Oh noes!", "Error to remove user", "error");
            }
            else {
                swal.stopLoading();
                swal.close();
            }
        })
    }

    removeUser = id => {
        fetch(`https://localhost:5001/api/User/${id}`,
        {
            method: "DELETE",
        })
        .then( data => {
            if(data.ok){
                this.setState({redirect : true})
            }
        })
    }

}