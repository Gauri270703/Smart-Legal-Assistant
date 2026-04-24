import React, { useState } from "react";
import "../Css/Feedback.css";

function Feedback() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);

    setData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="form-container">
      <h2>Feedback Form</h2>

      {isSubmitted && (
        <div className="success-message">
          Thank you for your feedback! 😊
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={data.fullName}
          onChange={(e) =>
            setData({ ...data, fullName: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Subject"
          value={data.subject}
          onChange={(e) =>
            setData({ ...data, subject: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Your Message"
          rows="4"
          value={data.message}
          onChange={(e) =>
            setData({ ...data, message: e.target.value })
          }
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Feedback;