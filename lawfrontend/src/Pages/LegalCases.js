import React, { useState, useEffect } from "react";

const LegalCases = () => {
  const [casesList, setCasesList] = useState([]);
  const [selectedCase, setSelectedCase] = useState("");
  const [caseData, setCaseData] = useState(null);
  const [activeSection, setActiveSection] = useState("");

  // Load dropdown data
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cases");
        const data = await res.json();
        setCasesList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCases();
  }, []);

  // Fetch selected case
  const searchCase = async (value) => {
    try {
      const res = await fetch(`http://localhost:5000/api/search/${value}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setCaseData(null);
      } else {
        setCaseData(data);
        setActiveSection(""); // Reset section when selecting new case
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Styles
  const styles = {
    container: { padding: "40px", textAlign: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
    select: { padding: "12px", width: "350px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" },
    buttonsContainer: { display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px", flexWrap: "wrap" },
    button: { 
      padding: "10px 18px", 
      borderRadius: "6px", 
      border: "none", 
      cursor: "pointer", 
      backgroundColor: "#3498db", 
      color: "#fff", 
      fontWeight: "bold",
      transition: "0.3s"
    },
    activeButton: { backgroundColor: "#2c80b4" },
    buttonHover: { filter: "brightness(85%)" },
    resultBox: { 
      border: "1px solid #ddd", 
      padding: "25px", 
      width: "520px", 
      margin: "30px auto", 
      background: "#fefefe", 
      boxShadow: "0px 4px 15px rgba(0,0,0,0.1)", 
      borderRadius: "10px",
      textAlign: "left",
      lineHeight: "1.6",
      color: "#333",
      minHeight: "80px" // keep box visible even if no section selected
    },
    sectionTitle: { color: "#2c3e50", marginBottom: "10px" },
    ul: { paddingLeft: "20px" },
    li: { marginBottom: "6px" }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ color: "#2c3e50", marginBottom: "25px" }}>Search Legal Cases</h1>

      {/* Dropdown */}
      <select
        value={selectedCase}
        onChange={(e) => {
          const value = e.target.value;
          setSelectedCase(value);
          searchCase(value);
        }}
        style={styles.select}
      >
        <option value="">-- Select Case --</option>
        {casesList.map((item, index) => (
          <option key={index} value={item.case_title}>
            {item.case_title}
          </option>
        ))}
      </select>

      {/* Buttons */}
      {caseData && (
        <div style={styles.buttonsContainer}>
          {["law_section", "description", "punishment", "court", "past_cases"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              style={{
                ...styles.button,
                ...(activeSection === section ? styles.activeButton : {}),
              }}
              onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(85%)")}
              onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(100%)")}
            >
              {section === "law_section" ? "Law Section" :
               section === "description" ? "Description" :
               section === "punishment" ? "Punishment" :
               section === "court" ? "Court" :
               "Related Past Cases"}
            </button>
          ))}
        </div>
      )}

      {/* Result Box */}
      {caseData && (
        <div style={styles.resultBox}>
          {activeSection === "" && <p style={{ color: "#999" }}>Click a button above to view details.</p>}

          {activeSection === "law_section" && <p><b style={styles.sectionTitle}>Law Section:</b> {caseData.law_section}</p>}
          {activeSection === "description" && <p><b style={styles.sectionTitle}>Description:</b> {caseData.description}</p>}
          {activeSection === "punishment" && <p><b style={styles.sectionTitle}>Punishment:</b> {caseData.punishment}</p>}
          {activeSection === "court" && <p><b style={styles.sectionTitle}>Court:</b> {caseData.court}</p>}
          {activeSection === "past_cases" && (
            <div>
              <h3 style={styles.sectionTitle}>Related Past Cases:</h3>
              <ul style={styles.ul}>
                {caseData.past_cases?.map((pc, i) => (
                  <li key={i} style={styles.li}>{pc.case_name} ({pc.year})</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LegalCases;