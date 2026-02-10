import React, { useEffect, useState } from 'react'
import './style.css'
import { Cake,Shield,Gem,MapPin,Ruler,Weight,BookUser } from 'lucide-react';

const UserAbout = ({userData}) => {
  return (
    <div className='user-about-container'>
        <div className="user-about-heading">
            <span>{userData?.firstName} {userData?.lastName}</span>
        </div>
        <div className="user-about-content">
        <div className="user-info-box">
          <Cake color='#172542'/>
            <div className="info-box-text">
                <span>Date of Birth</span>
                <p>{userData?.dob ? userData?.dob : 'N/A'}</p>
            </div>
        </div>

        <div className="user-info-box">
          <Shield color='#172542'/>
            <div className="info-box-text">
                <span>Gender</span>
                <p>{userData?.gender ? userData?.gender :'N/A'}</p>
            </div>
        </div>

        <div className="user-info-box">
          <Gem color='#172542'/>
            <div className="info-box-text">
                <span>Marital Status</span>
                <p>Single</p>
            </div>
        </div>

        <div className="user-info-box">
          <Ruler color='#172542'/>
            <div className="info-box-text">
                <span>Height</span>
                <p>{userData?.height ? userData?.height : 'N/A' } cm</p>
            </div>
        </div>

        <div className="user-info-box">
          <Weight color='#172542'/>
            <div className="info-box-text">
                <span>Weight</span>
                <p>{userData?.weight ? userData?.weight :'N/A' } lbs</p>
            </div>
        </div>

        <div className="user-info-box">
          <MapPin color='#172542'/>
            <div className="info-box-text">
                <span>Location</span>
                <p>{userData?.location ? userData?.location :'N/A'}</p>
            </div>
        </div>

        <div className="user-bio-box">
          <BookUser color='#172542'  size={24}/>
            <div className="info-box-text">
                <span>Bio</span>
                <p>{userData?.bio ? userData?.bio :'N/A' }</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default UserAbout