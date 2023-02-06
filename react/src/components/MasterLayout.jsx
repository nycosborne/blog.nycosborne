import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Container} from "react-bootstrap";
import {Row, Col} from 'react-bootstrap';
import NavBar from "./NavBar.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";


function MasterLayout() {

    const {setUser, token} = useStateContext();

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])

    if (!token) {
        return <Navigate to='/login'/>
    }

    return (
        <div>
            <NavBar/>
            <Container variant="dark">
                {/*<Row>*/}
                {/*    <Col>*/}
                <Outlet/>
                {/*    </Col>*/}
                {/*</Row>*/}
            </Container>
        </div>


    );
}

export default MasterLayout;
