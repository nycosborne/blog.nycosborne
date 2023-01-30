import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Button, Dropdown, FloatingLabel, Form} from "react-bootstrap";

export default function Post() {

    const navigate = useNavigate();
    let {id} = useParams();
    const [post, setPost] = useState({
        id: null,
        title: '',
        content: '',
        excerpt: '',
        created: null
    })

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    if (id) {
        useEffect(() => {

            axiosClient.get(`/posts/${id}`)
                .then(({data}) => {

                    setLoading(false)
                    setPost({'title': 'test'})

                    console.log(data);
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }




    return (
        <div>
            {post.id && <h1>{post.title} {post.title}</h1>}
            {post.id && <h1>New Post</h1>}

        </div>
    )
}
