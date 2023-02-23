import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Button, Card, Container, Dropdown, FloatingLabel, Form, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {forEach} from "react-bootstrap/ElementChildren";

export default function Post() {

    let {post_slug} = useParams();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [post, setPost] = useState({
        id: null, title: '', content: '', excerpt: '', created: null, slug: '', tags: [], image: null
    })

    let postss;
    if (post_slug) {
        useEffect(() => {
            axiosClient.get(`/posts/${post_slug}`)
                .then(({data}) => {
                    setPost(data);

                })
                .catch(() => {

                })
        }, [])
    }


    return (<div>
        <Container>

            <Col className={'justify-content-around'}>
                <Row md="auto" className={'justify-content-around'}>
                    <Col>
                        <Row style={{paddingTop: '100px'}}>
                            <Col>
                                <h1 style={{color: '#fff'}}>{post.title}</h1>
                                <Row>
                                <h5 style={{color: '#fff'}}>{post.created}</h5>
                                    {
                                        post.tags.map(p => (
                                            <Col md="auto" key={p.value}>
                                                <h6><Link style={{color: '#f0666b'}} to={'/tags/' + p.value}>{p.value}</Link></h6>
                                            </Col>
                                        ))}
                                </Row>
                            </Col>
                        </Row>
                        <Row md="auto" className={'justify-content-around'}>
                            <Card.Img style={{maxWidth: '400px', marginTop: '50px', marginBottom: '40px', padding: '0px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'}} src={baseUrl + "/uploads/" + post.image}/>
                        </Row>
                    </Col>
                </Row>

                <Row md="auto" className={'justify-content-around'}>
                    <Container  style={{maxWidth: '1000px', color: '#fff'}}>
                        <div className={'blog_content'} dangerouslySetInnerHTML={{__html: post.content}} ></div>
                    </Container>
                </Row>
            </Col>
        </Container>
    </div>)
}
