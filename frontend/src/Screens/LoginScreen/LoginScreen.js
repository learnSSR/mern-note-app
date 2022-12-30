import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../Component/Loading'
import MainScreen from '../../Component/MainScreen'
import Error from '../../Component/Error'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../../actions/userAction'

function LoginScreen() {
  const [ checked, setChecked] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [error, setError] = useState(false)
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { userLogin={} } = useSelector(state=>state)
  
  const { loading, userInfo, error } = userLogin||{}
  console.log("state")
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (userInfo){
      navigate('/mynotes')
    }
  }, [userInfo])
  

  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(email,password)

    dispatch(Login(email, password))
    // try {
    //   const config = {
    //     headers:{
    //       "Content-type":"application/json"
    //     }
    //   }

    //   setLoading(true)
    //   const { data } = await axios.post('/api/users/login', {
    //     email,password
    //   }, config)
    //   setLoading(false)
    //   console.log(data)
    //   localStorage.setItem('userInfo', JSON.stringify(data))
    // } catch (error) {
    //   console.log("Error : ")//, error.respone.data.message)
    //   console.log(error)
    //   setError(true)
    //   setTimeout(()=>{
    //     setError(false)
    //   }, 2000)
    //   setLoading(false)
    // }


  }
  return (<>
  <MainScreen title={'Login'}>
    <div className="loginContainer">
      {error && <Error variant='danger'>{"Inavlid Email & Password"}</Error>}
      {loading && <Loading />}
  <Form onSubmit={(e)=>handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type={checked?"text":"password"} placeholder="Password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
        />
        <Form.Check
            inline
            label="Show Password"
            name="group1"
            type='checkbox'
            checked={checked}
            onChange={()=>setChecked(!checked)}
          />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      <Row>
        <Col>
         New Customer ? <Link to={'/register'}> Register Here </Link>
        </Col>
      </Row>
    </div>
  </MainScreen>
  </>)
}

export default LoginScreen