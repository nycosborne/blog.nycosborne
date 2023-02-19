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
        setLoading(true);
        axiosClient.get('/tags')
            .then(({data}) => {
                // console.log(data);
                setLoading(false);
                setTags(data.data)
            }).catch(() => {
            setLoading(false)
        })
    },[])

    return (
        <Container>
            <Col>
                {
                    tags.map(t => (
                        <Col key={t.id}>
                            <h1><Link to={'/tags/' + t.id}>{t.tag_name}</Link></h1>
                        </Col>
                    ))}
            </Col>
        </Container>
    )
}
