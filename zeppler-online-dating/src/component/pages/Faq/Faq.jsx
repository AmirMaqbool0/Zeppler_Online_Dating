import React, { useState } from 'react'
import './style.css'
import SideBar from '../../SideBar/SideBar'
import DashboardHeader from '../../DashboardHeader/DashboardHeader'
import FaqContent from '../FaqContent/FaqContent'
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

const Faq = () => {
  const [sidebar,setSidebar] =useState(false)
  const showSidebar =() =>{
   setSidebar(!sidebar)
  }
  return (
    <div className='faq-container'>
      <button onClick={showSidebar} className={`${sidebar ? 'faq-toggle-btn' : 'faq-toggle-btn2'}`}>
          {sidebar ? <Menu color='white' size={14} /> : <Menu color='white' size={14} />}
        </button>
        <div className={`${sidebar ? 'show-faq-sidebar' : 'faq-sidebar'}`}>
            <SideBar/>
        </div>
        <div className="faq-content">
            <DashboardHeader />
            <div className="faq-content-box-box">
                <FaqContent/>
            </div>
        </div>
    </div>
  )
}

export default Faq