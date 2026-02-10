import React, { useState } from "react";
import "./style.css";
import NotFound from "../../../assests/notfound.png";
import { Cake, Dna, Download, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { app, storage } from '../../../firebase'
import { getData } from "../../../redux/userUid";
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";
import {V4 as uuidv4, v4} from 'uuid'
import HashLoader from 'react-spinners/HashLoader'

const ProfileSetup = () => {
  const userData = useSelector((state) => state.uid.userData)
  const [gender, setGender] = useState(userData?.gender);
  const [dateOfBirth, setDateOfBirth] = useState(userData.dob);
  const [firstName, setFirstName] = useState(userData.firstName)
  const [lastName, setLastName] = useState(userData.lastName)
  const [email, setEmail] = useState(userData.email)
  const [loading,setLoading] =useState(false)
  const [profileImage, setProfileImage] = useState(userData.profileImage || null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null); // State to store selected image preview

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage,`profileImages/${v4()}`);
    await uploadBytes(storageRef,file);
    const imageUrl = await getDownloadURL(storageRef);
    const docRef = doc(getFirestore(app), 'users', userData.uid);
    await updateDoc(docRef, { profileImage: imageUrl });

    setProfileImage(imageUrl);
    setSelectedImagePreview(URL.createObjectURL(file)); // Set selected image preview
  };

  const dispatch = useDispatch()
  const setProfile = async () => {
    setLoading(true)
    if (firstName || lastName || email || gender || dateOfBirth) {
      const docRef = doc(getFirestore(app), 'users', userData.uid);
      await updateDoc(docRef, {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        gender: gender || '',
        dob: dateOfBirth || '',
        profileImage:profileImage
      });
      dispatch(getData({ ...userData, firstName: firstName, lastName: lastName, email, gender, dob: dateOfBirth,profileImage:profileImage }))
      setLoading(false)
    } else {
      console.log('No data to update.');
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-box">
        <div className="profile-setup-heading">
          <div className="profile-setup-heading-text">
            <h1>Zeppler</h1>
            <p>(Online Dating)</p>
          </div>
          <span>Profile Setup</span>
        </div>
        <div className="profile-setup-content">
          <div className="profile-setup-logo">
            {
              selectedImagePreview ? (<img src={selectedImagePreview} alt="" />) :
                (profileImage ? <img src={profileImage} alt="" /> : <img src={NotFound} alt="" />)
            }

            <div className="upload-profile-btn" onClick={() => document.getElementById("profile-photo-input").click()}>
              <button> <Download size={12} /> </button>
            </div>
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              id="profile-photo-input"
              style={{ display: "none" }}
              onChange={handleProfilePhotoUpload}
            />
          </div>
          <div className="profile-setup-text">
            <p>Upload Profile photo</p>
          </div>
        </div>
        <div className="profile-setup-form">
          <div className="profile-setup-name-inputs">
            <div className="first-name">
              <User size={20} color="#172542" />
              <input type="text" placeholder="First Name"
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="last-name">
              <User size={20} color="#172542" />
              <input type="text" placeholder="Last Name"
                value={lastName} onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="profile-setup-email">
            <Mail size={20} color="#172542" />
            <input type="text" placeholder="Email Address"
              value={email} onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
          {/* Gender dropdown */}
          <div className="profile-setup-gender">
            <div className="profile-setup-gender-left">
              <Dna size={20} color="#172542" />
              <label htmlFor="gender">Gender:</label>
            </div>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* Date of Birth input */}
          <div className="profile-setup-dob">
            <div className="dob-left">
              <Cake color="#172542" />
              <label htmlFor="dob">Date of Birth:</label>
            </div>

            <input
              type="date"
              id="dob"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <Link to={'/basicinformation'} style={{ textDecoration: 'none' }}> <div className="profile-setup-btn">
            {
              loading === true ? (<div className="loader">
                <HashLoader color="#FFB049" />
              </div>): (  <button onClick={setProfile}>Continue</button>)
            }
          </div></Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
