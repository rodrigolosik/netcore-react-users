import React , { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import { Form, FormGroup, Container, Row , Col, Button} from "react-bootstrap";

class AddUser extends Component {
    constructor (props) {
        super(props);

        this.state = {
            user : {
                name : "",
                email : ""
            },
            redirect : false
        }
    }

    render() {
        const { redirect } = this.state;

        if(redirect){
            return <Redirect to={`/users`}></Redirect>;
        }else{
            return (
                <Container fluid>
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <legend>New User</legend>

                                        <FormGroup>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" onChange={this.handleInputChange} value={this.state.user.name} required name="name" id="name" />
                                        </FormGroup>

                                        <FormGroup>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" onChange={this.handleInputChange} value={this.state.user.email} required name="email" id="email" />
                                        </FormGroup>

                                    <Button type="submit">Ok</Button>

                                </fieldset>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        console.log("target:" + target + " name: " + name + " value: " + value);

        this.setState(prevState => ({
            user: {...prevState.user , [name] : value}
        }))

        console.log("user" + this.state.user);
    }

    handleSubmit = event => {
        fetch(`https://localhost:5001/api/User`,
        {
            method: "POST",
            body: JSON.stringify(this.state.user),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then( data => {
            if(data.ok){
                this.setState({redirect : true})
            }
        })

        event.preventDefault();
    }

}

export default AddUser;