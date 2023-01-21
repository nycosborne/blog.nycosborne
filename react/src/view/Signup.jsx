import {Button, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {createRef} from "react";

export default function Signup() {

    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()

    const signUp = (ev) => {
        ev.preventDefault();
        console.log();

    }

    return (
        <Form onSubmit={signUp} className={'animated fadeInDown'}>
            <h1>Sign Up</h1>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control ref={nameRef} type="email" placeholder="Name"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control ref={emailRef} type="email" placeholder="Enter email"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control ref={passwordRef} type="password" placeholder="Password"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordConfirmation">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control ref={passwordConfirmationRef} type="password" placeholder="Password"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            {/*Will uncomment when I have multiple uses support*/}
            <p className="message">All ready have an account?<Link to="/login">Log In</Link></p>
        </Form>


    )
}
