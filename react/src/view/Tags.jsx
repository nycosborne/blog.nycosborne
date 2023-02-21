import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {forEach} from "react-bootstrap/ElementChildren";

export default function Tags(){

    const [tags, setTags] = useState([]);

    useEffect(()=>{

        axiosClient.get('/tags')
            .then(({data}) => {
                // console.log(data);

                setTags(data.data)
            }).catch(() => {

        })
    },[])


    console.log(tags)
    return (
        <Container>

            <Col>
                {
                    tags.map(t => (
                        <Col key={t.label}>
                            <h1><Link to={'/tags/' + t.label}>{t.label}</Link></h1>
                        </Col>
                    ))}
            </Col>
        </Container>
    )
}
