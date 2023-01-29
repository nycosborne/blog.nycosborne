import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Button, FloatingLabel, Form} from "react-bootstrap";

export default function PostForm() {

    const navigate = useNavigate();
    let {id} = useParams();
    const [post, setPost] = useState({
        id: null,
        title: '',
        content: '',
        excerpt: ''
    })

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)


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
        }, [])
    }

    function onSubmit(ev) {
        console.log(post);

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
            axiosClient.post('/posts', post)
                .then(() => {
                    // navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
