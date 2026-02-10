import React from 'react'
import {Power,ArrowRight,LayoutDashboard,Heart,Mail,CircleHelp,User, Users, CircleDollarSign, CalendarClock, Settings} from 'lucide-react'
import Logo from '../../assests/logo.png'
import {NavLink} from 'react-router-dom'
import './style.css'
import { app } from '../../firebase'
import { getAuth, signOut } from 'firebase/auth'

const Sidebar = () => {
  const auth = getAuth(app)
  const logOut = () =>{
     signOut(auth)
  }
  return (
    <div className='sidebar-container'>
    <div className="sidebar-logo">
      <img src={Logo} alt="" />
    </div>

    <div className="sidebar-links">
     
    <NavLink to={'/'} style={{textDecoration:'none'}}> <div className="sidebar-link">
      <LayoutDashboard color='white' />
        <span>Dashboard</span>
      </div>
      </NavLink> 
       <NavLink to={'/matches'} style={{textDecoration:'none'}}>
       <div className="sidebar-link">
      <Heart color='white' />
        <span>Matches</span>
      </div>
      </NavLink>
     <NavLink to={'users'}  style={{textDecoration:'none'}}>
       <div className="sidebar-link">
      <Users color='white'/>
        <span>Users</span>
      </div>
      </NavLink>
     <NavLink to={'/interviews'} style={{textDecoration:'none'}}>
      <div className="sidebar-link">
      <CalendarClock color='white'/>
        <span>Interviews</span>
      </div>
      </NavLink>
     <NavLink to={'/payment'} style={{textDecoration:'none'}}>
       <div className="sidebar-link">
      <CircleDollarSign color='white'/>
        <span>Payment</span>
      </div>
      </NavLink>
      <NavLink to={'/settings'} style={{textDecoration:'none'}}>
      <div className="sidebar-link">
      <Settings color='white'/>
        <span>Settings</span>
      </div>
      </NavLink>
    </div>
   
    <div className="side-bar-logout-btn" onClick={logOut}>
         <div className="sidebar-btn-left">
         <Power  color='white'/>
          <span>Logout</span>
         </div>
         <div className="sidebar-btn-right">
         <ArrowRight color='white'  />
         </div>
    </div>
</div>
  )
}

export default Sidebar