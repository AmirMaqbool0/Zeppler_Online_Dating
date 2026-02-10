import React, { useEffect, useState } from "react";
import "./style.css";
import { Locate, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../../../firebase";
import { getData } from "../../../redux/userUid";
import HashLoader from 'react-spinners/HashLoader'
const BasicInformation = () => {
  const userDataRedux = useSelector((state) => state.uid.userData);
  const [photos, setPhotos] = useState([]);
  const [interest, setInterest] = useState("");
  const [interestArr, setInterestArr] = useState(userDataRedux?.interests || []);
  const [curLocation, setCurLocation] = useState("");
  const [location, setLocation] = useState(userDataRedux?.location);
  const [bio, setBio] = useState(userDataRedux?.bio);
  const [height, setHeight] = useState(userDataRedux?.height);
  const [weight, setWeight] = useState(userDataRedux?.weight);
  const [loading,setLoading] = useState(false)
  const uid = useSelector((state) => state.uid.uid);

  const db = getFirestore(app);
  const dispatch = useDispatch();

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos([...photos, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("upload-photo-input").click();
  };

  const addInterest = () => {
    if (interest.trim() !== "" && !interestArr.includes(interest.trim())) {
      setInterestArr([...interestArr, interest.trim()]);
      setInterest("");
    }
  };

  const removeInterest = (index) => {
    const updatedInterests = [...interestArr];
    updatedInterests.splice(index, 1);
    setInterestArr(updatedInterests);
  };

  const updateInfo = async () => {
    setLoading(true)
    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);
    const userData = userDoc.data();
  
    const updatedData = {};
  
    if (photos.length > 0) {
      updatedData.images = photos;
    } else if (!userData.images) {
      updatedData.images = [];
    }

    updatedData.height =height;
    updatedData.weight= weight;
    updatedData.bio=bio;
    updatedData.location= location;
   
    updatedData.interests = interestArr;
  
    await updateDoc(docRef, updatedData);
    dispatch(
      getData({
        ...userDataRedux,
        Images: photos,
        bio: bio,
        height: height,
        weight: weight,
        location: location,
        interest: interestArr
      })
    );
    setLoading(false)
    console.log("Data updated successfully.");
  };
  

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const city = data.address.city;
            console.log("City:", city);
            setCurLocation(city);
            setLocation(city);
          } catch (error) {
            console.error("Error fetching city name:", error);
          }
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const interestOptions = [
    "Hiking",
    "Reading",
    "Cooking",
    "Traveling",
    "Gaming",
    "Sports",
    // Add more options as needed
  ];

  return (
    <div className="basic-information-container">
      <div className="basic-information-box">
        <div className="basic-information-heading">
          <div className="basic-information-heading-text">
            <h1>Zeppler</h1>
            <p>(Online Dating)</p>
          </div>
          <span>Basic Information</span>
        </div>
        <div className="upload-photo-box">
          <p>Upload Photos</p>
          <div className="upload-photos">
            {photos?.map((item, index) => (
              <img key={index} src={item} alt="" />
            ))}
            <div className="upload-photo-btn">
              <button onClick={handleButtonClick}>Upload File</button>
              <input
                type="file"
                accept="image/*"
                id="upload-photo-input"
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
        <div className="basic-information-bio">
          <p>Add Bio</p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="basic-information-location">
          <p>Location</p>
          <div className="location-box">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <div onClick={getLocation}>
              <Locate />
            </div>
          </div>
        </div>
        <div className="height-weight">
          <div className="height-box">
            <p>Height</p>
            <input
              type="text"
              placeholder="e.g 167cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="weight-box">
            <p>Weight</p>
            <input
              type="text"
              placeholder="e.g 3 lbs"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
        <div className="basic-information-interest">
          <p>Add Interest</p>
          <div className="interest-option">
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="">Select an interest</option>
            {interestOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={addInterest}>Add</button>
          </div>
        </div>
      
        {/* Continue button */}
        <div className="added-interests">
          {interestArr.map((interest, index) => (
            <div key={index} className="interest-box">
              <p>{interest}</p>
              <X size={20} onClick={() => removeInterest(index)} />
            </div>
          ))}
        </div>
        <Link to={"/userdashboard"}>
          {" "}
          <div className="basic-information-btn">
            {
              loading === true ? (<div className="Loader">
                <HashLoader color="#FFB049"/>
              </div>) : (<button onClick={updateInfo}>Continue</button>)
            }
          </div>{" "}
        </Link>
      </div>
    </div>
  );
};

export default BasicInformation;
