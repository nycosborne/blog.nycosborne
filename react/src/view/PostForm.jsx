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

    function onSubmit(ev) {
        ev.preventDefault();

        const data = new FormData();
        // Append file to the formData object here
        data.append("id", post.id);
        data.append("title", post.title);
        data.append("excerpt", post.excerpt);
        data.append("content", post.content);
        data.append("created", post.created);
        data.append("slug", post.slug);
        data.append("category_name", post.category_name);
        data.append("image", post.image);
        let arr = []
        Object.values(post.tags).forEach(val => {
            arr.push(val.value)
        });
        data.append("tags", arr);
        data.append('_method', 'PUT');

        // If post ID exists we'll update the existing post.
        if (post.id) {

            axiosClient.post(`/posts/${post.slug}`, data)
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
                formData.append("image", post.image);
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

    const selectFile = (ev) => {

        // setPost({...post, image: ev.target.files[0]});
        // setFile({...file, file: ev.target.files[0]});
        setPost({...post, image: ev.target.files[0]});
    }

    const upLoadFile = () => {

        // Create a FormData object
        const data = new FormData()
        data.append('image', post.image)
        data.append("excerpt", post.excerpt);
        data.append('_method', 'PUT')
        console.log(post.image);
        console.log(data);

        for (const pair of data.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }
        axiosClient.post(`/posts/${post.slug}`, data)
            .then(() => {
                // navigate(`/post/${post.slug}`);
            })
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

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={ev => selectFile(ev)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <Button variant="primary" onClick={upLoadFile}>
                Upload
            </Button>
        </div>
    )
}
