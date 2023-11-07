import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useStateContext } from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

function NavBar() {
    const { user, setUser, setToken, isAdmin } = useStateContext();

    const styles = {
        container: {
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
        },
        navBar: {
            background: '#1a202c',
            color: '#7f8ea3',
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
        <Navbar variant="dark" style={styles.navBar} expand="md">
            <Container style={styles.container}>
                <Navbar.Brand href="/">nycosborne's web_Log</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/posts">all</Nav.Link>
                        <Nav.Link href="/tags">tags</Nav.Link>
                        {/*categories are all set up if I ever need to implement*/}
                        {/*<Nav.Link href="/categories">categories</Nav.Link>*/}
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link target="_blank" href="https://github.com/nycosborne">GitHub</Nav.Link>
                        <Nav.Link target="_blank" href="https://twitter.com/nycosborne">Twitter</Nav.Link>

                        {isAdmin &&
                            <>
                                <Nav.Link href="/posts/list">Admin</Nav.Link>
                                <Nav.Link href="#" onClick={onLogout}> {user.name} Log Out</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
