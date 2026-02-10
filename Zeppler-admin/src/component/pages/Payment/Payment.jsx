import React, { useEffect, useState } from 'react';
import './style.css';
import DashboardHeader from '../../DashboardHeader/DashboardHeader';
import PaymentUserBox from '../../PaymentUser-box/PaymentUserBox';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { app } from '../../../firebase';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Skeleton from "react-loading-skeleton";
const Payment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading,setLoading] =useState(false)
  const usersPerPage = 7; // Number of users per page

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const renderPaymentUsers = () => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = Math.min(startIndex + usersPerPage, payments.length);

    return payments.slice(startIndex, endIndex).map((payment, index) => (
      <PaymentUserBox key={startIndex + index} odd={index % 2 === 0} userData={payment} />
    ));
  };

  const db = getFirestore(app);

  const getPayments = async () => {
    setLoading(true)
    const collectionRef = collection(db, 'payment');
    const result = await getDocs(collectionRef);
    const arr = result.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const updatedPayments = await Promise.all(arr.map(async (payment) => {
      const userDoc = await getDoc(doc(db, 'users', payment.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      return { ...payment, userData };
    }));
    setLoading(false)
    setPayments(updatedPayments);
  };
  useEffect(() => {
    getPayments();
  }, []);
console.log(payments)
  return (
    <div className='payment-container'>
      <DashboardHeader />
      <div className="payment-top">
        <span>Payment</span>
        <button onClick={() => setShow(!show)}>Change Fees</button>
      </div>
      <div className="payment-box">
        <div className="payment-box-header">
          <span>S.No.</span>
          <span style={{ width: '150px' }}>Users</span>
          <span style={{ width: '150px' }}>Email</span>
          <span>Fee</span>
          <span>Status</span>
          <span>Action</span>
        </div>
        <div className="payment-users-boxs">
          {
            loading ? (<div className='loading-container'>
              {
                Array(8).fill().map((item)=>(
                  <Skeleton width={'100%'} height={40} borderRadius={9}/>
                ))
              }
            </div>) :
            (renderPaymentUsers())
          }
          
      
        </div>
      </div>
      <div className="users-pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}> <ChevronLeft/> </button>
        <button className={currentPage === 1 ? "active" : ""} onClick={() => goToPage(1)}>1</button>
        <button className={currentPage === 2 ? "active" : ""} onClick={() => goToPage(2)}>2</button>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(payments.length / usersPerPage)}> <ChevronRight /> </button>
      </div>
      {show && (
        <div className="fee-popup">
          <div className="fee-popup-card">
            <div className="popup-card-heading">
              <span>Change Fees</span>
            </div>
            <input type="number" placeholder='Enter Amount' />
            <button>Update</button>
            <div className="cut-btn" onClick={() => setShow(false)}>
              <X />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
