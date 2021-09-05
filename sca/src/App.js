import React,{useState,useEffect} from 'react';

import { getAuth,onAuthStateChanged, signOut } from "firebase/auth";

import logo from './assets/images/pepebaq.png';
import './css/App.css';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import Auth from './Auth';


const App = () => {

  const [user, setUser] = useState(null);
  const auth = getAuth();


  const authListener = () => {
    onAuthStateChanged(auth,(user) => {
        if(user){
          setUser(user);
        }else{
          setUser(null);
        }
    });
  }

  useEffect(()=> {
    authListener();
  },[])


  const logout = () => {
    signOut(auth)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          user ? 
            <div>
              <p>
                You LOGGED IN ?! WOAH ITS WORKING LETS GOOO 
              </p>
              <Button onClick={logout} type="primary">Logout</Button>
            </div>
          
        :
          <Auth user/>
        }
        
      </header>
    </div>
  );
}

export default App;
