import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";
import Row from "react-bootstrap/Row";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

function NavBar() {

    const {user, setUser, setToken, isAdmin} = useStateContext();

    const styles = {
        container: {
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
        },
        navBar: {
            background: '#1a202c',
            // overflowX: '100%',
            color: '#7f8ea3',
            // color: '#7f8ea3',

        }

    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            })

    }


    return (
        <Navbar variant="dark" style={styles.navBar}>
            <Container style={styles.container}>
                <Navbar.Brand href="/">nycosborne's web_Log </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/posts">all</Nav.Link>
                    <Nav.Link href="/categories">categories</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    <Nav.Link href="https://github.com/nycosborne">GitHub</Nav.Link>
                    <Nav.Link href="https://twitter.com/nycosborne">Twitter</Nav.Link>

                {
                    isAdmin &&
                    <>
                    <Nav.Link href="https://twitter.com/nycosborne">Admin</Nav.Link>
                    <Nav.Link href="#" onClick={onLogout}> {user.name} Log Out</Nav.Link>
                    </>
                }
                </Nav>
            </Container>
        </Navbar>

        // <Navbar style={styles.navBar}>
        //     <Container style={styles.container}>
        //         <Navbar.Brand style={{color: '#fff'}} href="/">nycosborne's web_Log </Navbar.Brand>
        //
        //         <Nav className="me-auto">
        //             <Nav.Link style={{color: '#fff'}} href="#link">Link</Nav.Link>
        //             <Nav.Link style={{color: '#fff'}} href="#home">Home</Nav.Link>
        //             {/*todo:Need to hide this behind admin wall*/}
        //             {/*<Nav.Link href="#" onClick={onLogout}> {user.name} Log Out</Nav.Link>*/}
        //
        //         </Nav>
        //         <Nav className="justify-content-end">
        //             <Nav.Link style={{color: '#fff'}} href="https://github.com/nycosborne">GitHub</Nav.Link>
        //             <Nav.Link style={{color: '#fff'}} href="https://twitter.com/nycosborne">Twitter</Nav.Link>
        //         </Nav>
        //     </Container>
        // </Navbar>
    );
}

export default NavBar;
