import React from "react";
import "./style.css";
import { MapPin } from "lucide-react";
import ProfileImg from "../../assests/profile.png";
const MutuallyProfileCard = ({userData}) => {
  return (
    <div className="mutually-profile-card">
      <img src={userData?.profileImage} alt="" />
      <div className="mutually-profile-card-text">
        <span>{userData?.firstName} {userData?.lastName}, 25</span>
        <div className="location">
          <MapPin color="white" size={10} />
          <span>{userData?.location}</span>
        </div>
      </div>
    </div>
  );
};

export default MutuallyProfileCard;
