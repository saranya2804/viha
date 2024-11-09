import React, { useState, useEffect } from 'react';
import './Banner.css'; // CSS file for styling

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: 'https://viharrni.com/cdn/shop/files/Untitled_design_34.webp?v=1721048991' },
    { image: 'https://viharrni.com/cdn/shop/files/Banner_viharniddddd.jpg?v=1722941607'},
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [slides.length]);

  return (
    <div className="banner">
      <img src={slides[currentSlide].image} alt="Banner" className="banner-image" />
      <div className="banner-text">{slides[currentSlide].text}</div>
    </div>
  );
};

export default Banner;
