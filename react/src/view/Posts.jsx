import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link, useParams} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import {Container} from "react-bootstrap";
import {Col, Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";

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

            if (location.pathname === '/') {
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
        <Container>
            <Col style={{textDecoration: 'none', color: '#fff'}}>
                {isHome &&
                    <Row className={'justify-content-around'}>
                        <Row style={{maxWidth: '1000px', paddingTop: '150px', borderRadius: '50%'}}>
                            <Col>
                                <Card.Img style={{borderRadius: '50%'}} src="/images/headshoot_300X300.gif"/>
                            </Col>
                            <Col xs={10} style={{fontSize: '1.25rem'}}>
                                    <p>Hello, I'm Dan from New York 🗽</p>
                                    <p>I’m a full-stack engineer passionate about building useful things with clean code!</p>
                                    <p>I’ve been building and maintaining monolithic and serverless enterprise applications
                                        for 5+ years. Strong knowledge of PHP, Python, Laravel, Node.js, Reach.js, Java,
                                        relational, and NoSQL databases. AWS certification.</p>
                                    <p>Happiest ❤️ when working closely with others.</p>
                             </Col>
                        </Row>
                    </Row>
                }
                <Row className={'justify-content-around'} >
                    {
                        posts.map(p => (
                            <Col md="auto" key={p.id}>
                                <a style={{textDecoration: 'none', color: '#fff'}} href={'/post/' + p.slug}>
                                    <Card>
                                        {/*<Card.Img variant="top" src="http://localhost:8000/uploads/1675789169.gif"/>*/}
                                        <Card.Img variant="top" src="/images/headshot.gif"/>
                                        <Card.Body>
                                            <Card.Text style={{color: '#ffffff8c'}}>{p.created}</Card.Text>
                                            <Card.Title>{p.title}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </a>
                            </Col>
                        ))}
                </Row>
            </Col>
        </Container>
    )
}
