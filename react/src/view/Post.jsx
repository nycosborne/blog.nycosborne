import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Button, Card, Container, Dropdown, FloatingLabel, Form, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Post() {

    let {post_slug} = useParams();

    const [post, setPost] = useState({
        id: null, title: '', content: '', excerpt: '', created: null, slug: ''
    })

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

    console.log(post.content);

    return (<div>
        <Container>

            <Col className={'justify-content-around'}>
                <Row md="auto" className={'justify-content-around'}>
                    <Col>
                        <Row style={{paddingTop: '100px'}}>
                            <Col>
                                <h1 style={{color: '#fff'}}>{post.title}</h1>
                                <h5 style={{color: '#fff'}}>{post.created}</h5>
                            </Col>
                        </Row>
                        <Row md="auto" className={'justify-content-around'}>box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
                            <Card.Img style={{maxWidth: '400px', marginTop: '50px', marginBottom: '40px', padding: '0px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'}} src="/images/headshoot_300X300.gif"/>
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
