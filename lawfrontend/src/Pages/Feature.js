import React from "react";
import Slider from "react-slick";
import "../Css/Feature.css";

// Slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeatureCard = ({ title, description }) => {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Feature = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 7000,          // Scroll speed
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 0,     // Start immediately
    cssEase: "linear",    // Smooth continuous scroll
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="feature-container">
      <h1 className="feature-title">Our Features</h1>

      <Slider {...settings}>
        <FeatureCard
          title="Time Reminder"
          description="Get reminders for meetings and court appearances."
        />
        <FeatureCard
          title="Secure File Upload"
          description="Upload and manage legal documents securely."
        />
        <FeatureCard
          title="Client Management"
          description="Organize client details and case information efficiently."
        />
        <FeatureCard
          title="Case Analytics"
          description="Analyze case progress and performance insights."
        />
        <FeatureCard
          title="Search Cases"
          description="Quickly search for ongoing or past legal cases."
        />
        <FeatureCard
          title="Legal Consultation"
          description="Connect with legal experts for guidance."
        />
        <FeatureCard
          title="Document Templates"
          description="Access pre-built legal document templates."
        />
      </Slider>
    </div>
  );
};

export default Feature;