import React, { useState } from 'react';
import './style.css';
import { Dot ,Minus,Plus } from 'lucide-react';

const FaqContent = () => {
    const [activeTab, setActiveTab] = useState('General');
    const [showLinks, setShowLinks] = useState(false);

    const tabData = {
        'General': {
            about: (
              <>
              <div className="browser-detail-about">
                <div className="browser-detail-about-heading" onClick={() => setShowLinks(!showLinks)}>
                 
                 {
                  showLinks ? <Minus size={18}/> : <Plus />
                 }
                  
                  <span>What is your dating platform all about?</span>
                </div>
                <div className="browser-detail-about-text">
                  <p>Our dating platform is dedicated to fostering meaningful connections and facilitating genuine relationships between like-minded individuals. Whether you're seeking companionship, romance, or friendship, our platform provides a safe and inclusive space where singles can meet, chat, and explore potential matches. We prioritize user privacy and security, ensuring that our members can interact with confidence and peace of mind. With our innovative matching algorithm and personalized features, we strive to help users find compatibility and chemistry with others who share their interests, values, and relationship goals. Our goal is to empower individuals to connect authentically and build lasting connections that enrich their lives.</p>
                </div>
                <div className="browser-detail-links" style={{ display: showLinks ? 'block' : 'none' }}>
                  <div className="browser-detail-link">
                    <Plus />
                    <span>How does your matching algorithm work?</span>
                  </div>
                  <div className="browser-detail-link">
                    <Plus />
                    <span>Is my personal information safe on your platform?</span>
                  </div>
                  <div className="browser-detail-link">
                    <Plus />
                    <span>Are there any fees associated with using your platform?</span>
                  </div>
                  <div className="browser-detail-link">
                    <Plus />
                    <span>How can I report inappropriate behavior or profiles?</span>
                  </div>
                  <div className="browser-detail-link">
                    <Plus />
                    <span>Can I delete my account if I no longer want to use the platform?</span>
                  </div>
                  <div className="browser-detail-link">
                    <Plus />
                    <span>What should I do if I encounter technical issues while using the platform? </span>
                  </div>
                </div>
              </div>
              </>
            )
          },
        'Privacy and Security': 'Privacy and Security tab content',
        'Matching and Algorithms': 'Matching and Algorithms tab content',
        'Subscription and Payments': 'Subscription and Payments tab content',
        'Reporting and Moderation': 'Reporting and Moderation tab content',
        'Technical Support': 'Technical Support tab content',
        'Dating Advice and Tips': 'Dating Advice and Tips tab content',
      };
      
    return (
      <div className='asked-question-container'>
        <div className="faq-content-box">
          <div className="browser-topic">
            <div className="browser-topic-heading">
              <span>Browse by Topics</span>
            </div>
            <div className="browser-topic-links">
              {Object.keys(tabData).map(topic => (
                <div className="browser-topic-link" key={topic} onClick={() => setActiveTab(topic)}>
                  <Dot color={getTopicColor(topic)} />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="browser-detail-box">
            <div className="browser-detail-heading">
              <span>{activeTab}</span>
            </div>
            <div className="browser-detail-content">
              {tabData[activeTab].about}
            </div>
          </div>
        </div>
      </div>
    );
};

const getTopicColor = (topic) => {
  switch (topic) {
    case 'General':
      return '#FF9A6C';
    case 'Privacy and Security':
      return '#F6587E';
    case 'Matching and Algorithms':
      return '#106FDE';
    case 'Subscription and Payments':
      return '#00E14D';
    case 'Reporting and Moderation':
      return '#DE1041';
    case 'Technical Support':
      return '#A155B9';
    case 'Dating Advice and Tips':
      return '#FFDF6C';
    default:
      return '#000000';
  }
};

export default FaqContent;
