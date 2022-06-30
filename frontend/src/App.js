import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from './Screens/LandingPage/LandingPage';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import MyNotes from './Screens/MyNotes/MyNotes';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import CreateNote from './CreateNote/CreateNote';
import SingleNote from './CreateNote/SingleNote';
import { useState } from 'react';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';

function App() {


  const [search, setSearch] = useState("")
  console.log(search);

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
       
        <Routes>
        <Route  path="/" element={<LandingPage/>}/>
        <Route  path="/login" element={<LoginScreen/>}/>
        <Route  path="/profile" element={<ProfileScreen/>}/>
        <Route  path="/register" element={<RegisterScreen/>}/>
        <Route  path="/mynotes/createnote" element={<CreateNote/>}/>
        <Route  path="/mynotes" element={<MyNotes search={search} />}/>
        <Route  path="/note/:id" element={<SingleNote/>}/>
        </Routes>

      </main>

      <Footer/>

    </BrowserRouter>
  );
}

export default App;
