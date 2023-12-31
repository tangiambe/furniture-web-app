import { useContext, useEffect, useState } from "react"
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import "./navbar.css";
import { DataContainer } from "../../App";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {


  const { CartItem, setCartItem } = useContext(DataContainer);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("active", false);
    navigate("/");
  }

  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  window.addEventListener("scroll", scrollHandler);
  useEffect(() => {
    if (CartItem.length === 0) {
      const storedCart = localStorage.getItem("cartItem");
      setCartItem(JSON.parse(storedCart));
    }
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <Navbar
        fixed="top"
        expand="md"
        className={isFixed ? "navbar fixed" : "navbar"}
      >
        <Container className="navbar-container">
          <Navbar.Brand>
            <h1 className="logo"><Link to="/" className="nav-title">Furnish.</Link></h1>
          </Navbar.Brand>
          <div className="d-flex">
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => {
                setExpand(expand ? false : "expanded");
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </Navbar.Toggle>
          </div>

          { localStorage.getItem("active") === 'true' ? (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-end flex-grow-1 pe-3">

              <Nav.Item 
              className="justify-content-center flex-grow-1"
              style={{paddingLeft: "190px"}}
              >
                <span className="nav-link-label navbar-link"><h4>Hi, {localStorage.getItem("Username").replace(/"/g, "")}!</h4></span>
              </Nav.Item>

                <Nav.Item>
                  <Link className="navbar-link" to="/shop" onClick={() => setExpand(false)}>
                    <span className="nav-link-label">Shop</span>
                  </Link>
                </Nav.Item>

                <Nav.Item className="expanded-cart">
                  <Link to='/cart' className='cart' data-num={CartItem.length}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="nav-icon">
                      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                  </Link>
                </Nav.Item>

                <Nav.Item className="px-3 py-2">
                  <Button className="fw-bold" variant="danger" onClick={handleLogout}>Logout</Button>
                </Nav.Item>

              </Nav>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-end flex-grow-1 pe-3">

                <Nav.Item>
                  <Link className="navbar-link" to="/shop" onClick={() => setExpand(false)}>
                    <span className="nav-link-label">Shop</span>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link className="navbar-link" to="/register" onClick={() => setExpand(false)}>
                    <span className="nav-link-label">Register</span>
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link className="navbar-link" to="/login" onClick={() => setExpand(false)}>
                    <span className="nav-link-label">Login</span>
                  </Link>
                </Nav.Item>


                <Nav.Item className="expanded-cart">
                  <Link to='/cart' className='cart' data-num={CartItem.length}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="nav-icon">
                      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                  </Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
