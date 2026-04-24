// Disclaimer.js
import React from "react";
import "../Css/Disclaimer.css";

const Disclaimer = () => {
  return (
    <div className="disclaimer-container">
      <h1>Disclaimer</h1>
      <p>
        The information provided on this website is for general informational purposes only and should not be considered as legal advice, legal opinion, or professional guidance.
      </p>
      <p>
        This website is not an official government website and is not affiliated with, endorsed by, or connected to any court, government department, or legal authority. The content is intended to help users understand legal concepts and procedures in a simplified manner.
      </p>
      <p>
        While we strive to keep the information accurate and up to date, laws and legal procedures may change. We make no guarantees regarding the completeness, accuracy, or reliability of the content.
      </p>
      <p>
        Users are advised to consult a qualified legal professional or official sources before taking any legal action based on the information provided on this website. The website and its creators shall not be held liable for any loss, damage, or consequences arising from the use of this content.
      </p>
      <p>
        By using this website, you acknowledge and agree to this disclaimer.
      </p>
    </div>
  );
};

export default Disclaimer;