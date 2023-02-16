import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Button, Dropdown, FloatingLabel, Form} from "react-bootstrap";

import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function PostForm() {

    const navigate = useNavigate();
    let {id} = useParams();
    const [post, setPost] = useState({
        id: null,
        title: '',
        content: '',
        excerpt: '',
        category_id: null,
        slug: '',
        image: null
    });

    const [file, setFile] = useState({
        title: 'here title',
        file: null
    });

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/posts/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    setPost(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, []);
    }


    function onSubmit(ev) {
        ev.preventDefault();

        if (post.id) {
            axiosClient.put(`/posts/${post.id}`, post)
                .then(() => {
                    // console.log('this');
                    // navigate('/posts');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {

            // Create a FormData object
            const formData = new FormData();

            // Append file to the formData object here
            formData.append("title", post['title']);
            formData.append("content", post['content']);
            formData.append("excerpt", post['excerpt']);
            formData.append("category_id", 1);
            formData.append("slug", post['slug']);
            if(post['image']) {
                formData.append("image", post['image']);
            }
            axiosClient.post('/posts', formData )

            console.log('formData', post);
                // .then(() => {
                // todo this should redirect to the created or edited post
                //     // navigate('/users')
                // })
                // .catch(err => {
                //     const response = err.response;
                //     if (response && response.status === 422) {
                //         setErrors(response.data.errors)
                //     }
                // })
        }
    }

    const fileUpload = (ev) =>{

        setPost({...post, image: ev.target.files[0]});
    }

    const movieItems = [
        {
            id: 0,
            title: "Titanic",
            description: "A movie about love",
        },
        {
            id: 1,
            title: "Dead Poets Society",
            description: "A movie about poetry and the meaning of life",
        },
        {
            id: 2,
            title: "Terminator 2",
            description: "A robot from the future is sent back in time",
        },
        {
            id: 3,
            title: "Alien 2",
            description: "Ripley is back for a new adventure",
        },
    ];
    //
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results);
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result);
    }

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item);
    }

    const handleOnFocus = () => {
        console.log('Focused');
    }

    const handleOnClear = () => {
        console.log("Cleared");
    };

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
                        label="slug"
                        className="mb-3"
                    >
                        <Form.Control
                            value={post.slug} onChange={ev => setPost({...post, slug: ev.target.value})}
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


                <ReactSearchAutocomplete
                    value={post.slug} onChange={ev => setPost({...post, slug: ev.target.value})}
                    items={movieItems}
                    fuseOptions={{ keys: ["title", "description"] }} // Search on both fields
                    resultStringKeyName="title" // String to display in the results
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    onClear={handleOnClear}
                    showIcon={false}
                    styling={{
                        height: "34px",
                        border: "1px solid darkgreen",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        boxShadow: "none",
                        hoverBackgroundColor: "lightgreen",
                        color: "darkgreen",
                        fontSize: "12px",
                        fontFamily: "Courier",
                        iconColor: "green",
                        lineColor: "lightgreen",
                        placeholderColor: "darkgreen",
                        clearIconMargin: "3px 8px 0 0",
                        zIndex: 2,
                    }}
                />

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={ev => fileUpload(ev)}
                    />
                </Form.Group>


{/*todo make the drop down option a dynamics DB pull*/}
{/*                <Dropdown>*/}
{/*                    <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
{/*                        Dropdown Button*/}
{/*                    </Dropdown.Toggle>*/}
{/*                    <Dropdown.Menu>*/}
{/*                        <Dropdown.Item onClick={ev => setPost({...post, category_id: 1})}>Personal</Dropdown.Item>*/}
{/*                        <Dropdown.Item onClick={ev => setPost({...post, category_id: 2})}>Work</Dropdown.Item>*/}
{/*                        <Dropdown.Item onClick={ev => setPost({...post, category_id: 3})}>Hobbies</Dropdown.Item>*/}
{/*                    </Dropdown.Menu>*/}
{/*                </Dropdown>*/}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
