import React from 'react'
import './style.css'
import NotFound from '../../assests/notfound.png'
import {useSelector} from 'react-redux'
const DashboardHeader = () => {
  const userData = useSelector((state) => state.uid.userData)
  return (
    <div className='dashboard-header-container'>
      <div className="dashboard-header-text">
        <span>Hello, {userData?.firstName}</span>
      </div>
      <div className="dashboard-header-logo">
        {
      userData?.profileImage ? (<img src={userData?.profileImage} alt={''} />) :
      (<img src={NotFound} alt="" />)
        }
      </div>
    </div>
  )
}

export default DashboardHeader