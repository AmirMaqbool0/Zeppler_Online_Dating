
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDiYvoAj-jygj0CDlNcuN-CG00JTHCY2XU",
  authDomain: "zeppler-online-dating.firebaseapp.com",
  projectId: "zeppler-online-dating",
  storageBucket: "zeppler-online-dating.appspot.com",
  messagingSenderId: "619943579087",
  appId: "1:619943579087:web:529440bd2bb539ba3d96ba",
  measurementId: "G-RK8YSVNT5C"
};

export  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage =getStorage(app)