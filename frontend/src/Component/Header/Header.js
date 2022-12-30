import React from 'react'
import {Button,
    Container,
    Form ,
    Nav ,
  Navbar ,
 NavDropdown }
 from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from '../../actions/userAction';
import './style.css'

function Header({
  search ,
  setSearch
}) {
  let navigate = useNavigate();
  let dispatch = useDispatch()
  const { userLogin } = useSelector(state=>state)
  const { userInfo } = userLogin 
  console.log(userInfo)
  return (<>
   <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Collapse id="navbarScroll">
        <Nav className='m-auto'>
        <Navbar.Brand ><Link to={'/'}> Note Tify</Link> </Navbar.Brand>
       </Nav>
          <Form className="m-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </Form>
          {
            userInfo?(
          <Nav
            className="m-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to='/mynotes'> My Notes </Nav.Link>
            <Navbar.Brand > 
             <div className="logo-image">
              <img src={userInfo.pic} alt={userInfo.name}  className="img-fluid" />
             </div>
           </Navbar.Brand>
            <NavDropdown title={ userInfo && userInfo.name? userInfo.name : 'Login'} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">
               My Profile
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item onClick={()=>{
                 navigate('/starred')
                }}
              >
               Starred Notes
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{
                 dispatch(LogOut())
                 navigate('/')
                }}>
               Logout 
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>)
          :
          ( 
            <Nav
            className="m-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            >
               <Nav.Link as={Link} to='/login'> Login </Nav.Link>
            </Nav>
          )
         }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>)
}

export default Header