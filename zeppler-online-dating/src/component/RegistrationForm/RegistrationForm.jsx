import React, { useState } from "react";
import "./style.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { app } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { getData, setUserid } from "../../redux/userUid";
import { Cake } from "lucide-react";
import HashLoader from "react-spinners/HashLoader";



const RegistrationForm = () => {
  const [value, onChange] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(null);
  const [userCreated,setUserCreated] =useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading ,setLoading] =useState(false);

  const options = ["Male", "Female"];
  const db = getFirestore(app);
  const dispatch =useDispatch()
   const navigate=useNavigate()
  const createUserAndAddUserToFirestore = async () => {
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(setUserid(user.uid))
      addUserToFirestore(user.uid);
       setUserCreated(true)
    } catch (error) {
      console.error('Error creating user:', error.code, error.message);
    }
  };

  const addUserToFirestore = async (userId) => {
    setLoading(true)
    try {
      const data = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        dob: dateOfBirth,
        gender: gender,
        uid: userId,
        email:email,
        isPayment:false
      };
       await setDoc(doc(db,'users',`${userId}`),data)
      console.log('User data added to Firestore successfully');
      setLoading(false)
      navigate('/payment')
    } catch (error) {
      console.error('Error adding user data to Firestore:', error);
    }
  };
   
  const handleSubmit = () => {
    createUserAndAddUserToFirestore();
    
  };
 
  return (
    <div className="registration-form-container">
      <div className="registration-form-heading">
        <span>Get Registered</span>
        <p>Fill up the form and enjoy dating on Zeppler Online Dating</p>
      </div>
      <div className="registration-form-inputs">
        <div className="full-name-inputs">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="email-input-box">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="phoneNumber-input-box">
          <input
            type="text"
            placeholder="Phone Number [optional] "
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="password-input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         {password.length < 8 && <p>Password must be at least 8 characters long</p>}
        </div>
        <div className="gender-input">
          <Dropdown
            options={options}
            value={gender}
            placeholder="Select an option"
            onChange={(option) => setGender(option.value)}
          />
        </div>
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
      </div>
      <div className="registration-form-footer">
        <p>
          We’ll review your profile and get back to you shortly, sending you an
          online appointment link for interview.
        </p>
        {userCreated ? (
          <NavLink to={"/payment"}>
           <div>
               {
                loading === true ? (
                  <HashLoader size={20} color="#FFB049"/>
                ): (<button>SUBMIT</button>)
               }
               
             </div>
          </NavLink>
        ) : (
             <div>
               {
                loading === true ? ( <HashLoader size={20} color="#FFB049"/>): (<button onClick={handleSubmit}>SUBMIT</button>)
               }
               
             </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
