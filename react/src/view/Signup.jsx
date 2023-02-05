import {Button, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";


export default function Signup() {
console.log('herer');
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()

    const [errors, setErrors] = useState([])
    const {setUser, setToken} = useStateContext()

    const signUp = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token)
            })
            .catch((error) => {
                const response = error.response
                if (response && response.status === 422) {
                    setErrors((response.data.errors))
                    console.log(response.data.errors);
                }
            })

    }

    return (
        <Form onSubmit={signUp} className={'animated fadeInDown'}>
            <h1>Sign Up</h1>
            <Form.Group className="mb-3" controlId="name">

                {errors && <div style={{background: "lightpink"}}>
                    <ul>
                        {Object.keys(errors).map(key => (
                            <li key={key}>{errors[key][0]}</li>
                        ))
                        }
                    </ul>
                </div>
                }

                <Form.Label>Name</Form.Label>
                <Form.Control ref={nameRef} type="text" placeholder="Name"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control ref={emailRef} type="email" placeholder="Enter email"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control ref={passwordRef} type="password" placeholder="Password"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordConfirmation">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control ref={passwordConfirmationRef} type="password" placeholder="Password"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            {/*Will uncomment when I have multiple uses support*/}
            <p className="message">All ready have an account?<Link to="/login">Log In</Link></p>
        </Form>


    )
}
