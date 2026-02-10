import React from 'react'
import './style.css'
import NotFound from '../../assests/notfound.png'
import { Ellipsis } from 'lucide-react'
const PaymentUserBox = ({odd,userData}) => {
  return (
    <div className={`payment-user-box-container ${odd ? 'odd-background' : 'even-background'}`}>
        <span>001</span>
        <div className="payment-user" style={{width:'150px'}}>
            <img src={userData?.userData?.profileImage ? userData?.userData?.profileImage : NotFound} alt="" />
            <span>{userData?.paymentby}</span>
        </div>
        <span style={{width:'150px'}}>{userData?.userData?.email}</span>
        <span>$ {userData?.price}</span>
        <span>{userData?.userData?.isPayment ? 'Paid' : 'UnPaid'}</span>
        <span><Ellipsis/></span>
    </div>
  )
}

export default PaymentUserBox