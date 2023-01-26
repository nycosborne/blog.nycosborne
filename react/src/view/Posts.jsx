import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Posts(){

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        setLoading(true);
        axiosClient.get('/post')
            .then(({data}) => {
                setLoading(false);
                setPosts(data.data)
            }).catch(() => {
            setLoading(false)
        })
    },[])

    console.log(posts);
    return (
    <Container>
        <Col>
            {posts.map(p => (
                <Col key={p.id}>
                    <h2>{p.title}</h2>
                    <div>{p.summary}</div>
                    <div>{p.content}</div>

                        <Link className="btn-edit" to={'/user/' + p.id}>Edit</Link>
                        &nbsp;
                        {/*<button className="btn-delete" onClick={ev => onDeleteClick(p)}>Delete</button>*/}

                </Col>
            ))}
        </Col>
    </Container>
    )
}
