import NavBar from "../components/NavBar.jsx";
import {Button, Container, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link, Outlet} from "react-router-dom";
import {createRef} from "react";

export default function Login() {

    const emailRef = createRef()
    const passwordRef = createRef()

    const logIn = (ev) => {
        ev.preventDefault();
        console.log(emailRef.current.value);

    }

    return (
        <div>
            <NavBar/>
            <Container fluid>
                <div className='login-signup-form'>
                    <Form onSubmit={logIn}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        {/*Will uncomment when I have multiple uses support*/}
                        {/*<p className="message">Not registered? <Link to="/signup">Create an account</Link></p>*/}
                    </Form>
                </div>
            </Container>
        </div>
    )
}
