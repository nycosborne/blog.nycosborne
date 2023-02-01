import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link, useParams} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {forEach} from "react-bootstrap/ElementChildren";

export default function Posts(){

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    let {cat_slug} = useParams();


    if(!cat_slug) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get('/posts')
                .then(({data}) => {
                    // console.log(data);
                    setLoading(false);
                    setPosts(data.data)
                }).catch(() => {
                setLoading(false)
            })
        }, [])
    }else {

        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/categories/${cat_slug}`)
                .then(({data}) => {
                    console.log(data);
                    setLoading(false);
                    setPosts(data.data)
                }).catch(() => {
                setLoading(false)
            })
        }, [])


    }
    return (
    <Container>
        <Col>
            {/*{*/}
            {/*    posts.map(p => (*/}
            {/*    <Col key={p.id}>*/}
            {/*        <h1><Link to={'/post/' + p.slug}>{p.title}</Link></h1>*/}
            {/*        <h3>{p.category_name}</h3>*/}
            {/*        /!*<div>{p.excerpt}</div>*!/*/}

            {/*            /!*<Link className="btn-edit" to={'/user/' + p.id}>Edit</Link>*!/*/}
            {/*            &nbsp;*/}
            {/*            /!*<button className="btn-delete" onClick={ev => onDeleteClick(p)}>Delete</button>*!/*/}

            {/*    </Col>*/}
            {/*))}*/}
        </Col>
    </Container>
    )
}
