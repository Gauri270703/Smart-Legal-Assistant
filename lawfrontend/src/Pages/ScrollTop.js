import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"; // Font Awesome icon
import "../Css/ScrollTop.css";

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.scrollY > 300) setVisible(true);
    else setVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      className="scroll-top"
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
    >
      <FontAwesomeIcon icon={faArrowUp} size="2x" />
    </button>
  );
};

export default ScrollTop;