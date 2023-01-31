import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Button, Container, Dropdown, FloatingLabel, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Post() {

    const navigate = useNavigate();
    let {id} = useParams();

    const [post, setPost] = useState({
        id: null,
        title: '',
        content: '',
        excerpt: '',
        created: null,
        slug: ''
    })

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    if (id) {
        useEffect(() => {

            axiosClient.get(`/posts/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    setPost(data);
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
            {post.id && <h1>{post.title} {post.title}</h1>}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
