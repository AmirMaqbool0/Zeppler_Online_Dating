import React, { useState } from 'react'
import './style.css'
import Banner from '../../Banner/Banner'
import Footer from '../../Footer/Footer'
import FaqContent from '../FaqContent/FaqContent'

const AskedQuestion = () => {
  return (
   <div className='asked-question-container'>
   <Banner heading={'Frequently Asked Questions'} subHeding={'Home - FAQs'} />
   <div className="faqcontent">

   <FaqContent />
   </div>
   <Footer />
   </div>
  )
}


export default AskedQuestion
