import React from 'react'
import './style.css'
import Logo from '../../assests/logo.png'
import BannerImg from '../../assests/blog-card.png'
import {NavLink} from 'react-router-dom'
const Banner = ({heading,subHeding,poster}) => {
  return (
    <div className="banner">
    <img src={BannerImg} alt="" />
    <div className="banner-header">
      <div className="banner-headre-logo">
        <img src={Logo} alt="" />
      </div>
      <div className="banner-header-btn">
      <NavLink to={'/login'} > <button>Login</button> </NavLink> 
      </div>
    </div>
    <div className="banner-text">
      <span>{heading}</span>
      <p>{subHeding}</p>
    </div>
  </div>
  )
}

export default Banner