import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    function handleFormSubmit(e) {
        e.preventDefault();

        if (!username || !email || !password) {
            setFlag(true);
        } else {
            setFlag(false);
            localStorage.setItem("Username", JSON.stringify(username));
            localStorage.setItem("Email", JSON.stringify(email));
            localStorage.setItem("Password", JSON.stringify(password));
            console.log("Saved in Local Storage");
            navigate("/login");

        }
    }

    return (
        <>
            <Container className="d-flex align-items-center">
            <Card id='signupCard' className="mx-auto ">
                <Row id="signupPageRow">
                    <Container className="mt-1">
                        <section className="mx-auto">
                            <h1 className="text-center">Register</h1>
                        </section>
                        <div>
                            <p className="text-center"> Already have an account? <a href="/login">Log In!</a></p>
                        </div>
                    </Container>
                    <Container>
                    <form onSubmit={handleFormSubmit}>

                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Username"
                                name="username"
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>


                        <button type="submit" className="btn btn-dark btn-lg btn-block">
                            Create Account
                        </button>
                        {flag && (
                            <Alert color="primary" variant="danger">
                                Every field is required.
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
