import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import SideBar from "../../SideBar/SideBar";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Dot, Link, Menu } from "lucide-react";
import { app, storage } from "../../../firebase";
import HashLoader from 'react-spinners/HashLoader'

import {
  getFirestore,
  onSnapshot,
  collection,
  doc,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  getDoc,
  setDoc,
  limit
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NavLink } from "react-router-dom";

const Messages = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [sidebar, setSidebar] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [otherUserUid, setOtherUserUid] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [unsubscribeSnapshot, setUnsubscribeSnapshot] = useState(null);
  const [otherUserName, setOtherUserName] = useState("");
  const [otherStatus, setOtherUserStatus] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [onlineUsers,setOnlineUsers] =useState([])
  const [loading,setLoading] = useState(true)
  const [sendLoading,setSendLoading] =useState(false)

  const uid = useSelector((state) => state.uid.uid);
  const otherUserId = useSelector((state) => state.uid.otherUserId);
  const fileInputRef = useRef(null);

  const db = getFirestore(app);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleSendMessage = async () => {
    setSendLoading(true)
    if (!otherUserUid) {
      console.error("No other user selected");
      return;
    }

    const currentUserStr = uid.toString();
    const otherUserStr = otherUserUid.toString();
    const sortedUserIds = [currentUserStr, otherUserStr].sort();
    const chatId = sortedUserIds.join("_");
  
    const chatRef = doc(db, "chats", chatId);
  
    try {
      const chatSnapshot = await getDoc(chatRef);
      if (!chatSnapshot.exists()) {
        await setDoc(chatRef, {
          participants: [currentUserStr, otherUserStr],
        });
      }
  
      const messagesRef = collection(chatRef, "messages");

      if (selectedImage) {
        const storageRef = ref(storage, `images/${Date.now()}_${selectedImage.name}`);
        await uploadBytes(storageRef, selectedImage);
        const imageUrl = await getDownloadURL(storageRef);
        await addDoc(messagesRef, {
          sender: currentUserStr,
          receiver: otherUserStr,
          image: imageUrl,
          messageSent: true,
          messageSeen: false,
          timestamp: serverTimestamp(),
        });
        setSelectedImage(null);
      } else {
        const formattedMessage = {
          sender: currentUserStr,
          receiver: otherUserStr,
          message: messageInput,
          messageSent: true,
          messageSeen: false,
          timestamp: serverTimestamp(),
        };
        await addDoc(messagesRef, formattedMessage);
      }
    setSendLoading(false)
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  const AllUser = async () => {
    const collectionRef = collection(db, "users");
    const result = await getDocs(collectionRef);
    const arr = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const usersWithChatHistory = await Promise.all(arr.map(async (user) => {
      const otherUserStr = user.uid.toString();
      const sortedUserIds = [uid, otherUserStr].sort();
      const chatId = sortedUserIds.join("_");
      const chatRef = doc(db, "chats", chatId);

      try {
        const chatSnapshot = await getDoc(chatRef);
        if (chatSnapshot.exists()) {
          const lastMessage = await getLastMessage(chatRef);
          return { ...user, lastMessage };
        }
      } catch (error) {
        console.error("Error fetching chat document:", error);
      }
    }));
    
    const filteredUsers = usersWithChatHistory.filter(user => user !== undefined);
    setAllUsers(filteredUsers);
  };

  useEffect(() => {
    AllUser();
    if (!otherUserUid && otherUserId) {
      setOtherUserUid(otherUserId);
    }
    return () => {
      if (typeof unsubscribeSnapshot === 'function') {
        unsubscribeSnapshot();
      }
    };
  }, [otherUserId, otherUserUid, unsubscribeSnapshot]);

  const othrtuserId = async (userId) => {
    setOtherUserUid(userId);
    if (typeof unsubscribeSnapshot === 'function') {
      unsubscribeSnapshot();
    }
    const unsubscribe = fetchChatMessages(userId);
    setUnsubscribeSnapshot(unsubscribe);
    
    const userRef = doc(db, "users", userId.toString());
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      setOtherUserName(`${userData.firstName} ${userData.lastName}`);
      setOtherUserStatus(`${userData.status}`)
    }
  };

  const fetchChatMessages = async (otherUserId) => {
    const currentUserStr = uid.toString();
    const otherUserStr = otherUserId.toString();
    const sortedUserIds = [currentUserStr, otherUserStr].sort();
    const chatId = sortedUserIds.join("_");

    const chatRef = doc(db, "chats", chatId);
    const messagesRef = query(
      collection(chatRef, "messages"),
      orderBy("timestamp")
    );

    try {
      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data());
        setChatMessages(messages);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const getLastMessage = async (chatRef) => {
    const messagesRef = query(
      collection(chatRef, "messages"),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    try {
      const snapshot = await getDocs(messagesRef);
      if (!snapshot.empty) {
        return snapshot.docs[0].data().message;
      }
    } catch (error) {
      console.error("Error fetching last message:", error);
    }

    return "";
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const loginUser = useSelector((state) => state.uid?.userData);
  useEffect(() => {
    if (!loginUser) return;

    const getUsersWithInterests = async () => {
      const userInterests = loginUser?.interests || [];
      const lowerCaseInterests = userInterests.map(interest => interest.toLowerCase());

      const collectionRef = collection(db, "users");
      const result = await getDocs(collectionRef);
      const arr = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const filteredUsers = arr.filter(user => {
        if (!user.interests || user.interests.length === 0) return false;
        const userInterests = user.interests.map(interest => interest.toLowerCase());
        return (
          userInterests.some(interest => lowerCaseInterests.includes(interest)) &&
          user.status === true &&
          user.uid !== loginUser.uid 
        );
      });
      
      

      setOnlineUsers(filteredUsers);
      setLoading(false)
    };

    getUsersWithInterests();
  }, [loginUser]); 

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSendMessage();
    }
  };
  return (
    <div className="messages-container">
      <button
        onClick={showSidebar}
        className={`${sidebar ? "messages-toggle-btn" : "messages-toggle-btn2"}`}
      >
        {sidebar ? <Menu color="white" size={14} /> : <Menu color="white" size={14} />}
      </button>
      <div className={`${sidebar ? "show-messages-sidebar" : "messages-sidebar"}`}>
        <SideBar />
      </div>
      <div className="messages-content">
        <DashboardHeader />
        <div className="messages-content-box">
          <div className="messages-content-box-heading">
            <span>Online Matches</span>
          </div>
          <div className="online-matches-profiles">
            {loading ? (<div className="online-loading">
                  {
                    Array(4).fill().map((item)=>(
                      <Skeleton width={200} height={200} borderRadius={12}/>
                    ))
                  }
            </div>) 
            :
             onlineUsers?.map((item, index) => (
             <NavLink to={`/matches/${item.uid}`}style={{textDecoration:'none'}} > 
               <div className="online-matches-profile" key={index}>
                  <img src={item?.profileImage} alt="" />
                  <span>{item.firstName} {item.lastName}</span>
                </div>  </NavLink>
               ))}
          </div>
          <div className="messages-content-box-row">
            <div className="messages-list">
              <div className="messages-list-header">
                <div className="messages-list-header-heading">
                  <span>Messages</span>
                </div>
                <div className="messages-list-tabs">
                  <span
                    className={activeTab === "All" ? "active-message" : ""}
                    onClick={() => setActiveTab("All")}
                  >
                    All
                  </span>
                  <span
                    className={activeTab === "Read" ? "active-message" : ""}
                    onClick={() => setActiveTab("Read")}
                  >
                    Read
                  </span>
                  <span
                    className={activeTab === "Unread" ? "active-message" : ""}
                    onClick={() => setActiveTab("Unread")}
                  >
                    Unread
                  </span>
                </div>
              </div>
              <div className="messages-box-messages-list">
                {
                  allUsers.length ===  0 ? (<div className="">
                    <p className="no-messages">No Messages Found</p>
                  </div>):(
                       allUsers.map((user) => (
                        <div
                          key={user.id}
                          className="message-box"
                          onClick={() => othrtuserId(user.uid)}
                        >
                          <div className="user-logo-name-message">
                            <div className="user-logo">
                              <img src={user.profileImage} alt="" />
                            </div>
                            <div className="user-mesage">
                              <span>
                                {user.firstName} {user.lastName}
                              </span>
                              <p>{user.lastMessage}</p>
                            </div>
                          </div>
                        </div>
                      ))
                  )
                }
              
              </div>
            </div>
            {/* Conditionally render messages-box only if otherUserUid is not null */}
            {otherUserUid && (
              <div className="messages-box">
                <div className="messages-box-user-name">
                  <span>{otherUserName}</span>
                  <div className="messages-box-user-status">
                    <Dot color={otherStatus? otherStatus ? "green" : "red" :''} />
                    <span>{otherStatus? otherStatus == 'true'? 'Online' : 'Offline' :'' }</span>
                  </div>
                </div>
                <div className="messages-box-messages">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${message.sender === uid ? "sent" : "received"}`}
                    >
                      <div className="message-text">
                        {message.image ? <img src={message.image} alt=""/> : <span>{message.message}</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="messages-box-input">
                  {selectedImage && (
                    <div className="selected-image">
                      {selectedImage.name}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Type message here"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <div className="messages-box-left">
                    <div className="link-icon" onClick={() => fileInputRef.current.click()}>
                      <Link size={12} />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      onKeyUp={sendMessage}
                    />
                    {
                      sendLoading ? (<div className="loader">
                        <HashLoader color="#FFB049" size={30}/>
                      </div>):( <button onClick={handleSendMessage}>Send</button>)
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;