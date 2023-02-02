import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {forEach} from "react-bootstrap/ElementChildren";

export default function Categories(){

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        setLoading(true);
        axiosClient.get('/categories')
            .then(({data}) => {
                // console.log(data);
                setLoading(false);
                setCategories(data.data)
            }).catch(() => {
            setLoading(false)
        })
    },[])

    return (
        <Container>
            <Col>
                {
                    categories.map(c => (
                        <Col key={c.id}>
                            <h1><Link to={'/categories/' + c.id}>{c.category_name}</Link></h1>
                            <h3>{c.category_name}</h3>
                            {/*<div>{p.excerpt}</div>*/}

                            {/*<Link className="btn-edit" to={'/user/' + p.id}>Edit</Link>*/}
                            &nbsp;
                            {/*<button className="btn-delete" onClick={ev => onDeleteClick(p)}>Delete</button>*/}

                        </Col>
                    ))}
            </Col>
        </Container>
    )
}
