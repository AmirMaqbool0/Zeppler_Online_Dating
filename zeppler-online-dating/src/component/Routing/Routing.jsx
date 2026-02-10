import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import SideBar from "../SideBar/SideBar";
import Matches from "../pages/Matches/Matches";
import UserDetail from "../pages/UserDetail/UserDetail";
import MyProfile from "../pages/MyProfile/MyProfile";
import Faq from "../pages/Faq/Faq";
import Messages from "../pages/Messages/Messages";
import About from "../pages/About/About";
import Blog from "../pages/Blog/Blog";
import BlogDetail from "../pages/BlogDetail/BlogDetail";
import AskedQuestion from "../pages/AskedQuestion/AskedQuestion";
import ContactUs from "../pages/ContactUs/ContactUs";
import TermsCondition from "../pages/TermsCondition/TermsCondition";
import ProfileSetup from "../pages/ProfileSetup/ProfileSetup";
import BasicInformation from "../pages/BasicInformation/BasicInformation";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import Login from "../pages/Login/Login";
import Payment from "../pages/Payment/Payment";

export const Routing = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/matches" element={<Matches/>} />
        <Route path="/matches/:id" element={<UserDetail/>}/>
        <Route path="/myprofile" element={<MyProfile/>}/>
        <Route path="/faq" element={<Faq/>}/>
        <Route path="/messages" element={<Messages/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/blogs" element={<Blog/>}/>
        <Route path="/blogs/:id" element={<BlogDetail/>}/>
        <Route path="/askedquestion" element={<AskedQuestion/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/terms&condition" element={<TermsCondition/>}/> 
        <Route path="/profilesetup" element={<ProfileSetup/>}/> 
        <Route path="/basicinformation" element={<BasicInformation/>}/>
        <Route path="/payment" element={<Payment/>}/>  
      </Routes>
    </BrowserRouter>
  );
};
