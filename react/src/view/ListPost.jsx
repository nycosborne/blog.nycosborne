// This component is used to display the list of posts to select for editing or deleting.
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Container, Row, Col, Button} from "react-bootstrap";


export default function ListPost() {

    //Get all posts from the API
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axiosClient.get('/posts')
            .then(({data}) => {
                setPosts(data.data)
            }).catch(() => {
        })
    }, []);

    const deletePost = (slug) => {
        axiosClient.delete(`/posts/${slug}`)
            .then(({data}) => {
                setPosts((prevPosts) => prevPosts.filter((post) => post.slug !== slug));
            }).catch(() => {
                console.log("Error deleting post");
        })
    }

    //Loop through the posts and display in rows
    const listPosts = posts.map((p) => (
        <Row key={p.id} className="mb-3">
            <Col>{p.title}</Col>
            <Col>
                <Button variant="primary" type="edit_post">
                    Edit Post
                </Button>
            </Col>
            <Col>
                <Button variant="primary" type="deletePost" onClick={() => deletePost(p.slug)}>
                    Delete Post
                </Button>
            </Col>
        </Row>
    ));

    return <Container>{listPosts}</Container>;
}


