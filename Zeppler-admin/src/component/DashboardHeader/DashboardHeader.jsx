import React from 'react'
import './style.css'
import UserLogo from '../../assests/userlogo.png'
const DashboardHeader = () => {
  return (
    <div className='dashboard-header-container'>
    <div className="dashboard-header-text">
      <span>Hello, Arthur</span>
    </div>
    <div className="dashboard-header-logo">
      <img src={UserLogo} alt="" />
    </div>
  </div>
  )
}

export default DashboardHeader