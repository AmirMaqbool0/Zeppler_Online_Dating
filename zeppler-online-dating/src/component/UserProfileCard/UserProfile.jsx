
import './style.css';
import { Mail } from 'lucide-react';
import CoverBackground from '../../assests/cover.png';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../../assests/notfound.png'
import { setOtherUser } from '../../redux/userUid';

const UserProfile = ({ btnText, icon ,userData,link}) => {
  const dispatch=useDispatch()


  return (
    <div className='user-profile-container'>
      <div className="user-profile-cover">
        {
          userData?.images?.[0] ? (<img src={ userData?.images?.[0]} />) :
          (<img src={NotFound} />)
        }
        
      </div>
      <div className="user-profile-logo">
      {
          userData?.profileImage ? (<img src={ userData?.profileImage} />) :
          (<img src={NotFound} />)
        }
      </div>
      <div className="user-profile-text">
        <span>{userData?.firstName ? userData?.firstName :'N/A'} {userData?.lastName ? userData?.lastName:'N/A'}</span>
        <p>{userData?.location ? userData?.location :'N/A'}</p>
      </div>
      <div className="user-profile-btn" onClick={()=>dispatch(setOtherUser(userData?.uid)) }>
        {
          icon === 'message' ? <Mail color='#172542' size={14} /> : <Pencil color='#172542' size={14} />
        }
        <Link to={`/${link}`} style={{ textDecoration: 'none' }}>
          <span>{btnText}</span>
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
