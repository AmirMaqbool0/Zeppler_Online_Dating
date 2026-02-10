import React from 'react';
import './style.css';
import { Ellipsis } from 'lucide-react';
import NotFound from '../../assests/notfound.png'
const MatchesUserBox = ({ odd, userData }) => {
  const locationShortened1 = userData?.user1?.location ? userData.user1.location.slice(0, 3) : '';
  const locationDisplay1 = userData?.user1?.location && userData.user1.location.length > 10 ? `${locationShortened1}...` : locationShortened1;

  const locationShortened2 = userData?.user2?.location ? userData.user2.location.slice(0, 10) : '';
  const locationDisplay2 = userData?.user2?.location && userData.user2.location.length > 10 ? `${locationShortened2}...` : locationShortened2;

  return (
    <div className={`matches-user-box-container ${odd ? 'odd-background' : 'even-background'}`}>
      <span>001</span>
      <div className="matches-user-box-user">
        <img src={userData?.user1?.profileImage ? userData?.user1?.profileImage : NotFound} alt="" />
        <span>{userData?.user1?.firstName}</span>
      </div>
      <div className="matches-user-box-user">
        <img src={userData?.user2?.profileImage ? userData?.user2?.profileImage : NotFound} alt="" />
        <span>{userData?.user2?.firstName}</span>
      </div>
      <span>Single</span>
      <span>{locationDisplay1}</span>
      <span style={{ width: 'auto' }}><Ellipsis /></span>
    </div>
  );
};

export default MatchesUserBox;
