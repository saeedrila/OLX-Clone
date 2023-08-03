import React, { useContext,useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()

  const handleLogin = async (e)=>{
    e.preventDefault();
    try{
      //Login with email and password
      const result = await firebase.auth().signInWithEmailAndPassword(email, password)
      //Print result in the console
      console.log(result)
      //Redirect to home
      history.push('/home')
      //Error handling
    } catch (error) {
      alert(error.message);
    }
  }

  const handleSignupClick = ()=>{
    history.push('/signup');
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img alt='#' width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={handleSignupClick}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
