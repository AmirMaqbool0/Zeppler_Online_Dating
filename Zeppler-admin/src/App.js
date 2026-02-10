import './App.css';
import Routing from './component/Routing/Routing';
import Logo from './assests/logo.png';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import Login from './component/pages/Login/Login';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedin(true);
        console.log("login");
      } else {
        setIsLoggedin(false);
        console.log('Not Login');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []); 

  return (
    <div>
      <div className="App">
        {isLoggedin ? <Routing /> : <Login />}
      </div>
      <div className='small-device-text'>
        <div className='small-device-box'>
          <div className='small-device-logo'> 
            <img src={Logo} alt="Logo" />
          </div>
          <div className='small-device-text-box'>
            <span>"Optimized for desktop viewing. Please use a larger device."</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
