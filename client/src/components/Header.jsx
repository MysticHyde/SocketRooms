import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../context/Auth";
import { Link, Outlet } from "react-router-dom";

export default function Header() {
    const { user, setUser } = useAuth();
    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><Link to="/">React-Bootstrap</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {user ?
                                <>
                                    <Link to="/" className='nav-link'>Chat</Link>
                                    <Link to="/profile" className='nav-link'>Profile</Link>
                                </>
                                :
                                <>
                                    <Link to="/login" className='nav-link'>Connexion</Link>
                                </>

                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}
