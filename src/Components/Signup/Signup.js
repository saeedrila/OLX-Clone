import React, { useState,useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      //Create new customer using email and password
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
      //Updates username for the user
      await result.user.updateProfile({ displayName: username });
      //Adds username and phone detials to the firestore
      await firebase.firestore().collection('users').add({
        id: result.user.uid,
        username: username,
        phone: number,
      });
      //Redirects to '/login' page
      history.push('/login');
      //Error handling and error message
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };
  

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='Logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="Username"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={number}
            onChange={(e)=>setNumber(e.target.value)}
            id="phone"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href='#'>Login</a>
      </div>
    </div>
  );
}
