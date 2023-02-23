import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Button, Dropdown, FloatingLabel, Form} from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';

import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import {forEach} from "react-bootstrap/ElementChildren";
import Col from "react-bootstrap/Col";


export default function PostForm() {

    const navigate = useNavigate();
    let {post_slug} = useParams();


    const [post, setPost] = useState({
        id: null,
        title: '',
        content: '',
        excerpt: '',
        category_id: null,
        slug: '',
        tags: [],
        tagForRequest: [],
        image: null
    });

    const [file, setFile] = useState({
        title: 'here title',
        file: null
    });

    const [errors, setErrors] = useState(null);
    const [allTags, setAllTags] = useState(null);

    useEffect(() => {
        axiosClient.get('/tags')
            .then(({data}) => {
                setAllTags(data.data);
            })
            .catch(() => {

            })
    }, [])

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
console.log('from load', post);
    function onSubmit(ev) {
        ev.preventDefault();

        // If post ID exists we'll update the existing post.
        if (post.id) {
            console.log('on submit', post);
            axiosClient.put(`/posts/${post.slug}`, post)

                // console.log(post)
                .then(() => {
                    navigate(`/post/${post.slug}`);
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
            // else we'll create a new post
        } else {
            // Create a FormData object
            const formData = new FormData();

            // Append file to the formData object here
            formData.append("title", post.title);
            formData.append("content", post.content);
            formData.append("excerpt", post.excerpt);

            let arr = []
            Object.values(post.tags).forEach(val => {
                arr.push(val.value)
            });

            formData.append("tags", arr);

            if (post.image) {
                formData.append("image", post .image);
            }

            axiosClient.post('/posts', formData)
                .then(({data}) => {
                    navigate(`/post/${data.slug}`);
                })
            // .catch(err => {
            // todo need to add error handling
            //     const response = err.response;
            //     if (response && response.status === 422) {
            //         setErrors(response.data.errors)
            //     }
            // })

        }
    }


    const onAddSelect = (selectedOption) => {

        setPost({...post, tags: selectedOption})
    }

    return (

        <div>
            {post.id && <h1>Edit Post: {post.title}</h1>}
            {!post.id && <h1>New Post</h1>}

            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Title"
                        className="mb-3"
                    >
                        <Form.Control
                            value={post.title} onChange={ev => setPost({...post, title: ev.target.value})}
                            as="textarea"
                            placeholder="Leave a comment here"/>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Excerpt"
                        className="mb-3"
                    >
                        <Form.Control
                            value={post.excerpt} onChange={ev => setPost({...post, excerpt: ev.target.value})}
                            as="textarea"
                            placeholder="Leave a comment here"/>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Content"
                        className="mb-3"
                    >
                        <Form.Control
                            value={post.content} onChange={ev => setPost({...post, content: ev.target.value})}
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{height: '200px'}}/>
                    </FloatingLabel>


                </Form.Group>

                <CreatableSelect
                    // defaultValue={post.tags}
                    value={post.tags}
                    onChange={onAddSelect}
                    options={allTags}
                    isMulti={true}
                />

                {/*<Form.Group controlId="formFile" className="mb-3">*/}
                {/*    <Form.Label>Upload Image</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="file"*/}
                {/*        onChange={ev => fileUpload(ev)}*/}
                {/*    />*/}
                {/*</Form.Group>*/}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
