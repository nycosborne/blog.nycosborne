import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Container} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "./NavBar.jsx";


function DefaultLayout() {

    const {token} = useStateContext();

    const styles = {
        container: {
            maxWidth: '100%',
        },
        left: {
            overflowY: '100%',
            width: '180px',
            padding: 0,
            paddingLeft: 40,
            height: window.innerHeight,
            backgroundColor: '#987D7C'
        },
        right: {
            height: window.innerHeight,
            padding: 0,
            margin: 0,
            overflow: 'hidden',
            backgroundColor: '#F6BE9A'
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
            <Container fluid>
            <Row>
                <Col xs={4} sm={4} md={4} lg={4} style={ styles.left }>
                    <Row><Link to="/dashboard">Dashboard</Link></Row>
                    <Row><Link to="/users">Users</Link></Row>
                    <Row><Link to="/posts">Posts</Link></Row>
                </Col>

                <Col style={ styles.right }>
                    {`{"Outlit!!!"}`}
                    <Outlet/>
                </Col>

            </Row>
            </Container>
        </div>



    );
}

export default DefaultLayout;
