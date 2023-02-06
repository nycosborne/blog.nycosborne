import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link, useParams} from "react-router-dom";
import {  useLocation } from 'react-router-dom';
import {Container} from "react-bootstrap";
import {Col, Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {forEach} from "react-bootstrap/ElementChildren";

export default function Posts() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [isHome, setHome] = useState(false)
    const location = useLocation()
    let {cat_slug} = useParams();

    if (!cat_slug) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get('/posts')
                .then(({data}) => {
                    // console.log(data);
                    setLoading(false);
                    setPosts(data.data)
                }).catch(() => {
                setLoading(false)
            })

            if(location.pathname === '/'){
                setHome(true);
            }

        }, [])
    } else {

        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/categories/${cat_slug}`)
                .then(({data}) => {
                    console.log(data);
                    setLoading(false);
                    setPosts(data.data)
                }).catch(() => {
                setLoading(false)
            })
        }, [])

    }

    return (
        <Col style={{textDecoration: 'none', color: '#fff'}}>
            {isHome &&
            <div>

            </div>
            }

        <Row className={'justify-content-around'}>
            {
                posts.map(p => (
                    <Col md="auto" key={p.id}>
                        <a style={{textDecoration: 'none', color: '#fff'}} href={'/post/' + p.slug}>
                            <Card>
                                <Card.Img variant="top" src="/images/headshot.gif"/>
                                <Card.Body>
                                    <Card.Title >{p.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </a>
                    </Col>
                ))}
        </Row>
        </Col>
    )
}
