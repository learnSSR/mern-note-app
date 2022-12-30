import React, { useEffect } from 'react'
import {Row, Container , Button} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate()
    const userLogin = useSelector(state=>state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
      if (userInfo){
        navigate('/mynotes')
      }
    
    }, [navigate, userInfo])
    

  return (
    <div className='main'>
        <Container>
            <Row>
               <div className="intro-text">
                <div>
                    <h1 className='title'>Welcome To NoteTify</h1>
                    <p className='subtitle'>One safe place for all your notes</p>
                </div>
                <div className='buttonContainer'>
                    <Link to="/login">
                        <Button size='lg' className='landingButton' >Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button size='lg' variant='outline-primary' className='landingButton' >Register</Button>
                    </Link>
                </div>
               </div>
            </Row>
        </Container>
    </div>
  )
}

export default LandingPage