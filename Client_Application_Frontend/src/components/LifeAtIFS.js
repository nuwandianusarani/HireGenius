


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../assets/images/val1.jpg";
import image2 from "../assets/images/val2.jpg";
import image3 from "../assets/images/val3.webp";
import image4 from "../assets/images/val4.jpg";
import image5 from "../assets/images/val5.jpg";
import image6 from "../assets/images/ai.png";
import image7 from "../assets/images/assyst.jpeg";

const backgroundImages = [image1, image2, image3, image4, image5, image6, image7]; // Background images for slideshow

const LifeAtIFS = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change background every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Life at HireGenius Section with Background Slideshow */}
      <section className="relative py-12 text-white overflow-hidden">
        {/* Auto-Sliding Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImages[bgIndex]})`, backgroundPosition: "center", backgroundSize: "cover" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Text Content Positioned to the Right */}
        <div className="relative container mx-auto px-6 flex items-center justify-end min-h-[60vh]">
          <motion.div
            className="md:w-1/2 text-right p-8"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <motion.h2
              className="text-4xl font-extrabold text-[#DBD8E3] mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, type: "spring" }}
            >
              Life at HireGenius
            </motion.h2>

            <motion.p
              className="text-[#DBD8E3] text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.7 }}
            >
              We help our customers by ensuring sustainability principles echo in their operations,
              giving them key differentiators to inspire customers worldwide. At HireGenius, you can contribute
              through our CSR initiatives and by partnering with the HireGenius Foundation.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#5C5470", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#5C5470] text-white font-semibold rounded-md px-6 py-3 hover:bg-[#352F44] shadow-md"
            >
              Find out more
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LifeAtIFS;
