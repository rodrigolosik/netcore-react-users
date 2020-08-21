import React , { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import { Form, FormGroup, Container, Row , Col} from "react-bootstrap";

class AddUser extends Component {
    constructor (props) {
        super(props);

        this.state = {
            user : {
                name : "",
                dateBirth : "",
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
                <Container fluid><Row><Col>
                <Form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>New User</legend>

                            <FormGroup>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={this.handleInputChange} value={this.state.user.name} required name="name" id="name" />
                            </FormGroup>

                        <div className="user-insert">
                            <label htmlFor="dateBirth">Date Birth</label>
                            <input 
                                type="date" 
                                id="datebirth" 
                                name="datebirth" 
                                placeholder="Insert your birth Date" 
                                required 
                                value={this.state.user.dateBirth} 
                                onChange={this.handleInputChange} />
                        </div>

                        <div className="user-insert">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Insert your email" 
                                required 
                                value={this.state.user.email} 
                                onChange={this.handleInputChange} />
                        </div>

                        <button type="submit">Ok</button>

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

        this.setState(prevState => ({
            user: {...prevState.user , [name] : value}
        }))
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