import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/nav';
import Homee from './Components/Homee';
import CreatePost from './Components/Createpostss';
import PostStates from './Context/PostStates';
import Feed from './Components/Feed';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
import Alert from './Components/Alert';

function App() {
  const [alert,setAlert] = useState({type:"" , message:""})
  const showAlert = (type,message)=>{
    setAlert({
      type:type , 
      message:message
    })
    setTimeout(() => {
      setAlert(null)
    },1500);
  }
  return (
    <>
    {/* context */}
    <PostStates>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container" style={{marginTop:30}}>
    <Routes>
    <Route exact path="/login" element={<Login showAlert = {showAlert}/>}></Route>
    <Route exact path="/signup" element={<Signup showAlert = {showAlert} />}></Route>
    <Route exact path="/createpostss" element={<CreatePost showAlert = {showAlert} />}></Route> 
    <Route exact path="/" element={<Homee showAlert = {showAlert} />}></Route>
    <Route exact path="/feed" element={<Feed showAlert = {showAlert} />}></Route>
    </Routes>
    </div>
    </BrowserRouter>
    </PostStates>

    
    </>
  );
}

export default App;
