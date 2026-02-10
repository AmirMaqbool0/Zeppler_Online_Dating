import React, { useEffect, useState } from "react";
import "./style.css";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import ActiveUserBox from "../../ActiveUserBox/ActiveUserBox";
import { NavLink } from "react-router-dom";
import { app } from "../../../firebase";
import {
  getDocs,
  collection,
  getFirestore,
  query,
  where,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import Skeleton from "react-loading-skeleton";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const usersPerPage = 7;

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const renderUsers = () => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = Math.min(startIndex + usersPerPage, users.length);

    return users.slice(startIndex, endIndex).map((item, index) => (
      <NavLink
        to={`/users/${item.id}`}
        style={{ textDecoration: "none" }}
        key={item.id}
      >
        <div>
          <ActiveUserBox odd={index % 2 === 0} userData={item} />
        </div>
      </NavLink>
    ));
  };

  const db = getFirestore(app);
  const getUsers = async () => {
    setLoading(true);
    const collectionRef = collection(db, "users");
    const result = await getDocs(collectionRef);
    const arr = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsers(arr);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
    setUsers(filteredUsers);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="users-container">
      <DashboardHeader />
      <div className="users-top">
        <span>Users</span>
        <div className="users-top-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search size={16} />
        </div>
      </div>
      <div className="users-box">
        <div className="users-user-header">
          <div className="users-user-header-left">
            <span>S.No.</span>
            <span>Users</span>
          </div>
          <div className="users-user-header-right">
            <span>Gender</span>
            <span>Date of Birth</span>
            <span>Height</span>
            <span>Weight</span>
            <span>Martial Status</span>
            <span>Location</span>
            <span>Action</span>
          </div>
        </div>
        <div className="users-user-boxs">
          {loading ? (
            <div className="loader-container">
              {Array(7)
                .fill()
                .map((item) => (
                  <Skeleton width={"100%"} height={40} borderRadius={9} />
                ))}
            </div>
          ) : (
            renderUsers()
          )}
        </div>
      </div>
      <div className="users-pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <ChevronLeft />
        </button>
        <button
          className={currentPage === 1 ? "active" : ""}
          onClick={() => goToPage(1)}
        >
          1
        </button>
        <button
          className={currentPage === 2 ? "active" : ""}
          onClick={() => goToPage(2)}
        >
          2
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
export default Users;
