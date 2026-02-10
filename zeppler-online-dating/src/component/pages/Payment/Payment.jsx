import React, { useEffect, useState } from "react";
import "./style.css";
import PopUpLogo from "../../../assests/popup.png";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { app } from "../../../firebase";
import { getFirestore ,doc,updateDoc, collection, addDoc, getDoc, serverTimestamp} from "firebase/firestore";
import { getAuth ,signOut} from "firebase/auth";
import { NavLink } from "react-router-dom";

const Payment = () => {
  const [dateOfBirth, setDateOfBirth] = useState();
  const [popup,setPopup] =useState(false)
  const [user,setUser] =useState({})

  const showPopup =() =>{
    setPopup(!popup)
  }
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
   
  const updatePaymentStatus = async () => {
    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        isPayment: true
      });
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };
  const handelSubmit =() =>{
    AddPaymentDetail()
    updatePaymentStatus()
  } 
useEffect(()=>{
getUser()
},[])
const getUser = async () =>{
  const docRef = doc(db,'users',uid)
   const result = await getDoc(docRef)
   setUser(result.data())
}
  const AddPaymentDetail = async () =>{
    const data= {
      price:99,
      transID:'',
      paymentby:user?.firstName,
      createdAt:serverTimestamp(),
      uid:uid
    }
    const collectionRef = collection(db,'payment')
     await addDoc(collectionRef,data)
  }
   
  return (
    <div className="payment-container">
      <div className="payment-logout-btn">
        <NavLink to={'/'} style={{textDecoration:'none'}}>
        <button onClick={logOutUser}>Logout</button></NavLink>
      </div>
      <div className="payment-box">
        <div className="payment-box-heading">
          <span>Zeppler</span>
          <p>(Online Dating)</p>
        </div>
        <div className="payment-text">
          <span>Payment Information</span>
        </div>
        <div className="price-box">
          <span>$99.00</span>
          <p>Zeppler Registration Fees</p>
        </div>
        <div className="payment-inpts">
          <span>Enter Card Details</span>
          <input type="text" placeholder="Card Holder Name*" />
          <input type="text" placeholder="Card Number*" />
          <div className="expire-date">
            <input
              type="date"
              id="dob"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <input type="text" placeholder="CVV*" />
          </div>
          <button onClick={showPopup}>Pay $99.00</button>
        </div>
      </div>
      <div className={`${popup ? 'payment-popup' : 'hidepopup'}`}>
        <div className="payment-popup-box">
          <div className="popup-heading">
            <span>Congratulations!</span>
          </div>
          <div className="popup-logo">
            <img src={PopUpLogo} alt="" />
          </div>
          <div className="payment-detail-text">
            <p>
              Your payment has been successfully processed, and your account has
              been created.
            </p>
            <p>
            Welcome to our community! Get ready to unlock a
              world of possibilities and embark on your journey with us.
            </p>
            <div className="popup-btn">
              <NavLink to={'/userdashboard'} style={{textDecoration:'none'}}>
              <button onClick={handelSubmit}>Continue</button>
              </NavLink>
            </div>
            <div className="popup-close-btn" onClick={handelSubmit}>
              <X  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
