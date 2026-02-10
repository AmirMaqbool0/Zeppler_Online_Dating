import React, { useEffect, useState } from "react";
import "./style.css";
import SideBar from "../../SideBar/SideBar";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import MutuallyProfileCard from "../../MutuallyProfilesCard/MutuallyProfileCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  doc,
  getDoc,
  getFirestore,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../../firebase";
import { getData } from "../../../redux/userUid";
import NotFound from "../../../assests/notfound.png";
import { Menu } from "lucide-react";
import Skeleton from "react-loading-skeleton";

const UserDashboard = () => {
  const [userData, setUserData] = useState({});
  const [sidebar, setSidebar] = useState(false);
  const [userInterest, setUserInterest] = useState([]);
  const [users, setUsers] = useState([]);
  const [matchingUsers, setMatchingUsers] = useState([]);
  const db = getFirestore(app);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.uid.uid);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "users", uid);
        const usersCollectionRef = collection(db, "users");

        const [userSnapshot, allUsersSnapshot] = await Promise.all([
          getDoc(docRef),
          getDocs(usersCollectionRef),
        ]);

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
          dispatch(getData(userSnapshot.data()));
          // Update user status to true when dashboard is loaded
          await updateDoc(docRef, { status: true });
        } else {
          console.log("No such document!");
        }

        const allUsersData = allUsersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(allUsersData);

        const matchingUsers = getMatchingUsers(allUsersData);
        setMatchingUsers(matchingUsers);
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        setLoading(false);
      }
    };

    const getMatchingUsers = (allUsersData) => {
      if (!userInterest || userInterest.length === 0) return [];
      const lowerCaseInterests = userInterest.map((interest) =>
        interest.toLowerCase()
      );

      const filteredUsers = allUsersData.filter(
        (user) => user.uid !== userData?.uid
      );

      return filteredUsers.filter((user) => {
        if (!user.interests || user.interests.length === 0) return false;
        const userInterests = user.interests.map((interest) =>
          interest.toLowerCase()
        );
        return userInterests.some((interest) =>
          lowerCaseInterests.includes(interest)
        );
      });
    };

    setUserInterest(userData?.interests);
    fetchData();
  }, [uid, userData?.uid, userInterest]);

  const Data = useSelector((state) => state.uid.userData);

  // Function to handle user activity
  const handleUserActivity = async () => {
    console.log("User activity detected in dashboard");
    const docRef = doc(db, "users", uid);
    // Update user status to true on activity detection
    await updateDoc(docRef, { status: true });
  };

  useEffect(() => {
    // Attach event listeners for user activity
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keypress", handleUserActivity);

    // Set a timer to update user status to false after 2 minutes of inactivity
    const activityTimer = setTimeout(async () => {
      console.log("User inactive for 2 minutes, updating status to false");
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, { status: false });
    }, 2 * 60 * 1000); // 2 minutes

    // Cleanup function to remove event listeners and clear timer
    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keypress", handleUserActivity);
      clearTimeout(activityTimer);
    };
  }, []);

  return (
    <div className="user-dashboard-container">
      <div className={`${sidebar ? "sidebar" : "show-sidebar"}`}>
        <SideBar />
      </div>
      <div className="user-dashboard-content">
        <button
          onClick={showSidebar}
          className={`${sidebar ? "toggle-btn" : "toggle-btn2"}`}
        >
          {sidebar ? (
            <Menu color="white" size={14} />
          ) : (
            <Menu color="white" size={14} />
          )}
        </button>
        <DashboardHeader />
        <div className="user-dashboard-content-row">
          <div className="user-dashboard-profile-card">
            <div className="profile-card-cover">
              {Data?.images?.[0] ? (
                <img src={Data?.images?.[0]} alt="Cover" />
              ) : (
                <img src={NotFound} alt="Cover" />
              )}
            </div>
            <div className="profile-card-logo">
              {Data?.profileImage ? (
                <img src={Data?.profileImage} alt="Logo" />
              ) : (
                <img src={NotFound} alt="Logo" />
              )}
            </div>
            <div className="profile-card-tabs">
              <span
                className={activeTab === "profile" ? "active-tab" : ""}
                onClick={() => handleTabClick("profile")}
              >
                Profile
              </span>
              <span
                className={activeTab === "preferences" ? "active-tab" : ""}
                onClick={() => handleTabClick("preferences")}
              >
                Preferences
              </span>
            </div>
            <div className="profile-tab-content">
              {activeTab === "profile" && (
                <div>
                  <div className="profile-tab-content-box">
                    <span>Bio</span>
                    <p style={{ width: "150px" }}>{Data?.bio ? Data?.bio: 'N/A' }</p>
                  </div>
                  <div className="profile-tab-content-box">
                    <span>Date of Birth</span>
                    <p>{Data?.dob ? Data?.dob :'N/A' }</p>
                  </div>
                  <div className="profile-tab-content-box">
                    <span>My Location</span>
                    <p>{Data?.location ? Data?.location :'N/A' }</p>
                  </div>
                  <div className="profile-tab-content-box">
                    <span>Height</span>
                    <p>{Data?.height ? Data?.height :'N/A' } cm</p>
                  </div>
                  <div className="profile-tab-content-box">
                    <span>Weight</span>
                    <p>{Data?.weight ? Data?.weight :'N/A'}lbs</p>
                  </div>
                  <Link to={"/profilesetup"} style={{ textDecoration: "none" }}>
                    <div className="profile-tab-btn">
                      <button>Edit Profile</button>
                    </div>
                  </Link>
                </div>
              )}
              {activeTab === "preferences" && (
                <div>
                  <h2>Preferences Tab Content</h2>
                  <p>This is the content for the Preferences tab.</p>
                </div>
              )}
            </div>
          </div>
          <div className="mutually-profiles">
            <div className="mutually-profiles-heading">
              <span>Mutually Matched Profiles</span>
              <div className="mutually-profiles-cards">
                {loading ? (
                  <div className="loading-container-dashboard">
                    {Array(6)
                      .fill()
                      .map((item) => (
                        <Skeleton
                          key={item}
                          width={200}
                          height={200}
                          borderRadius={10}
                        />
                      ))}
                  </div>
                ) : matchingUsers.length === 0 ? (
                  <p className="set-profile-text">Complete your profile first</p>
                ) : (
                  matchingUsers.map((user) => (
                    <div className="mutually-profiles-card-box" key={user.id}>
                      <Link to={`/matches/${user.uid}`}>
                        <MutuallyProfileCard userData={user} />
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
