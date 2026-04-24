import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Login.css";

const Login = ({ setUser }) => {
  const [showPopup, setShowPopup] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const closePopup = () => setShowPopup(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim()
        })
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.message === "Login successful") {
        setUser(data.user);
        setSubmitted(true);

        setTimeout(() => {
          if (data.role === "user") {
            navigate("/user");
          } else {
            navigate("/lawyer");
          }
        }, 1000);
      } else {
        alert(data.message || "Login failed");
      }

    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="scrolling-message">
        <span>Login Here • Login Here • Login Here •</span>
      </div>

      <div className="login-container">
        {showPopup && !submitted && (
          <div className="popup-overlay">
            <div className="popup-content">
              <span className="popup-close" onClick={closePopup}>
                &times;
              </span>
              <h2>Login</h2>

              <form onSubmit={handleSubmit}>
                {/* ❌ NAME REMOVED */}

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        )}

        {submitted && (
          <div className="thankyou-message">
            <h2>Success!</h2>
            <p>You have logged in successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;