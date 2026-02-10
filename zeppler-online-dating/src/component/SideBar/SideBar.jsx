import React from 'react'
import './style.css'
import Logo from '../../assests/logo.png'
 import {Power,ArrowRight,LayoutDashboard,Heart,Mail,CircleHelp,User, Users} from 'lucide-react'
import { NavLink } from 'react-router-dom';
import { app } from '../../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import {getFirestore,doc,updateDoc} from 'firebase/firestore'


const SideBar = () => {
  const uid = useSelector((state)=> state.uid.uid)
  const db = getFirestore (app)
  const auth =getAuth(app)
  const logOutUser = async () => {
    try {
      await signOut(auth);   
      await getAndUpdateUserStatus(); 
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const getAndUpdateUserStatus = async () => {
    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        status: false
      });
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };
   
  return (
    <div className='sidebar-container'>
        <div className="sidebar-logo">
          <img src={Logo} alt="" />
        </div>

        <div className="sidebar-links">
           <NavLink to={'/userdashboard'} style={{textDecoration:'none'}}>
          <div className="sidebar-link">
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
          <NavLink to={'/messages'} style={{textDecoration:'none'}}>
          <div className="sidebar-link">
          <Mail color='white'/>
            <span>Messages</span>
          </div>
          </NavLink>
          <NavLink to={'/myprofile'} style={{textDecoration:'none'}}>
          <div className="sidebar-link">
          <User color='white'/>
            <span>My Profile</span>
          </div>
          </NavLink>
          <NavLink to={'/faq'} style={{textDecoration:'none'}}> <div className="sidebar-link">
          <CircleHelp color='white'/>
            <span>Faq</span>
          </div>
          </NavLink>
        </div>
        <NavLink to={'/'} style={{textDecoration:'none',width:'100%',marginLeft:'25px'}} > 
        <div className="side-bar-logout-btn" onClick={logOutUser}>
             <div className="sidebar-btn-left">
             <Power  color='white'/>
              <span>Logout</span>
             </div>
             <div className="sidebar-btn-right">
             <ArrowRight color='white'  />
             </div>
        </div>
        </NavLink>
    </div>
  )
}

export default SideBar