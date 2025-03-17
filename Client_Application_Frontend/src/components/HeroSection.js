

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../assets/images/backlit.jpeg"; // Single background image

const textSlides = [
  "Life is full of moments that define who we are. At HireGenius, everyone can create moments that give them a sense of purpose. #MakeYourMoment",
  "Join a team where innovation and creativity drive meaningful impact. At HireGenius, we empower you to grow and thrive.",
  "We believe in diversity, inclusion, and respect. Work with colleagues from around the world and build something extraordinary.",
];

const HeroSection = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textSlides.length);
    }, 5000); // Change text every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full h-screen text-white overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${image1})` }} // Setting a single background image
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay for better readability */}

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 sm:px-6 py-20 relative">
          <div className="flex flex-col md:flex-row items-center">
            {/* Text Content with Auto-Sliding Description */}
            <motion.div
              className="w-full md:w-1/2 order-1 md:order-2 text-center md:text-left"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="relative p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  Careers at HireGenius
                </h1>
              </motion.div>

              <motion.div className="relative p-2">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={textIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-white"
                  >
                    {textSlides[textIndex]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
