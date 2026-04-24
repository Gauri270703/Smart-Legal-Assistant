import React, { useState } from "react";
import "../Css/home.css";
import ScrollTop from "./ScrollTop"; 

import mainImg from "../Assets/images/image1.jpg";
import img1 from "../Assets/images/image2.jpg";
import img2 from "../Assets/images/image3.jpg";
import img3 from "../Assets/images/image4.jpg";

const Home = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  const openPopup = (text) => {
    setPopupText(text);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // ===== LONG POPUP MESSAGES =====

const legalAffairsMessage = `
The Department of Legal Affairs functions under the Ministry of Law and Justice, Government of India.
It provides legal advice to various ministries and government departments.
The department represents the Government of India in the Supreme Court and High Courts.
It ensures that all government actions comply with constitutional provisions.
The department drafts and reviews contracts, agreements, and legal documents.
It assists in policy formation related to legal matters.
The department coordinates with senior law officers.
It helps in dispute resolution involving the government.
It promotes transparency and accountability in governance.
It plays a key role in strengthening the rule of law.
It supports legal reforms to improve justice delivery.
It ensures effective legal administration across the country.
`;

const legislativeDepartmentMessage = `
The Legislative Department is responsible for drafting bills and legislation.
It prepares ordinances and amendments to existing laws.
The department ensures that proposed laws comply with the Constitution.
It provides legal language and structure to government policies.
It reviews legislative proposals before introduction in Parliament.
It assists ministries in converting policies into legal form.
The department maintains official records of central laws.
It publishes acts passed by Parliament.
It updates statutory rules and regulations.
It ensures clarity and consistency in legal drafting.
It supports parliamentary procedures.
It contributes to modernizing India’s legal framework.
`;

const justiceDepartmentMessage = `
The Department of Justice focuses on judicial administration in India.
It oversees the functioning of various courts.
The department works to improve access to justice.
It implements judicial reforms and modernization programs.
It supports infrastructure development for courts.
The department manages appointments of judges.
It promotes e-courts and digital case management.
It works toward reducing case backlogs.
It strengthens legal aid services.
It ensures fair and transparent judicial processes.
It coordinates between judiciary and government.
It aims to improve efficiency in justice delivery.
`;
  return (
    <>

      {/* ======= TOP IMAGE WITH TEXT ======= */}
      <div className="image-container">
        <img src={mainImg} alt="Main" className="main-image" />

        <div className="image-text">
          <h1>LEXPERT</h1>
          <p>WE fight for your justice.</p>
          <p>
            Legal Help Made Simple – Search laws, understand your rights,
            and connect with legal experts easily.
          </p>
        </div>
      </div>


      {/* ======= CLIENT & LAWYER SECTION ======= */}
      <div className="Main">
        <div className="Client">
          <h2>Client</h2>
          <p>Find experienced lawyers easily.</p>
          <p>Understand your legal rights.</p>
          <p>Get timely reminders for court dates.</p>
          <p>Upload and manage legal documents securely.</p>
          
        </div>

        <div className="Lawyer">
          <h2>Lawyer</h2>
          <p>Connect with genuine clients.</p>
          <p>Grow your professional network.</p>
          <p>Manage cases and documents efficiently.</p>
          <p>Focus on strategy, not paperwork.</p>
        </div>
      </div>


      {/* ======= DEPARTMENT SECTION ======= */}

      
      <div className="department-section">

        <div className="department-card">
          <img src={img1} alt="Criminal Law" />
          <button
            className="dept-btn"
            onClick={() => openPopup(legalAffairsMessage)}
          >
          Department of legal affair
          </button>
        </div>

        <div className="department-card">
          <img src={img2} alt="Family Law" />
          <button
            className="dept-btn"
            onClick={() => openPopup(legislativeDepartmentMessage )}
          >
           Legislative Department
          </button>
        </div>

        <div className="department-card">
          <img src={img3} alt="Corporate Law" />
          <button
            className="dept-btn"
            onClick={() => openPopup(justiceDepartmentMessage)}
          >
         Department of justice
          </button>
        </div>

      </div>


      {/* ======= POPUP ======= */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Department Information</h3>
            <p>{popupText}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
<ScrollTop /> 
    </>
  );
};

export default Home;