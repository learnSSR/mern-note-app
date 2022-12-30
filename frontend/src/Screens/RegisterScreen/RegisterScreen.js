import React, { useEffect, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import MainScreen from '../../Component/MainScreen'
import Loading from '../../Component/Loading'
import Error from '../../Component/Error'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'

function RegisterScreen() {
  const [ checked, setChecked] = useState(false)
  const [ checked2, setChecked2] = useState(false)
  const [myname, setMyname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate();
  const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")
  // const [error, setError] = useState(false)
  // const [loading, setLoading] = useState(false)
  const [message ,setMessage] = useState("")
  const [picMessage, setPicMessage] = useState("")
  const [imageUploading, setImageUploading] = useState(false)
  
  const dispatch = useDispatch()
  const { userRegister } = useSelector(state=>state)
  const { loading, error, userInfo } = userRegister
  

  useEffect(() => {
    if (userInfo){
      navigate('/note')
    }
  }, [navigate, userInfo])
  

  const handleSubmit =async (e)=>{
    e.preventDefault()
    console.log(myname)
    console.log(email)
    console.log(password)
    console.log(pic)

    if (password !== confirmPassword){
      setMessage("Password Doest Not match")
    } else {

     dispatch(Register(myname,email,password,pic))
    //   try {
    //     const config = {
    //       headers:{
    //         "Content-type":"application/json"
    //       }
    //     }

    //     setLoading(true)
    //     const { data } = await axios.post('/api/users',{
    //      name: myname,
    //      email,
    //      password,
    //      pic
    //     }, config)

    //     console.log(data)
    //     setLoading(false)
    //   } catch (error) {
    //      setLoading(false)
    //      setError(true)
    //   }
    }

  }

  const postDetails = (pics) => {
    console.log(pics)
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notifyapp");
      data.append("cloud_name", "dllyonk6e");
      data.append("api_key", '783545956449181');
      console.log(data)
      setImageUploading(true)
      fetch("https://api.cloudinary.com/v1_1/dllyonk6e /upload", {
        method: "post",
        body: data,
      }).then((res) => res.json())
        .then((data) => {
          console.log("url",data)
          setImageUploading(false)
          setPic(data.url.toString());
        })
        .catch((err) => {
          setImageUploading(false)
          console.log("err",err);
        });
    } else {
      console.log("elsee")
      return setPicMessage("Please Select an Image");
    }
  };

  //https://res.cloudinary.com/dllyonk6e/image/upload/
 console.log(message)
  return (<>
    <MainScreen title='REGISTER'>
    <div className="registerContainer">
      {error && <Error variant='danger'>{"User Aleardy Exist With Given Email Id"}</Error>}
      {message && <Error variant='danger'>{message}</Error>}
      {loading && <Loading />}

      <Form onSubmit={(e)=>handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Password" 
         value={myname}
         onChange={(e)=>setMyname(e.target.value)}

         required
        />
      </Form.Group>

        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type={checked?"text":"password"} placeholder="Password" 
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         required
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
     
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type={checked2?"text":"password"} placeholder="Confirm Password" 
         value={confirmPassword}
         onChange={(e)=>setConfirmPassword(e.target.value)}
         required
        />
          <Form.Check
            inline
            label="Show Password"
            name="group1"
            type='checkbox'
            checked={checked2}
            onChange={()=>setChecked2(!checked2)}
          />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Profile Picture</Form.Label>
        <div style={{display:'flex'}}>

        <Form.Control type="file" placeholder="Upload Your Picture" 
           onChange={(e)=>postDetails(e.target.files[0])}
        />
        { imageUploading && <Spinner
        style={{
          width: 20,
          height: 18,
          marginTop: 8,
          marginLeft: 13
        }}
        animation="border"
      /> }
        </div>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </MainScreen>
  </>)
}

export default RegisterScreen