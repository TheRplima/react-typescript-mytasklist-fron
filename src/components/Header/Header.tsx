import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header: React.FC = () => {
    const isLoggedIn =
        sessionStorage.getItem('isLoggedIn') !== null ? sessionStorage.getItem('isLoggedIn') === 'true' : false;
    const userName = sessionStorage.getItem('userName');
    const token = sessionStorage.getItem('token');

    const todoLogout = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch('https://young-earth-00064.herokuapp.com/api/user/logout', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'success') {
                    window.location.reload();
                    sessionStorage.clear();

                    window.location.href = '/';
                }
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <Navbar sticky="top" expand="lg" variant="light" bg="warning">
            <Container>
                <Navbar.Brand href="#home">My to do list</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link> */}
                        {isLoggedIn && (
                            <NavDropdown title={userName} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#" onClick={todoLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
