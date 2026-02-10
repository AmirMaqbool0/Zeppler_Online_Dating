import React from 'react'
import './style.css'
import UserLogo from '../../assests/userlogo.png'
import { Delete, Trash2 } from 'lucide-react'
const InterviewUserBox = ({odd}) => {
  return (
    <div className={`interview-user-box-container  ${odd ? 'odd-background' : 'even-background'}`}>
         <div className="interview-user-left">
            <span>001</span>
            <div className="interview-left-user">
                <img src={UserLogo} alt="" />
                <span>Amir</span>
            </div>
         </div>
         <div className="interview-user-right">
          <span>Male</span>
          <span>Male</span>
          <span>172 cm</span>
          <span>4 lbs</span>
          <span>Single</span>
          <span>New York</span>
          <span>Approved</span>
          <span> <Trash2 color='red' /> </span>
         </div>
    </div>
  )
}

export default InterviewUserBox