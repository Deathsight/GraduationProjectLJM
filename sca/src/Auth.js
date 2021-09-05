import React,{useState} from "react"

import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore"; 

import './css/App.css';
import './css/Auth.css'
import 'antd/dist/antd.css';
import { Input,Button } from 'antd';
import { UserOutlined,LockOutlined,EyeTwoTone,EyeInvisibleOutlined } from '@ant-design/icons';
import db from './db';
import moment from 'moment'

const Auth = (props) => {

    //constants
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
    const [users,setUsers] = useState([])
    // error Messsages
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    //function to handle user login 
    const handleLogin = () => {
        clearError();
        signInWithEmailAndPassword(auth, email,password)
            .catch(err => {
                switch(err.code){
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                    setEmailError(err.message);
                    break
                    case "auth/wrong-password":
                    setPasswordError(err.message);
                    break
                }
            }
        )
    }

    //function to handle register user 
    const handleSignup = async () => {
        clearError();
        if(email && password){
            let good = true;
            await createUserWithEmailAndPassword(auth, email,password)
                .catch(err => {
                    switch(err.code){
                        case "auth/email-already-in-use":
                        case "auth/invalid-email":
                        setEmailError(err.message);
                        break
                        case "auth/weak-password":
                        setPasswordError(err.message);
                        break
                    }
                    good = false;
                }
            )
            if(good){
                const querySnapshot = await getDocs(collection(db, "users"));
                let temp = [];
                querySnapshot.forEach((doc) => {
                    temp.push({id:doc.id, ...doc.data()});
                });
                setUsers(temp)
                let count = 0
                temp.map(item => {
                        if( item.code.slice(0,4) === (moment().format('YY')+moment().format('MM')) ){
                            count = count + 1
                        }
                    }
                )
                if(count < 10){
                    count = "00"+count
                } else if ( count > 10 < 100 ) {
                    count = "0"+count
                }
                count = moment().format('YY')+moment().format('MM') + count
                await addDoc(collection(db, "users"),{ code : count })
                console.log("testy",good, count)
            }
            console.log("testy",good, moment().format('MM'))
        } else{
            setEmailError('Either the email is wrong or the password')
        }
    }


    const clearInput =()=>{
        setEmail("");
        setPassword("");
    }
    const clearError =()=>{
        setEmailError("");
        setPasswordError("");
    }

    return(
        <div>
            <Input className="inputField" onChange={e => setEmail(e.target.value)} value={email || ''} size="large" placeholder="Email" prefix={<UserOutlined />} />
            <span><p className="error-msg">{emailError}</p></span>
            <Input.Password className="inputField" required
                onChange={e => setPassword(e.target.value)}  value={password || ''} size="large" placeholder="Password" prefix={<LockOutlined />}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            <span><p className="error-msg">{passwordError}</p></span>
            <Button onClick={handleLogin} type="primary">Login</Button>
            <Button onClick={handleSignup} type="primary">Signup</Button>
        </div>
    )
}

export default Auth;