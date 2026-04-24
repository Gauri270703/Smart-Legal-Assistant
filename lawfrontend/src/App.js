import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Feature from './Pages/Feature';
import Aboutus from './Pages/About';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Web from './Pages/Web';
import Disclaimer from './Pages/Disclaimer';
import Contact from './Pages/Contact';
import Feedback from './Pages/Feedback';
import Faqs from './Pages/Faqs';
import User from "./Pages/User";
import Lawyer from './Pages/Lawyer'
import LegalCases from './Pages/LegalCases'
import BookLawyer from './Pages/BookLawyer'
import ManageCases from "./Pages/ManageCases";
import Appointments from "./Pages/Appointments";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/web-Policies" element={<Web />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contactUs" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/user" element={<User user={user} />} />
        <Route path="/lawyer" element={<Lawyer user={user} />} />
        <Route path="/legal-cases" element={<LegalCases />} />
        <Route path="/book-lawyer" element={<BookLawyer />} /> 
        <Route path="/Managecases" element={<ManageCases user={user} />} />
        <Route path="/Appointments" element={<Appointments user={user} />} />
   
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;