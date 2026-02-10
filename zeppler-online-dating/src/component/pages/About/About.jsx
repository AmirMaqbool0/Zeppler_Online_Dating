import React from "react";
import "./style.css";
import AboutLogo from "../../../assests/about1.png";
import AboutLogo2 from '../../../assests/abou2.png';
import { Dot, Flag, Goal, Telescope } from "lucide-react";
import Footer from "../../Footer/Footer";
import Banner from "../../Banner/Banner";

const About = () => {
  return (
    <div className="about-container">
      <Banner heading={'About Zeppler'} subHeding={'Home - About'} poster={AboutLogo}/>
      <div className="about-content">
        <div className="about-content-text">
          <span>
            Where singles can connect authentically and find meaningful
            relationships
          </span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Sed ut
            perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
            aut odit aut fugit, sed quia consequuntur magni dolores eos qui
            ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
            quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem.
          </p>
        </div>
        <div className="about-content-img">
          <img src={AboutLogo} alt="" />
        </div>
      </div>

      <div className="about-future-goals">
        <div className="future-goal-box">
          <Goal color="#FFB049" size={40} />
          <span>Our Mission</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="future-goal-box">
          <Telescope color="#FFB049" size={40} />
          <span>Our Vision</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="future-goal-box">
          <Flag color="#FFB049" size={40} />
          <span>Our Goal</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div className="choose-zeppler-section">
        <div className="choose-zeppler-img">
          <img src={AboutLogo2} alt="" />
        </div>
        <div className="choose-zeppler-text">
          <span>Why Choose Zeppler</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum nulla pariatur.
          </p>
          <div className="zeppler-points">
            <div className="zippler-point">
              <Dot />
              <span>Culpa qui officia deserunt mollit anim id est laborum.</span>
            </div>
            <div className="zippler-point">
              <Dot />
              <span>Culpa qui officia deserunt mollit anim id est laborum.</span>
            </div>
            <div className="zippler-point">
              <Dot />
              <span>Culpa qui officia deserunt mollit anim id est laborum.</span>
            </div>
            <div className="zippler-point">
              <Dot />
              <span>Culpa qui officia deserunt mollit anim id est laborum.</span>
            </div>
            <div className="zippler-point">
              <Dot />
              <span>Culpa qui officia deserunt mollit anim id est laborum.</span>
            </div>
            <div className="zippler-point">
              <Dot />
              <span>Culpa qui officia deserunt mollit anim id est laborum.</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
