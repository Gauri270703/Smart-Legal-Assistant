import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Register.css";

const Register = ({ setUser }) => {

  // ✅ ALL STATES (IMPORTANT)
  const [showPopup, setShowPopup] = useState(true);
  const [accountType, setAccountType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [barNumber, setBarNumber] = useState("");

  const navigate = useNavigate();

  const closePopup = () => setShowPopup(false);

  const selectAccount = (type) => {
    setAccountType(type);
    setShowPopup(false);
    setSubmitted(false);
  };

  const closeForm = () => {
    setAccountType("");
    setShowPopup(true);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!accountType) {
    alert("Please select account type");
    return;
  }

  if (accountType === "lawyer" && !barNumber) {
    alert("Enter Bar Registration Number");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email: email.trim().toLowerCase(),
        password: password.trim(),
        role: accountType,
        barNumber   // ✅ added
      })
    });

    const data = await res.json();

    if (data.message === "User already exists") {
      alert("User already registered");
      return;
    }

    setSubmitted(true);

    setUser({ name, email, role: accountType });

    setTimeout(() => {
      navigate(accountType === "user" ? "/user" : "/lawyer");
    }, 1500);

  } catch (error) {
    console.log(error);
    alert("Error registering user");
  }
};
  return (
    <div className="register-page">

      <div className="scrolling-message">
        <span>Register Here • Register Here •</span>
      </div>

      <div className="register-container">

        {/* POPUP */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <span className="popup-close" onClick={closePopup}>
                &times;
              </span>
              <p>Select account type</p>
              <div className="popup-buttons">
                <button onClick={() => selectAccount("user")}>User</button>
                <button onClick={() => selectAccount("lawyer")}>Lawyer</button>
              </div>
            </div>
          </div>
        )}

        {/* USER FORM */}
       {accountType === "lawyer" && !submitted && (
  <div className="form-container">
    <span className="form-close" onClick={closeForm}>
      &times;
    </span>
    <h2>Lawyer Registration</h2>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* ✅ BAR NUMBER */}
      <input
        type="text"
        placeholder="Bar Registration Number"
        required
        value={barNumber}
        onChange={(e) => setBarNumber(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Register as Lawyer</button>
    </form>
  </div>
)}
        {/* SUCCESS */}
        {submitted && (
          <div className="thankyou-message">
            <h2>Thank You!</h2>
            <p>
              Registered successfully as{" "}
              {accountType === "user" ? "User" : "Lawyer"}
            </p>
          </div>
        )}

      </div>
      {/* USER FORM */}
{accountType === "user" && !submitted && (
  <div className="form-container">
    <span className="form-close" onClick={closeForm}>
      &times;
    </span>
    <h2>User Registration</h2>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Register as User</button>
    </form>
  </div>
)}
    </div>
    
  );
};

export default Register;