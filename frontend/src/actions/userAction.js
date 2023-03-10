import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL } from "../constants/userConstant"

export const Login = (email,password)=> async (dispatch)=>{
  console.log(email,password)
    try {
        dispatch({type:USER_LOGIN_REQUEST})

        const config = {
            headers:{
              "Content-type":"application/json"
            }
          }    

        const { data } = await axios.post('/api/users/login',
            {email,password},
            config
        )
        console.log(data)
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch({type: USER_LOGIN_FAIL, payload: error})
    }
}

export const LogOut = ()=>(dispatch)=>{
  localStorage.removeItem("userInfo")
  dispatch({type: USER_LOGOUT})

}

export const Register =(name, email, password, pic)=>async (dispatch)=>{

  try {
    dispatch({type:USER_REGISTER_REQUEST})
    
    const config = {
      headers:{
        "Content-type":"application/json"
      }
    }    

  const { data } = await axios.post('/api/users',
      {name,email,password, pic},
      config
  )

  dispatch({type:USER_REGISTER_SUCCESS, payload:data})

  } catch (error) {
    dispatch({type:USER_REGISTER_FAIL, payload: error })

  }
}

export const UpdateProfile = (name, email, password, pic)=>async (dispatch, getState)=>{
  try {
    dispatch({type:USER_PROFILE_REQUEST})
    
    const { userLogin:{ userInfo} } = getState()

    const config = {
      headers:{
        "Content-type":"application/json",
        Authorization:`Bearer ${userInfo.token}`
      }
    }    

    const { data } = await axios.put('/api/users/profile',
                     {name, email, password,pic},
                     config)
   dispatch({type:USER_PROFILE_SUCCESS, payload:data})
  } catch (error) {
    console.log(error)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: message,
      success: false
    });
  }  
}