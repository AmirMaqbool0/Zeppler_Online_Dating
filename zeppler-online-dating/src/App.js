// import logo from './logo.svg';
import './App.css';
import { Routing } from './component/Routing/Routing';
import Logo from './assests/logo.png'

function App() {
  return (
    <div>
    <div className="App">
      <Routing/>
    </div>
    {/* <div className='small-device-text'>
      <div className='small-device-box'>
         <div className='small-device-logo'> 
           <img src={Logo} />
         </div>
          <div className='small-device-text-box'>
           <span>"Optimized for desktop viewing. Please use a larger device."</span>
          </div>
      </div>
    </div> */}

    </div>
  );
}

export default App;