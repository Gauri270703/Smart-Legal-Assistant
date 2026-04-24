import React from "react";
import '../Css/About.css';


const About = () => {
 

  return (

    <div className="about-container">
      <div className="about-header">
        <h1>About LEXPERT</h1>
        <p>Your Trusted Legal Partner</p>
      </div>

      <div className="about-content">
        <p>
          <strong>LEXPERT</strong> is a modern legal assistance platform designed
          to simplify access to justice. We aim to bridge the gap between
          clients and legal professionals by providing secure, transparent,
          and efficient legal services.
        </p>

        <p>
          Our platform allows users to understand their legal rights,
          upload important documents securely, track case progress,
          and receive timely reminders for court appearances and meetings.
        </p>

        <p>
          For legal professionals, LEXPERT offers advanced tools for
          client management, document automation, and case analytics —
          helping lawyers focus more on strategy and less on paperwork.
        </p>

        <p>
          At LEXPERT, we believe that legal help should be simple,
          accessible, and reliable. We are committed to empowering
          individuals and professionals through technology-driven
          legal solutions.
        </p>
      </div>
    </div>
  )
}

export default About
