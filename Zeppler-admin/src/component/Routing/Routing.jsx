import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Sidebar from '../Siderbar/Sidebar'
import DashBoard from '../pages/Dashboard/DashBoard'
import Matches from '../pages/Matches/Matches'
import Users from '../pages/Users/Users'
import UserDetail from '../pages/UserDetail/UserDetail'
import Payment from '../pages/Payment/Payment'
import Settings from '../pages/Settings/Settings'
import Interviews from '../pages/Interviews/Interviews'
import Login from '../pages/Login/Login'
const Routing = () => {
  return (
 <BrowserRouter>
 <div style={{display:'flex'}}>
   <Sidebar />
   <Routes>
    <Route path='/' element={<DashBoard />} />
    <Route path='/matches' element={<Matches />} />
    <Route path='/users' element={<Users />} />
    <Route path='/users/:id' element={<UserDetail />} />
    <Route path='/payment' element={<Payment />} />
    <Route path='/settings' element={<Settings />} />
    <Route path='/interviews' element={<Interviews />} />
   </Routes>
   </div>
 </BrowserRouter>
  )
}

export default Routing