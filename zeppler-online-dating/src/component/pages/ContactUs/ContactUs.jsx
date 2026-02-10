import React, { useState } from "react";
import "./style.css";
import Banner from "../../Banner/Banner";
import Footer from "../../Footer/Footer";
import { Phone as PhoneIcon } from "lucide-react"; 
import {getFirestore,addDoc, collection} from 'firebase/firestore'
import {app} from '../../../firebase'
const ContactUs = () => {
  const [email,setEmail] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [phoneNumber,setPhoneNumber] = useState(''); 
  const [message,setMessage] = useState('');
  const db = getFirestore(app)
  const sendData = async () =>{
     const data ={
      email:email,
      firstName:firstName,
      lastName:lastName,
      phoneNumber:phoneNumber,
      message:message
     }
     const collectionRef = collection(db,'messages')
     await addDoc (collectionRef,data)
     setEmail('')
     setFirstName('')
     setLastName('')
     setPhoneNumber('')
     setMessage('')
    }
  return (
    <div className="contactus-conatiner">
      <Banner heading={"Contact Us"} subHeading={"Home - Contact Us"} />
      <div className="contact-detail-boxes">
        <div className="contact-detail-box">
          <div className="contact-detail-box-logo">
            <PhoneIcon color="#FFB049" /> {/* Changed to PhoneIcon */}
          </div>
          <div className="contact-detail-box-heading">
            <span>Phone Number</span>
          </div>
          <div className="contact-detail-box-detail">
            <span>(+123) 456 7890</span>
            <p>Anytime if you need assistance. We’re here to provide help .</p>
          </div>
        </div>

        <div className="contact-detail-box">
          <div className="contact-detail-box-logo">
            <PhoneIcon color="#FFB049" /> {/* Changed to PhoneIcon */}
          </div>
          <div className="contact-detail-box-heading">
            <span>Email Address</span>
          </div>
          <div className="contact-detail-box-detail">
            <span>contact@zeppler.com</span>
            <p>Please feel free to email us at your convenience.</p>
          </div>
        </div>

        <div className="contact-detail-box">
          <div className="contact-detail-box-logo">
            <PhoneIcon color="#FFB049" /> {/* Changed to PhoneIcon */}
          </div>
          <div className="contact-detail-box-heading">
            <span>Address</span>
          </div>
          <div className="contact-detail-box-detail">
            <span>Zeppler Office</span>
            <p>123 Market St. #22B, Charlottesville, California 44635, USA</p>
          </div>
        </div>
      </div>
      <div className="contact-box-row2">
        <div className="contact-box-text">
          <h1>Get In Touch</h1>
          <p>
            Thank you with your interest with Zeppler. We just need a few
            details and we’ll be in touch. Please feel free to email us at your
            convenience.
          </p>
          <span>contact@zeppler.com</span>
        </div>
        <div className="contact-box-form-box">
          <div className="contact-box-form-input">
            <input type="text" placeholder="First Name"  
            onChange={(e) => setFirstName(e.target.value) }
              value={firstName}
            />
            <input type="text" placeholder="Last Name" 
            onChange={(e) => setLastName(e.target.value) }
            value={lastName}
            />
            <input type="text" placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value) }
            value={email}
            />
            <input type="text" placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value) } // Changed to setPhoneNumber
            value={phoneNumber} // Changed to phoneNumber
            />
            <textarea placeholder="Message...."
            onChange={(e) => setMessage(e.target.value) }
            value={message}
            />
          </div>
          <div className="contactus-btn">
            <button onClick={sendData}>Submit</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;