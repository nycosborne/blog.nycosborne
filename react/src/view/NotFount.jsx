import {Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {Outlet} from "react-router-dom";

export default function NotFount(){

    return (

        <Container fluid>
            <div className='login-signup-form'>
                <h1>404ing - Page Not Here!!!</h1>
            </div>
        </Container>

    )
}
