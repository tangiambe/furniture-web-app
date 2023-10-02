import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

export const Login = () => {
    const [emaillog, setEmaillog] = useState(" ");
    const [passwordlog, setPasswordlog] = useState(" ");
    const [flag, setFlag] = useState(false);

    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        let pass = localStorage
            .getItem("Password")
            .replace(/"/g, "");
        let mail = localStorage.getItem("Email").replace(/"/g, "");


        if (!emaillog || !passwordlog) {
            setFlag(true);
            console.log("EMPTY");
        } else if (passwordlog !== pass || emaillog !== mail) {
            setFlag(true);
        } else {
            setFlag(false)
            localStorage.setItem("active", true);
            navigate("/shop");
        }
    }


    return (
        <>
            <Container fluid id="wrapper" className="d-flex align-items-center">
                <Card id='signupCard' className="mx-auto ">
                    <Row id="signupPageRow">
                        <Container className="mt-1">
                            <section className="mx-auto">
                                <h1 className="text-center">Login</h1>
                            </section>
                            <div>
                                <p className="text-center"> Not yet registered? <a href="/Register">Register Now!</a></p>
                            </div>
                        </Container>
                        <Container>
                            <form onSubmit={handleLogin}>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        onChange={(event) => setEmaillog(event.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        onChange={(event) => setPasswordlog(event.target.value)}
                                    />
                                </div>


                                <button type="submit" className="btn btn-dark btn-lg btn-block">
                                    Login
                                </button>
                                {flag && (
                                    <Alert color="primary" variant="danger">
                                        Invalid Email/Password.
                                    </Alert>
                                )}
                            </form>
                        </Container>
                    </Row>
                </Card>
            </Container>
        </>
    );
}
