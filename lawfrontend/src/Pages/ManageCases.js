import React, { useEffect, useState, useCallback } from "react";
import "../Css/MangeCases.css";

const ManageCases = ({ user }) => {
  const [cases, setCases] = useState([]);
  const [caseId, setCaseId] = useState("");

  const [clientName, setClientName] = useState("");
  const [caseTitle, setCaseTitle] = useState("");

  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const [file, setFile] = useState(null);

  const currentCase = cases.find(c => c._id === caseId);

  // ✅ FETCH CASES
  const fetchCases = useCallback(async () => {
    if (!user?._id) return;
    try {
      const res = await fetch(`http://localhost:5000/api/legalcases/lawyer/${user._id}`);
      const data = await res.json();
      setCases(data);

      // auto-select first case if none selected
      if (data.length > 0 && !caseId) setCaseId(data[0]._id);
    } catch (err) {
      console.error("Error fetching cases:", err);
    }
  }, [user, caseId]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  // ✅ CREATE CASE
  const createCase = async () => {
    if (!clientName || !caseTitle) return alert("Enter details");
    try {
      const res = await fetch("http://localhost:5000/api/legalcases/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lawyerId: user._id, clientName, caseTitle })
      });

      const newCase = await res.json();
      setClientName("");
      setCaseTitle("");

      // Add new case to state & auto-select it
      setCases(prev => [...prev, newCase]);
      setCaseId(newCase._id);
    } catch (err) {
      console.error("Error creating case:", err);
    }
  };

  // ✅ ADD REMINDER
  const addReminder = async () => {
    if (!caseId) return alert("Select case");
    if (!task) return alert("Enter task");
    try {
      await fetch(`http://localhost:5000/api/legalcases/reminder/${caseId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
      });
      setTask("");
      fetchCases();
    } catch (err) {
      console.error("Error adding reminder:", err);
    }
  };

  // ✅ ADD COURT DATE
  const addCourtDate = async () => {
    if (!caseId) return alert("Select case");
    if (!date) return alert("Select date");
    try {
      await fetch(`http://localhost:5000/api/legalcases/court-date/${caseId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, note })
      });
      setDate("");
      setNote("");
      fetchCases();
    } catch (err) {
      console.error("Error adding court date:", err);
    }
  };

  // ✅ ADD EVIDENCE (file upload)
  const addEvidence = async (e) => {
    e.preventDefault();
    if (!caseId) return alert("Select case");
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await fetch(`http://localhost:5000/api/legalcases/evidence/${caseId}`, {
        method: "POST",
        body: formData
      });
      setFile(null);
      fetchCases();
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  // ✅ COURT DATE NOTIFICATIONS
  useEffect(() => {
    const notify = () => {
      if (!currentCase) return;
      currentCase.courtDates.forEach(cd => {
        const courtDate = new Date(cd.date);
        const today = new Date();
        const diff = (courtDate - today) / (1000 * 60 * 60 * 24);
        if (diff >= 0 && diff <= 1) {
          alert(`Court date for "${currentCase.caseTitle}" is on ${cd.date}: ${cd.note}`);
        }
      });
    };
    const interval = setInterval(notify, 60 * 60 * 1000); // every hour
    return () => clearInterval(interval);
  }, [cases, currentCase]);

  return (
     <div className="manage-cases-container">
   <div style={{ padding: "20px" }}>
      <h2>Lawyer Dashboard</h2>

      {/* CREATE CASE */}
      <div>
        <h3>Create Case</h3>
        <input placeholder="Client Name" value={clientName} onChange={e => setClientName(e.target.value)} />
        <input placeholder="Case Title" value={caseTitle} onChange={e => setCaseTitle(e.target.value)} />
        <button onClick={createCase}>Create</button>
      </div>

      {/* SELECT CASE */}
      <div>
        <h3>Select Case</h3>
        <select onChange={e => setCaseId(e.target.value)} value={caseId}>
          <option value="">--Select Case--</option>
          {cases.map(c => <option key={c._id} value={c._id}>{c.caseTitle}</option>)}
        </select>
      </div>

      {/* UPLOAD EVIDENCE */}
      <div>
        <h3>Upload Evidence</h3>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button onClick={addEvidence}>Upload</button>
        {currentCase?.evidenceFiles?.map((f, i) => (
          <p key={i}><a href={f.fileUrl} target="_blank" rel="noopener noreferrer">{f.fileName}</a></p>
        ))}
      </div>

      {/* COURT DATES */}
      <div>
        <h3>Court Dates</h3>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input placeholder="Note" value={note} onChange={e => setNote(e.target.value)} />
        <button onClick={addCourtDate}>Add</button>
        {currentCase?.courtDates?.map((d, i) => (
          <p key={i}>{d.date} - {d.note}</p>
        ))}
      </div>

      {/* REMINDERS */}
      <div>
        <h3>Reminders</h3>
        <input placeholder="Task" value={task} onChange={e => setTask(e.target.value)} />
        <button onClick={addReminder}>Add</button>
        {currentCase?.reminders?.map((r, i) => (
          <p key={i}>{r.task} {r.completed ? "(Done)" : ""}</p>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ManageCases;