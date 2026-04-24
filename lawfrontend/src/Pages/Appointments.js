import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Appointments = () => {
  const location = useLocation();
  const lawyerId = location.state?.lawyerId;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!lawyerId) return;

    const fetchAppointments = async () => {
      const res = await fetch(`http://localhost:5000/api/appointments/lawyer/${lawyerId}`);
      const data = await res.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, [lawyerId]);

  const updateStatus = async (id, status) => {
    const meetingLink = status === "approved" ? prompt("Enter meeting link (Zoom/Google Meet) if any") : null;
    const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, meetingLink }),
    });
    const data = await res.json();
    alert(`Appointment ${status}!`);
    setAppointments(prev => prev.map(a => a._id === id ? { ...a, status, meetingLink } : a));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Appointments Dashboard</h2>
      {appointments.length === 0 ? <p>No appointments yet.</p> :
        appointments.map(a => (
          <div key={a._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0", borderRadius: "8px", background: a.status === "approved" ? "#d4edda" : a.status === "rejected" ? "#f8d7da" : "#fff" }}>
            <p><b>User:</b> {a.userName} ({a.email})</p>
            <p><b>Phone:</b> {a.phone}</p>
            <p><b>Date:</b> {new Date(a.date).toLocaleDateString()}</p>
            <p><b>Payment Status:</b> {a.paymentStatus}</p>
            <p><b>Status:</b> {a.status}</p>

            {a.status === "pending" && (
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => updateStatus(a._id, "approved")}>Approve</button>
                <button onClick={() => updateStatus(a._id, "rejected")}>Reject</button>
              </div>
            )}

            {a.meetingLink && <p><b>Meeting Link:</b> <a href={a.meetingLink} target="_blank" rel="noreferrer">{a.meetingLink}</a></p>}
          </div>
        ))
      }
    </div>
  );
};

export default Appointments;