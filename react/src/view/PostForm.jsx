import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Button, Dropdown, FloatingLabel, Form} from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';

import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import {forEach} from "react-bootstrap/ElementChildren";


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
        tag: [],
        image: null
    });

    const [file, setFile] = useState({
        title: 'here title',
        file: null
    });

    const [errors, setErrors] = useState(null);
    const [tags, setTags] = useState(null);

    useEffect(() => {
        axiosClient.get('/tags')
            .then(({data}) => {
                setTags(data.data);
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

        // If post ID exists we'll update the existing post.
        if (post.id) {
            axiosClient.put(`/posts/${post.slug}`, post)
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
            // formData.append("title", post['title']);
            formData.append("title", post.title);
            formData.append("content", post.content);
            formData.append("excerpt", post.excerpt);
            formData.append("tag", post.tag);
            if (post.image) {
                formData.append("image", post.image);
            }
            console.log('new post post request', post);
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

    // const fileUpload = (ev) =>{
    //
    //     setPost({...post, image: ev.target.files[0]});
    // }


    const onAddSelect = (selectedOption) => {
        let arr = [];
        selectedOption.forEach((val) => {
            console.log(val.label);
            arr.push(val.label);
        });
        setPost({...post, tag: arr})
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
                    defaultValue={{lable: 'wew', value:'dw'}}
                    // defaultValue={selectedOption}
                    // onChange={setSelectedOption}
                    onChange={onAddSelect}
                    options={tags}
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
