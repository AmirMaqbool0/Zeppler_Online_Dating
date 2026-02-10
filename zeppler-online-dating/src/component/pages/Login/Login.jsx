import React, { useState, useEffect } from 'react';
import './style.css';
import { Lock, Mail } from 'lucide-react';
import Footer from '../../Footer/Footer';
import { app } from '../../../firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { setUserid } from '../../../redux/userUid';
import { NavLink, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(true);
  const [loading,setLoading] =useState(false)
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const db = getFirestore(app);

  const ACTIVITY_TIMEOUT = 2 * 60 * 1000; 
  let activityTimer;

  useEffect(() => {
    startUserActivityTimer();
    // Add event listeners for user activity
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keypress', handleUserActivity);

    return () => {
      clearTimeout(activityTimer);
      // Remove event listeners when the component unmounts
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keypress', handleUserActivity);
    };
  }, []);

  const startUserActivityTimer = () => {
    activityTimer = setTimeout(() => {
      updateUserStatus(false);
    }, ACTIVITY_TIMEOUT);
  };

  const resetUserActivityTimer = () => {
    console.log('User activity timer reset');
    clearTimeout(activityTimer);
    startUserActivityTimer();
  };

  const updateUserStatus = async (status) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateStatusInFirebase(user.uid, status);
        console.log('User status updated in Firebase:', status);
      } catch (error) {
        console.error('Error updating user status in Firebase:', error);
      }
    }
  };

  const login = async () => {
    try {
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in with UID:', user.uid);
      setLoading(false)
      dispatch(setUserid(user.uid));
      await updateStatusInFirebase(user.uid, true);
      setErrorMessage('');
      setError(false);
      navigate('/userdashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      setError(true);
      setErrorMessage('Incorrect password. Please try again.');
    }
  };

  const updateStatusInFirebase = async (uid, status) => {
    const docRef = doc(db, 'users', uid);
    try {
      await updateDoc(docRef, { status: status });
      console.log('User status updated in Firebase:', status);
    } catch (error) {
      console.error('Error updating user status in Firebase:', error);
    }
  };

  const handleUserActivity = () => {
    console.log('User activity detected');
    resetUserActivityTimer();
    updateUserStatus(true);
  };
  
  const submit = (e) => {
    if (e.key === 'Enter') {
      login();
    }
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
                  <input type="text" placeholder='Email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <Lock />
                  <input type="password" placeholder='Password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    required
                    onKeyUp={submit}
                  />
                </div>
                {errorMessage && <p className="login-error-message">{errorMessage}</p>}
                {
                  loading === true ? (<div className='loader'>
                   <HashLoader color="#FFB049" />
                  </div>):(<button onClick={login}>Login</button>) 
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;