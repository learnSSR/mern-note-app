import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col ,Spinner} from "react-bootstrap";
import MainScreen from "../../Component/MainScreen";
// import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfile } from "../../actions/userAction";
import Loading from "../../Component/Loading";
import ErrorMessage from "../../Component/Error";
import { useNavigate } from "react-router-dom";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [imageUploading, setImageUploading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, success } = userProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);
  
  useEffect(()=>{
    if (success){
      navigate('/mynotes')
    }

  },[navigate,success])
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

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(UpdateProfile( name, email, password, pic ));
  };

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Change Profile Picture</Form.Label>
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
              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" style={{width: 500}} />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;