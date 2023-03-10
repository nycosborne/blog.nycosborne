import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Login() {

    const emailRef = createRef()
    const passwordRef = createRef()

    const [errors, setErrors] = useState([])
    const {setUser,setToken} = useStateContext()

    const logIn = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token)
            })
            .catch((error) => {
                const response = error.response
                if (response && response.status === 422) {
                    if(response.data.error) {
                        setErrors(response.data.errors)
                    }else {
                        setErrors({
                            error: [response.data.message]
                        })
                    }
                }
            })

    }

    return (
        <Form onSubmit={logIn} className={'animated fadeInDown'}>
            <h1>Log In</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">

                {errors && <div style={{background: "lightpink"}}>
                    <ul>
                        {Object.keys(errors).map(key => (
                            <li key={key}>{errors[key][0]}</li>
                        ))
                        }
                    </ul>
                </div>
                }
                <Form.Label>Email address</Form.Label>
                <Form.Control ref={emailRef} type="email" placeholder="Enter email"/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control ref={passwordRef} type="password" placeholder="Password"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            {/*Will uncomment when I have multiple uses support*/}
            <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </Form>
    )
}
