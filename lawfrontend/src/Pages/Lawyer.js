import React, { useEffect, useState } from "react";
import "../Css/lawyer.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const Lawyer = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showForm, setShowForm] = useState(false);
  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    specialization: "",
    fees: "",
    phone: "",
    image: "",
    upiId: "" // ✅ New field
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/lawyer-profile/${user._id}`
        );
        const data = await res.json();
        if (data) setProfile(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchProfile();
  }, [user, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = profile
        ? "http://localhost:5000/api/lawyer-profile/" + profile._id
        : "http://localhost:5000/api/lawyer-profile";
      const method = profile ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: user._id }),
      });

      const data = await res.json();
      setProfile(data);
      setShowForm(false);

      // Reset form
      setFormData({
        name: data.name || "",
        address: data.address || "",
        specialization: data.specialization || "",
        fees: data.fees || "",
        phone: data.phone || "",
        image: data.image || "",
        upiId: data.upiId || ""
      });

    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="user-page">
      {user ? (
        <h2 className="user-heading">Welcome Advocate, {user.name}!</h2>
      ) : <h2>Please login first</h2>}

      {profile && (
        <div className="lawyer-card">
          <div className="lawyer-img">
            <img
              src={profile.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="lawyer"
            />
          </div>

          <div className="lawyer-info">
            <h3>Advocate {profile.name}</h3>
            <p>📍 {profile.address}</p>
            <p>⚖ {profile.specialization}</p>
            <p className="fees">₹ {profile.fees}</p>
            <p>🔗 UPI ID: {profile.upiId || "Not Provided"}</p>

            <div className="lawyer-buttons">
              <a
                href={`https://wa.me/91${profile.phone}`}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-btn"
              >
                <FaWhatsapp /> WhatsApp
              </a>

              <button
                className="book-btn"
                onClick={() => navigate("/book-lawyer", { state: { profile } })}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {user && (
        <div className="user-cards-container">
          <div className="user-card">
            <h3>{profile ? "Update Profile" : "Create Profile"}</h3>
            <button
              onClick={() => {
                if (profile) setFormData(profile);
                setShowForm(true);
              }}
            >
              {profile ? "Update" : "Create"}
            </button>
          </div>
          <div className="user-card">
            <h3>Manage Cases</h3>
            <button onClick={() => navigate("/Managecases")}>Explore More</button>
          </div>
          <div className="user-card">
            <h3>Appointments</h3>
            <button onClick={() => navigate("/Appointments", { state: { lawyerId: profile._id } })}>
              Explore Appointments
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="popup">
          <div className="popup-content">
            <h3>{profile ? "Update Profile" : "Create Profile"}</h3>
            <form onSubmit={handleSubmit}>
              <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
              <input name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} required />
              <input name="fees" placeholder="Fees" value={formData.fees} onChange={handleChange} required />
              <input name="phone" placeholder="WhatsApp Number" value={formData.phone} onChange={handleChange} required />
              <input name="upiId" placeholder="UPI ID" value={formData.upiId} onChange={handleChange} />
              <input type="file" accept="image/*" onChange={handleImage} />

              <div className="form-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowForm(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lawyer;