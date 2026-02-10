import React, { useEffect, useState } from "react";
import "./style.css";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import { Heart, HeartCrack, Users, CalendarClock } from "lucide-react";
import ActiveUserBox from "../../ActiveUserBox/ActiveUserBox";
import { app } from "../../../firebase";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);

  const getUsers = async () => {
    setLoading(true);
    const collectionRef = collection(db, "users");
    const result = getDocs(collectionRef);
    const arr = (await result).docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(arr);
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const totalUsers= users.length
  const matchesLength = useSelector((state)=>state.matches.matches)
  console.log(matchesLength)
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <DashboardHeader />
        <div className="dashboard-stats-boxs">
          <div className="dashboard-stats-box">
            <div className="stats-box-logo">
              <Users color="#FFB049" size={30} />
            </div>
            <div className="stats-box-text">
              <h1>{totalUsers}</h1>
              <span>Total Users</span>
            </div>
          </div>

          <div className="dashboard-stats-box">
            <div className="stats-box-logo">
              <CalendarClock color="#FFB049" size={30} />
            </div>
            <div className="stats-box-text">
              <h1>97</h1>
              <span>Total Interviews</span>
            </div>
          </div>

          <div className="dashboard-stats-box">
            <div className="stats-box-logo">
              <Heart color="#FFB049" size={30} />
            </div>
            <div className="stats-box-text">
              <h1>{matchesLength}</h1>
              <span>Total Matches</span>
            </div>
          </div>

          <div className="dashboard-stats-box">
            <div className="stats-box-logo">
              <HeartCrack color="#FFB049" size={30} />
            </div>
            <div className="stats-box-text">
              <h1>100</h1>
              <span>Unmatched Users</span>
            </div>
          </div>
        </div>
        <div className="active-user-box">
          <div className="active-user-heading">
            <span>Active Users</span>
          </div>
          <div className="active-user-header">
            <div className="active-user-header-left">
              <span>S.No.</span>
              <span>Users</span>
            </div>
            <div className="active-user-header-right">
              <span>Gender</span>
              <span>Date of Birth</span>
              <span>Height</span>
              <span>Weight</span>
              <span>Martial Status</span>
              <span>Location</span>
              <span>Action</span>
            </div>
          </div>
          {loading ? (
            <div className="loader-container">
                {
                    Array(9).fill().map((item) =>(
                        <Skeleton width={"100%"} height={30} borderRadius={8} />
                    ))
                }
              
            </div>
          ) : (
            <div className="active-users">
              {users.map((item, index) => (
                <div>
                  <NavLink
                    to={`/users/${item.uid}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ActiveUserBox odd={index % 2 == 0} userData={item} />
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
