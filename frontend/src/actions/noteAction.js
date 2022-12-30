import axios from "axios"
import { NOTES_CREATE_FAIL,
         NOTES_CREATE_REQUEST,
         NOTES_CREATE_SUCCESS, 
         NOTES_DELETE_FAIL, 
         NOTES_DELETE_REQUEST, 
         NOTES_DELETE_SUCCESS, 
         NOTES_LIST_FAIL, 
         NOTES_LIST_REQUEST, 
         NOTES_LIST_SUCCESS,
         NOTES_STAR_FAIL,
         NOTES_STAR_REQUEST,
         NOTES_STAR_SUCCESS,
         NOTES_UPDATE_FAIL,
         NOTES_UPDATE_REQUEST, 
         NOTES_UPDATE_SUCCESS } from "../constants/noteConstant"

export const getNotes = ()=>async (dispatch, getState)=>{
    console.log(getState())
    const { userLogin:{ userInfo } } = getState()
    try {
        dispatch({type:NOTES_LIST_REQUEST})
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const { data }= await axios.get('/api/notes',config);
        dispatch({type:NOTES_LIST_SUCCESS, payload:data})
        
    } catch (error) {
        console.log(error)
        dispatch({type:NOTES_LIST_FAIL, payload:error.message})
    }
}

export const createNote = (title, content, category)=> async (dispatch, getState)=>{
  try {
    dispatch({type:NOTES_CREATE_REQUEST})

    const { userLogin:{ userInfo } } = getState()
    
    const config = {
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${userInfo.token}`
        }
      }
      
    const { data } = await axios.post('/api/notes/create',
    {title,content,category},
    config)
    
    dispatch({type:NOTES_CREATE_SUCCESS, payload:data})
  } catch (error) {
    console.log(error)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_CREATE_FAIL,
      payload: message,
    });
  }
}

export const UpdateNote = (id, title, content, category)=> async (dispatch, getState)=>{
  try {
    dispatch({type: NOTES_UPDATE_REQUEST})

    const { userLogin:{ userInfo } } = getState()
    
    const config = {
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${userInfo.token}`
        }
      }
      
      const { data } = await axios.put(`/api/notes/${id}`,
                            {title,content,category},
                            config)
     
      dispatch({type:NOTES_UPDATE_SUCCESS, payload:data , success: true})

  } catch (error) {
    console.log(error)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_UPDATE_FAIL,
      payload: message,
      success: false
    });
  }
}

export const DeleteNote = (id)=>async(dispatch, getState)=>{
   try {
    dispatch({type: NOTES_DELETE_REQUEST})

    const { userLogin:{ userInfo } } = getState()
    
    const config = {
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${userInfo.token}`
        }
      }
      
      const { data } = await axios.delete(`/api/notes/${id}`,
                             config)
     
      dispatch({type:NOTES_DELETE_SUCCESS, payload:data , success: true})
   } catch (error) {
    console.log(error)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_DELETE_FAIL,
      payload: message,
      success: false
    });
   }
}

export const  StarredNote = (id, star)=> async(dispatch, getState)=>{
   try {
    dispatch({type: NOTES_STAR_REQUEST})

    const { userLogin:{ userInfo} } = getState()
   console.log(userInfo.token)
    const config = {
      headers:{
        "Content-type":"application/json",
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`/api/notes/starred/${id}`,
                      {star},
                      config)
    dispatch({type: NOTES_STAR_SUCCESS, payload:data})
   } catch (error) {
    console.log(error)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_STAR_FAIL,
      payload: message,
      success: false
    });
   }
}