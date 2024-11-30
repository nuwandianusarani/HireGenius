import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons from react-icons
import image1 from '../assets/images/rec1.jpg';
import image2 from '../assets/images/rec2.jpg';
import image3 from '../assets/images/rec4.jpg';
import image4 from '../assets/images/rec6.jpg';
import image5 from '../assets/images/rec7.jpg';
import image6 from '../assets/images/rec8.jpg';
import image7 from '../assets/images/rec.jpg';

const images = [image1, image2, image3, image4, image5, image6, image7] ;

const BackgroundSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Background"
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
        onClick={handlePrev}
      >
        <FaArrowLeft />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
        onClick={handleNext}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default BackgroundSlider;