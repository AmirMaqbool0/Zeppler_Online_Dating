import React, { useEffect, useState } from 'react'
import './style.css'
import SideBar from '../../SideBar/SideBar'
import DashboardHeader from '../../DashboardHeader/DashboardHeader'
import UserProfile from '../../UserProfileCard/UserProfile'
import UserAbout from '../../UserAbout/UserAbout'
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useParams } from 'react-router-dom'
import { app } from '../../../firebase'
import { getFirestore ,doc,getDoc } from 'firebase/firestore'

const UserDetail = () => {
  const [sidebar,setSidebar] =useState(false)
  const [userData,setUserData] =useState({})
  const showSidebar =() =>{
   setSidebar(!sidebar)
  }
  const {id} = useParams()
  const db =getFirestore(app)
   const getUser = async () =>{
    const docref = doc(db,'users',id)
    const result = await getDoc(docref)
    setUserData(result.data())
   }
   useEffect(()=>{
   getUser()
   },[])
   console.log(userData)
  return (
    <div className='user-detail-container'>
        <button onClick={showSidebar} className={`${sidebar ? 'user-toggle-btn' : 'user-toggle-btn2'}`}>
          {sidebar ? <Menu color='white' size={14} /> : <Menu color='white' size={14} />}
        </button>
       <div className={`${sidebar ? 'show-user-detail-sidebar' : 'user-detail-sidebar'}`}>
        <SideBar/>
       </div>
       <div className="user-detail-content">
        <DashboardHeader/>
        <div className="user-detail-content-box">
            <div className="user-profile-box">
                <UserProfile btnText={'Message'} icon={'message'} userData={userData} link={'messages'}/>
            </div>
            <div className="user-proile-about-box">
                <UserAbout userData={userData}/>
            </div>
        </div>
       </div>
    </div>
  )
}
export default UserDetail