import React from "react";
import "./style.css";
import Banner from "../../Banner/Banner";
import Footer from "../../Footer/Footer";
import { Dot } from "lucide-react";
const TermsCondition = () => {
  return (
    <div className="termsCondition-container">
      <Banner
        heading={"Terms & Conditions"}
        subHeding={"Home - Terms & Conditions"}
      />
      <div className="terms-condition-content">
        <div className="terms-condition-box">
          <span>Introduction</span>
          <div className="terms-condition-box-text">
            <p>
              These Terms and Conditions govern your use of [Zeppler Online
              Dating] and its associated services. By accessing or using the
              website, you agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>

        <div className="terms-condition-box">
          <span>Use of the Website</span>
          <div className="terms-condition-box-text">
            <Dot />
            <p>
              These Terms and Conditions govern your use of [Zeppler Online
              Dating] and its associated services. By accessing or using the
              website, you agree to be bound by these Terms and Conditions.
            </p>
          </div>
          <div className="terms-condition-box-text">
            <Dot />
            <p>
              You are responsible for ensuring that all information you provide
              on the website is accurate, current, and complete. You agree not
              to use the website for any unlawful purpose or in violation of any
              applicable laws or regulations.
            </p>
          </div>
        </div>

        <div className="terms-condition-box">
          <span>Intellectual Property Rights</span>
          <div className="terms-condition-box-text">
            <p>
              All content on this website, including but not limited to text,
              graphics, logos, images, audio clips, and video clips, is the
              property of [Zeppler Online Dating] or its licensors and is
              protected by copyright, trademark, and other intellectual property
              laws.
            </p>
          </div>
        </div>

        <div className="terms-condition-box">
          <span>User Content</span>
          <div className="terms-condition-box-text">
            <p>
              By posting, submitting, or transmitting any content on or through
              the website, you grant [Zeppler Online Dating] a non-exclusive,
              worldwide, royalty-free, perpetual, irrevocable, and fully
              sublicensable license to use, reproduce, modify, adapt, publish,
              translate, create derivative works from, distribute, and display
              such content.
            </p>
          </div>
        </div>
        <div className="terms-condition-box">
          <span>Privacy Policy</span>
          <div className="terms-condition-box-text">
            <p>
              Your use of the website is governed by our Privacy Policy, which
              is incorporated into these Terms and Conditions by reference.
              Please review the Privacy Policy carefully before using the
              website.
            </p>
          </div>
        </div>

        <div className="terms-condition-box">
          <span>Disclaimer of Warranties</span>
          <div className="terms-condition-box-text">
            <p>
              The website is provided on an "as is" and "as available" basis,
              without any warranties of any kind, either express or implied.
              [Zeppler Online Dating] makes no representations or warranties
              regarding the accuracy, reliability, or completeness of any
              content on the website.
            </p>
          </div>
        </div>

        <div className="terms-condition-box">
          <span>Changes to Terms and Conditions</span>
          <div className="terms-condition-box-text">
            <p>
              [Zeppler Online Dating] reserves the right to modify or update
              these Terms and Conditions at any time without prior notice. Your
              continued use of the website after any such changes constitutes
              your acceptance of the new Terms and Conditions.
            </p>
          </div>
        </div>

        <div className="terms-condition-box">
          <span>Governing Law</span>
          <div className="terms-condition-box-text">
            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of [Your Country], without regard to its
              conflict of law provisions.If you have any questions or concerns
              about these Terms and Conditions, please contact us at
              contact@zeppler.com
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsCondition;
