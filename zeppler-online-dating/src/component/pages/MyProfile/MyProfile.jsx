import React, { useEffect, useState } from 'react'
import './style.css'
import SideBar from '../../SideBar/SideBar'
import DashboardHeader from '../../DashboardHeader/DashboardHeader'
import UserProfile from '../../UserProfileCard/UserProfile'
import UserAbout from '../../UserAbout/UserAbout'
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useSelector } from 'react-redux'
const MyProfile = () => {
  const [sidebar,setSidebar] =useState(false)
  const showSidebar =() =>{
   setSidebar(!sidebar)
  }
  const userData = useSelector((state) => state.uid.userData)
  return (
    <div className='my-profile-container'>
        <button onClick={showSidebar} className={`${sidebar ? 'myProfile-toggle-btn' : 'myProfile-toggle-btn2'}`}>
          {sidebar ? <Menu color='white' size={14} /> : <Menu color='white' size={14}/>}
        </button>
        <div className={`${sidebar ? 'show-myProfile-sidebar' : 'my-profile-sidebar'}`}>
            <SideBar/>
        </div>
        <div className="my-profile-content">
   <DashboardHeader/>
   <div className="my-profile-content-box">
    <div className="my-profile-profile-box">
        <UserProfile btnText={'Edit Profile'} userData={userData} link={'profilesetup'}/>
    </div>
    <div className="my-profile-about-box">
  <UserAbout userData={userData}/>
    </div>
   </div>
        </div>
    </div>
  )
}

export default MyProfile