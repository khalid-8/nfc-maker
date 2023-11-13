import React, { useRef } from "react";
import "./styles/header.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
    const ref = useRef();
    const navigate = useNavigate();

    // useOutsideClick(ref, () => {
    //     if (ref.current?.childNodes[0]?.childNodes[3]?.classList?.contains("show"))
    //         ref.current.childNodes[0].childNodes[3].classList.remove("show");
    // });

    return (
        <Navbar id="my-header" expand="lg" ref={ref}>
            <Container className="header_container">
                <span></span>
                <Navbar.Brand className="menu_title" onClick={() => navigate("/")}>
                    <div className="app-logo">
                        <img src="/images/logo_alone.svg" className="logo-alone" alt="app logo" />
                        <img src="/images/logo_text.svg" className="logo-text" alt="app logo" />
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    onClick={() => {
                        const menu = document.querySelector(".navbar-collapse");
                        console.log(menu.classList);
                        if (menu.classList.contains("show")) menu.classList.remove("show");
                    }}>
                    <Nav className="me-auto menu_navs">
                        <Nav.Link className="nav_item" onClick={() => navigate("/map")}>
                            الخرائط
                        </Nav.Link>
                    </Nav>
                    <Nav className="me-auto menu_navs">
                        <Nav.Link className="nav_item" onClick={() => navigate("/contacts")}>
                            بطاقة اعمال
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
