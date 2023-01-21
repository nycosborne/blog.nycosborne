import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {createRef} from "react";

export default function Login() {

    const emailRef = createRef()
    const passwordRef = createRef()

    const logIn = (ev) => {
        ev.preventDefault();
        console.log(emailRef.current.value);

    }

    return (
        <Form onSubmit={logIn} className={'animated fadeInDown'}>
            <h1>Log In</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control ref={emailRef} type="email" placeholder="Enter email"/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control ref={passwordRef} type="password" placeholder="Password"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            {/*Will uncomment when I have multiple uses support*/}
            <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </Form>
    )
}
