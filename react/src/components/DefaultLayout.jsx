import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Container} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "./NavBar.jsx";


function DefaultLayout() {

    const {user, token} = useStateContext();

    const styles = {
        container: {

        },
        left: {
            overflowY: '100%',
            padding: 0,
            height: window.innerHeight,
            backgroundColor: 'white',
            transition: 'all 2.2s',
        },
        right: {
            height: window.innerHeight, // I want to change this
            padding: 0,
            margin: 0,
            overflow: 'hidden',
            backgroundColor: 'yellow'
        },
        row: {
            marginBottom: 0
        }
    }

    if (!token) {
        return <Navigate to='/login'/>
    }

    return (
        <div>
            <NavBar/>
            <Container>
                <Row>
                    <Col xs="12" sm="4" md="4" lg="3" style={ styles.left }>
                        <Row><Link to="/dashboard">Dashboard</Link></Row>
                        <Row><Link to="/users">Users</Link></Row>
                        <Row><Link to="/posts">Posts</Link></Row>
                    </Col>
                    <Col xs="12" sm="8" md="8" lg="9" style={ styles.right }>
                        {`{"Outlit!!!"}`}
                        <Outlet/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DefaultLayout;
