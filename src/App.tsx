import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, ThemeProvider, Alert, AlertProps } from 'react-bootstrap';

import Header from './components/Header/Header';
import Login from './pages/Login';
import Home from './pages/Home';

interface MyAlertProps extends AlertProps {
    text?: string;
}

const App: React.FC = () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const [alert, setAlert] = useState<MyAlertProps>({ show: false });

    const newAlert = (text: string, variant = 'success', timeout = 1500) => {
        setAlert({ show: true, variant, text });
        setTimeout(() => {
            setAlert({ show: false });
        }, timeout);
    };

    return (
        <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
            <Header />
            <Container className="fixed-top">
                <Alert variant={alert.variant} show={alert.show} onClose={() => setAlert({ show: false })} dismissible>
                    <p>{alert.text}</p>
                </Alert>
            </Container>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={!isLoggedIn ? <Login setAlert={newAlert} /> : <Home setAlert={newAlert} />}
                    />
                    <Route path="/register" element={<Home setAlert={newAlert} />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
