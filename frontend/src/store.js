import { createStore, combineReducers ,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userProfileReducer, userRegisterReducer } from './reducers/userReducer'
import { noteCreateReducer, noteDeleteReducer, NoteReducer, noteStarReducer, noteUpdateReducer } from './reducers/noteReducer'

const reducer = combineReducers({
    //here reducer will come
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    notes: NoteReducer,
    noteCreate:noteCreateReducer,
    noteUpdate:noteUpdateReducer,
    noteDelete:noteDeleteReducer,
    noteStar: noteStarReducer,
    userProfile:userProfileReducer
})

const initialState = {userLogin:{}}
initialState.userLogin.userInfo = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const middleware = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store