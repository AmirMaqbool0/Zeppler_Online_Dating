import React from 'react';
import './style.css';
import UserLogo from '../../assests/userlogo.png';
import { Eye } from 'lucide-react';
import NotFound from '../../assests/notfound.png'

const ActiveUserBox = ({ odd, userData }) => {
  const locationShortened = userData?.location ? userData.location.slice(0, 10) : '';
 
  const locationDisplay = userData?.location && userData.location.length > 10 ? `${locationShortened}...` : locationShortened;

  return (
    <div className={`active-user-box-container  ${odd ? 'odd-background' : 'even-background'}`}>
      <div className="active-user-left">
        <span>001</span>
        <div className="left-user">
          <img src={userData?.profileImage ? userData?.profileImage : NotFound} alt="" />
          <span>{userData?.firstName}</span>
        </div>
      </div>
      <div className="active-user-right">
        <span>{userData?.gender}</span>
        <span>{userData?.dob}</span>
        <span>{userData?.height} cm</span>
        <span>{userData?.weight} lbs</span>
        <span>Single</span>
        {/* Display shortened location with ellipsis if necessary */}
        <span>{locationDisplay}</span>
        <span><Eye /></span>
      </div>
    </div>
  );
};

export default ActiveUserBox;
