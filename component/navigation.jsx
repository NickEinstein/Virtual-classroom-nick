import {
  Nav,
  Navbar,
  Container,
  Button,
  Image,
  Dropdown,
  NavDropdown,
  Col,
  Row,
  Jumbotron,
} from "react-bootstrap";

import Link from "next/link";
import style from './search.module.scss';

export default function Navigation() {
  return (
    <div>
      <Navbar  className={style.navbg} expand="md">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="light">
            <Nav.Item>
              <Nav.Link className={style.navLink} eventKey="1" >
                <Link href="/">
                  Home
                </Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className={style.navLink} eventKey="2" href="/#search">
                  Search
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className={style.navLink} eventKey="3" href="/#about">
                  About
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className={style.navLink} eventKey="3" href="/#how">
                  How It Works
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className={style.navLink} eventKey="4" href="/#pricing">
                  Pricing
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className={style.navLink} eventKey="5" href="/#faq">
                  FAQs
                </Nav.Link>
            </Nav.Item>

            <NavDropdown title="For Students" id="nav-dropdown" className={style.navDropdown}>
              <NavDropdown.Item eventKey="6.1">
                <Link href="/searchResults">
                  <a>
                    Search for tutor
                  </a>
                </Link>                
              </NavDropdown.Item>
              {/* <NavDropdown.Item eventKey="6.1">
                <Link href="jobSearch">
                  <a>
                   Subject categories
                  </a>
                </Link>                
              </NavDropdown.Item> */}
            </NavDropdown>

            {/* <NavDropdown title="For Tutors"  id="nav-dropdown"  className={style.navDropdown}>
              <NavDropdown.Item eventKey="7.1">
                <Link href="/searchResults">
                  <a>Search for students</a>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="7.2">
                <Link href="/searchResults">
                  <a>
                    Search jobs by subject
                  </a>
                </Link>
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>          
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}