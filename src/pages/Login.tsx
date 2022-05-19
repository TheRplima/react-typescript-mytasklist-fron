import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

interface LoginProps {
    setAlert: (text: string, variant?: string, timeout?: number) => void;
}
const initialFormData = Object.freeze({
    email: '',
    password: '',
});

const Login: React.FC<LoginProps> = ({ setAlert }) => {
    const [validated, setValidated] = useState(false);
    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        setValidated(form.checkValidity());
        // console.log(formData, validated);
    };

    const makeLogin = async () => {
        const formdata = new FormData();
        formdata.append('email', formData.email);
        formdata.append('password', formData.password);

        const requestOptions = {
            method: 'POST',
            body: formdata,
        };

        await fetch('https://young-earth-00064.herokuapp.com/api/user/login', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'success') {
                    sessionStorage.setItem('token', result.token);
                    sessionStorage.setItem('userName', formData.email);
                    sessionStorage.setItem('isLoggedIn', 'true');

                    window.location.href = '/';
                }
                setAlert(result.message, 'danger');
            })
            .catch((error) => {
                console.log('errro', error);
            });
    };

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn && validated === true) {
            console.log('Iniciando etapa de login');
            makeLogin();
        }
    }, [validated]);

    return (
        <Container className="login my-5">
            <Card>
                <Form noValidate validated={!validated && formData.email !== ''} onSubmit={handleSubmit}>
                    <Card.Header>
                        <Card.Title>Signin</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="E-mail"
                                required
                                autoFocus
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">E-mail field is required.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">Password field is required.</Form.Control.Feedback>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className="text-center">
                        <Button
                            type="submit"
                            className={
                                !validated && (formData.email === '' || formData.password === '') ? 'disabled' : ''
                            }
                        >
                            Sign in
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;
