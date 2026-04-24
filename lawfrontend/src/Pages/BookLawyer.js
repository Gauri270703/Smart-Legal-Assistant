import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const BookLawyer = () => {
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [upiId, setUpiId] = useState("");
  const [txnPaid, setTxnPaid] = useState(false);

  const [appointmentStatus, setAppointmentStatus] = useState(null);
  const [meetingLink, setMeetingLink] = useState("");

  // Fetch lawyers
  useEffect(() => {
    fetch("http://localhost:5000/api/lawyers")
      .then(res => res.json())
      .then(data => setLawyers(data))
      .catch(err => console.error(err));
  }, []);

  // Select lawyer
  const selectLawyer = async (id) => {
    const res = await fetch(`http://localhost:5000/api/lawyer/${id}`);
    const data = await res.json();
    setSelectedLawyer(data);
    setShowForm(false);
    setAppointmentStatus(null);
    setMeetingLink("");
    setTxnPaid(false);
    setUpiId("");
  };

  // Book appointment
  const bookAppointment = async () => {
    if (!name || !email || !phone || !date) {
      return alert("Fill all required fields");
    }

    if (paymentMethod === "upi" && !txnPaid) {
      return alert("Please complete UPI payment first!");
    }

    alert("Your request has been sent!");

    const res = await fetch(`http://localhost:5000/api/appointments/${selectedLawyer._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        userName: name,
        email,
        phone,
        date,
        note,
        paymentMethod,
        paymentStatus: txnPaid ? "paid" : "not paid",
        paymentId: paymentMethod === "upi" ? upiId : null
      }),
    });

    const data = await res.json();
    if (!res.ok) return console.error(data.message || "Failed");

    setShowForm(false);
    setName(""); setEmail(""); setPhone(""); setDate(""); setNote("");
    setPaymentMethod("cash"); setPaymentStatus("pending"); setUpiId(""); setTxnPaid(false);
  };

  // Polling
  useEffect(() => {
    let interval;
    if (selectedLawyer && email) {
      interval = setInterval(async () => {
        const res = await fetch(`http://localhost:5000/api/appointments/user/${email}`);
        const data = await res.json();
        if (data.length > 0) {
          const latest = data[data.length - 1];
          setAppointmentStatus(latest.status);
          setPaymentStatus(latest.paymentStatus);
          if (latest.meetingLink) setMeetingLink(latest.meetingLink);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [selectedLawyer, email]);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h2>Book a Lawyer</h2>

      {/* Lawyer Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {lawyers.map(lawyer => (
          <div
            key={lawyer._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              width: "200px",
              cursor: "pointer"
            }}
            onClick={() => selectLawyer(lawyer._id)}
          >
            <img
              src={lawyer.image}
              alt={lawyer.name}
              style={{ width: "100%", height: "120px", objectFit: "cover" }}
            />
            <h4>{lawyer.name}</h4>
            <p>{lawyer.specialization}</p>
            <p>Fees: ₹{lawyer.fees}</p>
          </div>
        ))}
      </div>

      {/* Selected Lawyer */}
      {selectedLawyer && !showForm && (
        <div style={{
          border: "1px solid #2c3e50",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "8px"
        }}>
          <h3>{selectedLawyer.name}</h3>
          <p>Specialization: {selectedLawyer.specialization}</p>
          <p>Fees: ₹{selectedLawyer.fees}</p>
          <p>Phone: {selectedLawyer.phone}</p>
          <p>UPI ID: {selectedLawyer.upiId}</p>

          {/* ✅ Buttons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/91${selectedLawyer.phone}?text=Hello ${selectedLawyer.name}, I want to book an appointment.`}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "10px 15px",
                backgroundColor: "#25D366",
                color: "#fff",
                borderRadius: "5px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <FaWhatsapp /> WhatsApp
            </a>

            {/* Book */}
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2c3e50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Book Appointment
            </button>

          </div>

          {appointmentStatus && (
            <div style={{
              marginTop: "15px",
              padding: "10px",
              border: "1px solid #27ae60",
              borderRadius: "5px",
              backgroundColor: "#eafaf1"
            }}>
              <p><b>Appointment Status:</b> {appointmentStatus}</p>
              <p><b>Payment Status:</b> {paymentStatus}</p>
              {meetingLink && (
                <p>
                  <b>Meeting Link:</b>{" "}
                  <a href={meetingLink} target="_blank" rel="noreferrer">
                    {meetingLink}
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Form */}
      {showForm && selectedLawyer && (
        <div style={{
          border: "1px solid #27ae60",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "8px"
        }}>
          <h3>Appointment Form for {selectedLawyer.name}</h3>

          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
          <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
          <textarea placeholder="Note" value={note} onChange={e => setNote(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
        {/* Payment Method */}
<select
  value={paymentMethod}
  onChange={(e) => setPaymentMethod(e.target.value)}
  style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
>
  <option value="cash">Cash</option>
  <option value="upi">UPI</option>
</select>

{/* UPI Section */}
{paymentMethod === "upi" && (
  <div style={{ marginBottom: "10px" }}>
    <p><b>UPI ID:</b> {selectedLawyer.upiId}</p>

    <input
      placeholder="Enter Transaction ID"
      value={upiId}
      onChange={(e) => setUpiId(e.target.value)}
      style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
    />

 <button
  onClick={() => {
    const upiLink = `upi://pay?pa=${selectedLawyer.upiId}&pn=${selectedLawyer.name}&am=${selectedLawyer.fees}&cu=INR&tn=Appointment`;

    // Try opening UPI app
    window.location.href = upiLink;

    // simulate success after delay
    setTimeout(() => {
      setTxnPaid(true);
      alert("Payment Done (Demo) ✅");
    }, 2000);
  }}
  style={{
    width: "100%",
    padding: "12px",
    backgroundColor: "#5f259f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  Pay with PhonePe / UPI
</button>
  </div>
)}
          <button
            onClick={bookAppointment}
            style={{
              padding: "10px 20px",
              backgroundColor: "#27ae60",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Book Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default BookLawyer;