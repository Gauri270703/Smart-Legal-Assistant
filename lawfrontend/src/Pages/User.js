import React, { useEffect } from "react";
import "../Css/User.css";
import img from "../Assets/images/image5.jpg";
import { useNavigate, useLocation } from "react-router-dom";

const User = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation(); // ⭐ important

  // ✅ This will run every time you click Home
  useEffect(() => {
    console.log("User dashboard refreshed");

    // 👉 If you had API, call here
    // fetchUserData();

  }, [location]); // ⭐ KEY FIX

  const goToLegalCases = () => {
    navigate("/legal-cases");
  };

  const goToBookLawyer = () => {
    navigate("/book-lawyer");
  };

  return (
    <div
      className="user-page"
      style={{ backgroundImage: `url(${img})` }}
    >
      {user ? (
        <h2 className="user-heading">Welcome, {user.name}!</h2>
      ) : (
        <h2 className="user-heading">Please login or register first.</h2>
      )}

      <p className="user-text">
        {user
          ? "You can now access your dashboard, manage your cases, and explore all features."
          : "Login or register to get started with LEXPERT and access legal services."}
      </p>

      {user && (
        <div className="user-cards-container">
          <div className="user-card">
            <h3>Search Legal Case</h3>
            <p>
              Discover real court cases and legal precedents.
            </p>
            <button onClick={goToLegalCases}>Explore More</button>
          </div>

          <div className="user-card">
            <h3>Book Lawyer</h3>
            <p>
              Find trusted lawyers and book appointments.
            </p>
            <button onClick={goToBookLawyer}>Explore More</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;