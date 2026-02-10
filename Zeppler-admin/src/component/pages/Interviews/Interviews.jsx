import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import './style.css';
import DashboardHeader from '../../DashboardHeader/DashboardHeader';
import InterviewUserBox from '../../InterviewUserBox/InterviewUserBox';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Interviews = () => {
  const [status, setStatus] = useState('');
  const [date, setDate] = useState(null);
  const [upcoming, setUpcoming] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalInterviewUsers = 12; 
  const totalPages = Math.ceil(totalInterviewUsers / 8);

 
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleUpcomingChange = (event) => {
    setUpcoming(event.target.value);
  };

  // Function to handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the start and end indices for displaying user boxes on the current page
  const startIndex = (currentPage - 1) * 8;
  const endIndex = Math.min(startIndex + 8, totalInterviewUsers);

  return (
    <div className='interviews-container'>
      <DashboardHeader />
      <div className="interviews-heading">
        <span>Interviews</span>
      </div>
      <div className="interviews-box">
        <div className="interviews-box-top">
          <span>Filters</span>
          <div className="filters">
            {/* Status filter */}
            <select value={status} onChange={handleStatusChange}>
              <option value="">Select Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {/* Date filter */}
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              placeholderText="Select Date"
            />
            {/* Upcoming filter */}
            <select value={upcoming} onChange={handleUpcomingChange}>
              <option value=""> Upcoming Interviews</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <div className="interviews-btn">
              <button>Apply</button>
            </div>
          </div>
        </div>
        <div className="interviews-user-boxs">
          <div className="interview-user-boxs-header">
            <div className="interview-user-header-left">
              <span>S.No.</span>
              <span>Users</span>
            </div>
            <div className="interview-user-header-right">
              <span>Gender</span>
              <span>Date of Birth</span>
              <span>Height</span>
              <span>Weight</span>
              <span>Martial Status</span>
              <span>Location</span>
              <span>Status</span>
              <span>Action</span>
            </div>
          </div>
          {/* Render interview user boxes based on current page */}
          {Array(endIndex - startIndex)
            .fill()
            .map((_, index) => (
              <InterviewUserBox
                key={startIndex + index}
                odd={(startIndex + index) % 2 === 0}
              />
            ))}
        </div>
        {/* Pagination */}
        <div className="users-pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>
          <button
            className={currentPage === 1 ? 'active' : ''}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          <button
            className={currentPage === 2 ? 'active' : ''}
            onClick={() => handlePageChange(2)}
          >
            2
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages} 
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interviews;
