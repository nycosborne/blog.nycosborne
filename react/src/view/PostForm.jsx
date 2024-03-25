import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Button, Container, FloatingLabel, Form, Col} from "react-bootstrap";
import CustomEditor from "../components/CustomEditor.jsx";
import CreatableSelect from 'react-select/creatable';
import LexicalEditor from "../components/LexicalEditor.jsx";


export default function PostForm() {
    const navigate = useNavigate();
    let {post_slug} = useParams();

    const [post, setPost] = useState({
        id: null,
        title: '',
        content: '',
        excerpt: '',
        slug: '',
        tags: [],
        image: null
    });

    const [allTags, setAllTags] = useState([]);
    const [errors, setErrors] = useState([])

    useEffect(() => {
        axiosClient.get('/tags')
            .then(({data}) => {
                setAllTags(data.data);
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
        data.append("id", post.id);
        data.append("title", post.title);
        data.append("excerpt", post.excerpt);
        data.append("content", post.content);
        data.append("created", post.created);
        data.append("slug", post.slug);

        if (post.image) {
            data.append("image", post.image);
        }
        let arr = []
        Object.values(post.tags).forEach(val => {
            arr.push(val.value)
        });
        data.append("tags", arr);

        if (post.id) {
            data.append('_method', 'PUT');

            axiosClient.post(`/posts/${post.slug}`, data)
                .then(() => {
                    navigate(`/post/${post.slug}`);
                })
        } else {
            axiosClient.post('/posts', data)
                .then(({data}) => {
                    navigate(`/post/${data.slug}`);
                }).catch((error) => {

                const response = error.response
                if (response && response.status === 422) {
                    if (response.data.error) {
                        setErrors(response.data.errors)
                    } else {
                        setErrors({
                            error: [response.data.message]
                        })
                    }
                }
            })
        }
    }

    function deletePost() {
        axiosClient.delete(`/posts/${post.slug}`)
            .then(() => {
                navigate(`/`);
            })
    }

    const selectFile = (ev) => {
        setPost({...post, image: ev.target.files[0]});
    }

    // This function sets content of the post state
    const setContent = (content) => {
        setPost({...post, content: content})
    }

    const onAddSelect = (selectedOption) => {
        setPost({...post, tags: selectedOption})
    }

    return (
        <Container>
            <Col className={'justify-content-around'}>
                <div>
                    {post.id ? <h1>Edit Post: {post.title}</h1> : <h1>New Post</h1>}
                    {errors && <div style={{background: "lightpink"}}>
                        <ul>
                            {Object.keys(errors).map(key => (
                                <li key={key}>{errors[key][0]}</li>
                            ))
                            }
                        </ul>
                    </div>
                    }
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
                        </Form.Group>

                        <Form.Group controlId="formContent" className="mb-3 content-editable_wrapper">
                            <Form.Label>Content</Form.Label>
                            {/*<CustomEditor*/}
                            {/*    value={post.content}*/}
                            {/*    onChange={ev => setPost({...post, content: ev.target.value})}*/}
                            {/*/>*/}
                            <LexicalEditor setContent={setContent}/>

                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Tags</Form.Label>
                            <CreatableSelect
                                value={post.tags}
                                onChange={onAddSelect}
                                options={allTags}
                                isMulti={true}
                            />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={ev => selectFile(ev)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {post.id ? 'Edit Post' : 'New Post'}
                        </Button>

                        {post.id &&
                            <Button variant="danger" type="deleteBtn" style={{marginLeft: '0.5rem'}}
                                    onClick={deletePost}>
                                Delete Post
                            </Button>
                        }
                    </Form>
                </div>
            </Col>
        </Container>
    )
}
