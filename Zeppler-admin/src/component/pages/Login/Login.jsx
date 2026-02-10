import React, { useState } from 'react';
import './style.css';
import { Lock, Mail } from 'lucide-react';
import { app } from '../../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const auth = getAuth(app);

  const login = () => {
    setErrorMessage(''); // Reset error message

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Login successful
      })
      .catch((error) => {
        // Handle login errors
        setErrorMessage('Incorrect email or password. Please try again.'); // Set error message
      });
  };

  return (
    <div className='login-main'>
      <div className='login-container'>
        <div className="login-content">
          <div className="login-side-text">
            <span>Welcome to</span>
            <h1>Zeppler Online Dating for Singles</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation.</p>
          </div>
          <div className='login-container-form'>
            <div className="login-box">
              <div className="login-heading">
                <span>Zeppler</span>
              </div>
              <div className="login-inputs">
                <div className="input-box">
                  <Mail />
                  <input
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <Lock />
                  <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button onClick={login}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
