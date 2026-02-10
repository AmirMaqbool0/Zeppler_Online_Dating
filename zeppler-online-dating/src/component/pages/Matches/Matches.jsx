import React, { useEffect, useState } from "react";
import "./style.css";
import SideBar from "../../SideBar/SideBar";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import MutuallyProfileCard from "../../MutuallyProfilesCard/MutuallyProfileCard";
import { NavLink, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { app } from "../../../firebase";
import { getFirestore, getDocs, collection, doc, updateDoc } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Matches = () => {
  const [sidebar, setSidebar] = useState(false);
  const [currUserInterest, setCurrUserInterest] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchingUsers, setMatchingUsers] = useState([]);

  const db = getFirestore(app);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const userData = useSelector((state) => state.uid.userData);
  const uid = useSelector((state) => state.uid.uid);

  useEffect(() => {
    const fetchData = async () => {
      await getUsers();
      setCurrUserInterest(userData?.interests);
      setLoading(false);
    };
    fetchData();
  }, [userData]);

  useEffect(() => {
    const getMatchingUsers = () => {
      if (!currUserInterest || currUserInterest.length === 0) return [];
      const lowerCaseInterests = currUserInterest.map((interest) =>
        interest.toLowerCase()
      );

      const filteredUsers = users.filter((user) => user.uid !== userData?.uid);

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

    setMatchingUsers(getMatchingUsers());
  }, [users, currUserInterest, userData]);

  useEffect(() => {
    const addMatches = async () => {
      try {
        const docRef = doc(db, 'users', uid);
        await updateDoc(docRef, {
          matches: matchingUsers
        });
        console.log('Matches updated successfully');
      } catch (error) {
        console.error('Error updating matches:', error);
      }
    };

    if (matchingUsers.length > 0) {
      addMatches();
    }
  }, [matchingUsers, uid, db]);

  const getUsers = async () => {
    const collectionRef = collection(db, "users");
    const result = await getDocs(collectionRef);
    const arr = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsers(arr);
  };

  return (
    <div className="matches-container">
      <button
        onClick={showSidebar}
        className={`${sidebar ? "mat-toggle-btn" : "mat-toggle-btn2"}`}
      >
        {sidebar ? (
          <Menu color="white" size={14} />
        ) : (
          <Menu color="white" size={14} />
        )}
      </button>
      <div className="matches-content">
        <div
          className={`${sidebar ? "show-matches-sidebar" : "matches-sidebar"}`}
        >
          <SideBar />
        </div>
        <div className="matches-content-box">
          <DashboardHeader />
          <div className="matched-profiles">
            <div className="matched-profiles-heading">
              <span>Mutually Matched Profiles</span>
            </div>

            {loading ? (
              <div className="loading-container">
                {Array(3)
                  .fill()
                  .map((item) => (
                    <Skeleton
                      key={item}
                      width={300}
                      height={200}
                      borderRadius={10}
                    />
                  ))}
              </div>
            ) : (
              <div className="matched-profiles-boxs">
                {matchingUsers.length === 0 ? (
                  <p className="set-profile-text">
                    Complete your profile first
                  </p>
                ) : (
                  matchingUsers.map((user) => (
                    <div key={user.id} className="matched-profiles-box">
                      <NavLink to={`/matches/${user.id}`}>
                        <MutuallyProfileCard userData={user} />
                      </NavLink>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Matches;
