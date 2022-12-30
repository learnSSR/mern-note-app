import './App.css';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import LandingPage from './Screens/LandingPage/LandingPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route , Routes } from 'react-router-dom';
import MyNotes from './Screens/My Notes/MyNotes';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import CreateNote from './Screens/CreateNote/CreateNote';
import EditNote from './Screens/EditNote/EditNote';
import StarNotes from './Screens/StarNotes/StarNotes';
import Profile from './Screens/Profile/Profile';

function App() {
  console.log("running")
  const [search, setSearch] = useState('')
  return (<>
  <BrowserRouter>
        <Header search={search} setSearch={setSearch} /> 
        <main>
          <Routes>
            <Route  path='/'          element={<LandingPage />} />
            <Route  path='/login'     element={<LoginScreen />} />
            <Route  path='/register'  element={<RegisterScreen />} />
            <Route  path='/profile'   element={<Profile />} />

            <Route  path='/mynotes'   element={<MyNotes search={search}  />} />
            <Route  path='/starred'   element={<StarNotes search={search}  />} />
            <Route  path='/create'    element={<CreateNote />} />
            <Route  path='/notes/:id' element={<EditNote />} />
          </Routes>
        </main>
        <Footer />
  </BrowserRouter>

  </>);
}

export default App;
