import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import NavBar from "./NavBar.jsx";
import {Container} from "react-bootstrap";

function GuestLayout() {

    const {token} = useStateContext();

    if (token) {
        return <Navigate to='/'/>
    }


    return (
        <div>
            <NavBar/>
            <Container fluid>
                <div className='login-signup-form'>
                    <Outlet/>
                </div>
            </Container>
        </div>
    );
}

export default GuestLayout;
