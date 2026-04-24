import React, { useState } from "react";
import "../Css/Contact.css";

const Contact = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="contact-container">

      <h1>Contact Us</h1>

      <p>
        We’d love to hear from you. If you have questions, feedback, or 
        suggestions related to this website, feel free to get in touch with us.
      </p>

      <h2>Get in Touch</h2>

      <p>
        For inquiries about features, content, or general information 
        available on the website, you can contact us using the details below.
      </p>

      <div className="contact-info">
        <p><strong>Email:</strong> support@example.com</p>
        <p><strong>Phone:</strong> +91 XXXXXXXXXX</p>
        <p><strong>Location:</strong> India</p>
      </div>

      <h2>Send Us a Message</h2>

      <p>Please avoid sharing sensitive or confidential personal information through this form.</p>

      <form onSubmit={handleSubmit} className="contact-form">

        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <label>Message</label>
        <textarea
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit</button>

      </form>

    </div>
  );
};

export default Contact;