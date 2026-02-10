import React from 'react'
import Header from '../../Header/Header'
import './style.css'
import RegistrationForm from '../../RegistrationForm/RegistrationForm'
import Footer from '../../Footer/Footer'
const Home = () => {
  return (
    <div className='home-main'>
    <div className='home-container'>
        <Header/>
        <div className="home-content">
            <div className="side-text">
              <span>Welcome to</span>
              <h1>Zeppler Online Dating for Singles</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation.</p>
            </div>
            <div className="side-registered">
               <RegistrationForm/>
            </div>
        </div>
        
    </div>
    <Footer/>
    </div>
  )
}

export default Home