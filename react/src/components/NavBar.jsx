import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";
import Row from "react-bootstrap/Row";
import {useStateContext} from "../context/ContextProvider.jsx";

function NavBar() {

    const {user} = useStateContext();

    const styles = {
        container: {
            backgroundColor: '#987D7C',
            overflowX: '100%',
        }

    }

    const onLogout = (ev) => {
        ev.preventDefault();
    }

    return (
        <Navbar style={styles.container} expand="xxl'" fixed={"top"}>
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Nav.Link href="#" onClick={onLogout}> {user.name} Log Out</Nav.Link>
                {/*<Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
                {/*<Navbar.Collapse id="basic-navbar-nav">*/}
                {/*    <Nav className="me-auto">*/}
                {/*        <Nav.Link href="#home">Home</Nav.Link>*/}
                {/*        <Nav.Link href="#link">Link</Nav.Link>*/}
                {/*        <NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                {/*            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                {/*            <NavDropdown.Item href="#action/3.2">*/}
                {/*                Another action*/}
                {/*            </NavDropdown.Item>*/}
                {/*            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                {/*            <NavDropdown.Divider />*/}
                {/*            <NavDropdown.Item href="#action/3.4">*/}
                {/*                Separated link*/}
                {/*            </NavDropdown.Item>*/}
                {/*        </NavDropdown>*/}
                {/*    </Nav>*/}
                {/*</Navbar.Collapse>*/}
            </Container>
        </Navbar>
    );
}

export default NavBar;
