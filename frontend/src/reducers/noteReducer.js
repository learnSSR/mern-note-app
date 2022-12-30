import { NOTES_LIST_REQUEST, NOTES_LIST_FAIL, NOTES_LIST_SUCCESS, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_CREATE_FAIL, NOTES_UPDATE_REQUEST, NOTES_UPDATE_SUCCESS, NOTES_UPDATE_FAIL, NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS, NOTES_DELETE_FAIL, NOTES_STAR_REQUEST, NOTES_STAR_SUCCESS, NOTES_STAR_FAIL } from "../constants/noteConstant";

export const NoteReducer=(state={ noteList:[] }, action)=>{
    console.log("notereduer", action)
        switch (action.type) {
            case NOTES_LIST_REQUEST:
                return {loading:true}
                
            case NOTES_LIST_SUCCESS:
                return {loading:false, noteList:action.payload}
            
            case NOTES_LIST_FAIL:
                return {loading:false, error:action.payload}
            default:
                return state
        }
}

export const noteCreateReducer=(state={}, action)=>{
        switch (action.type) {
            case NOTES_CREATE_REQUEST:
                return{loading:true};
            
            case NOTES_CREATE_SUCCESS:
                return {loading:false, success:true}
            
            case NOTES_CREATE_FAIL:
                return {loading:false, error:action.payload, success:false}
        
            default:
               return state;
        }
}

export const noteUpdateReducer=(state={}, action)=>{
    switch (action.type) {
        case NOTES_UPDATE_REQUEST:
            return{loading:true};
        
        case NOTES_UPDATE_SUCCESS:
            return {loading:false, info:action.payload ,success:true}
        
        case NOTES_UPDATE_FAIL:
            return {loading:false, error:action.payload, success:false}
    
        default:
           return state;
    }
}

export const noteDeleteReducer=(state={}, action)=>{
    switch (action.type) {
        case NOTES_DELETE_REQUEST:
            return { loading:true }
            
        case NOTES_DELETE_SUCCESS:
            return { loading: false, info:action.payload ,success:true}
        
        case NOTES_DELETE_FAIL:
            return { loading : false, error: action.payload, success:false}

        default:
           return state
    }
}

export const noteStarReducer = (state={}, action)=>{
    console.log(action)
    switch (action.type) {
        case NOTES_STAR_REQUEST:
            return { loading:true }
            
        case NOTES_STAR_SUCCESS:
            return { loading: false, info:action.payload ,success:true}
        
        case NOTES_STAR_FAIL:
            return { loading : false, error: action.payload, success:false}

        default:
           return state
    }
}