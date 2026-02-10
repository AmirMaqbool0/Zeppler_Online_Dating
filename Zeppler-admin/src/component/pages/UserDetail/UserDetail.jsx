import React, { useEffect, useState } from "react";
import "./style.css";
import NotFound from "../../../assests/notfound.png";
import CoverBackground from "../../../assests/cover.png";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import {
  Cake,
  Shield,
  Gem,
  MapPin,
  Ruler,
  Weight,
  BookUser,
  User,
} from "lucide-react";
import { app } from "../../../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const [user,setUser] =useState({})
 const {id} = useParams()
 const db =getFirestore(app)
 useEffect(()=>{
   getUser()
 },[])
  const getUser = async () =>{
    const docRef = doc(db,'users',id)
    const result = await getDoc(docRef)
    setUser(result.data())
  }
  return (
    <div className="user-detail-container">
      <DashboardHeader />
      <div className="user-detail-row">
        <div className="user-profile-card">
          <div className="user-profile-container">
            <div className="user-profile-cover">
              <img src={user?.images?.[0] ? user?.images?.[0] :NotFound } alt="" />
            </div>
            <div className="user-profile-logo">
              <img src={user?.profileImage ? user?.profileImage : NotFound } alt="" />
            </div>
            <div className="user-profile-text">
              <span>{user?.firstName} {user?.lastName}</span>
              <p>{user?.location}</p>
            </div>
          </div>
        </div>

        <div className="user-detail-box">
          <div className="user-about-container">
            <div className="user-about-heading">
              <span>About {user?.firstName}</span>
            </div>
            <div className="user-about-content">
              <div className="user-info-box">
                <Cake color="#172542" />
                <div className="info-box-text">
                  <span>Date of Birth</span>
                  <p>{user?.dob}</p>
                </div>
              </div>

              <div className="user-info-box">
                <Shield color="#172542" />
                <div className="info-box-text">
                  <span>Gender</span>
                  <p>{user?.gender}</p>
                </div>
              </div>

              <div className="user-info-box">
                <Gem color="#172542" />
                <div className="info-box-text">
                  <span>Marital Status</span>
                  <p>Single</p>
                </div>
              </div>

              <div className="user-info-box">
                <Ruler color="#172542" />
                <div className="info-box-text">
                  <span>Height</span>
                  <p>{user?.height} cm</p>
                </div>
              </div>

              <div className="user-info-box">
                <Weight color="#172542" />
                <div className="info-box-text">
                  <span>Weight</span>
                  <p>{user?.weight} lbs</p>
                </div>
              </div>

              <div className="user-info-box">
                <MapPin color="#172542" />
                <div className="info-box-text">
                  <span>Location</span>
                  <p>{user?.location}</p>
                </div>
              </div>

              <div className="user-bio-box">
                <BookUser color="#172542"  />
                <div className="info-box-text">
                  <span>Bio</span>
                  <p>
                  {user?.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
