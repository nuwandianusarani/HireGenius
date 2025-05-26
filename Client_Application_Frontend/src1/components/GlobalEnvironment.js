
// import React from 'react';
// import { motion } from 'framer-motion';
// import image1 from '../assets/images/ai.png';
// import image2 from '../assets/images/industry.png';
// import image3 from '../assets/images/people.jpg';
// import image4 from '../assets/images/summit.jpg';
// import image5 from '../assets/images/hire.png';
// import image6 from '../assets/images/pep.jpg';
// import image7 from '../assets/images/assyst.jpeg';
// import image8 from '../assets/images/rec2.jpg';
// import image9 from '../assets/images/rec3.jpeg';
// import logo from '../assets/images/logopurple.png'; // Importing the logo

// const GlobalEnvironment = () => {
//   const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

//   return (
//     <section className="relative bg-[#352F44] text-white py-12">
//       {/* Company Logo at Top Right Corner */}
//       <div className="absolute top-4 right-6 flex items-center gap-2">
        
//         <h1 className="text-2xl font-bold text-[#DBD8E3]">HireGenius</h1>
//       </div>

//       <div className="container mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1, ease: 'easeOut' }}
//           className="flex flex-col md:flex-row items-center gap-8"
//         >
//           {/* Image Grid with Enhanced Animations */}
//           <div className="md:w-1/2 grid grid-cols-3 gap-4">
//             {images.map((image, index) => (
//               <motion.img
//                 key={index}
//                 src={image}
//                 alt={`Global Environment ${index + 1}`}
//                 className="rounded-lg shadow-lg w-full h-32 object-cover"
//                 whileHover={{
//                   scale: 1.15,
//                   rotate: 8,
//                   boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.5)',
//                   filter: 'brightness(1.2)',
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 transition={{ duration: 0.4, ease: 'easeInOut' }}
//               />
//             ))}
//           </div>

//           {/* Text Section with Animation */}
//           <motion.div
//             initial={{ opacity: 0, x: -100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
//             className="md:w-1/2"
//           >
//             <motion.h2
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="text-3xl font-bold text-[#DBD8E3] mb-4"
//             >
//               A Global and Diverse Environment
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="text-gray-300 mb-6"
//             >
//               We believe in diversity, inclusion, and respect. As you collaborate with colleagues
//               from around the world, you’ll be exposed to and gain value from different walks of life.
//             </motion.p>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default GlobalEnvironment;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../assets/images/ai.png";
import image2 from "../assets/images/industry.png";
import image3 from "../assets/images/val2.jpg";
import image4 from "../assets/images/val1.jpg";
import image5 from "../assets/images/hire.png";
import image6 from "../assets/images/val5.jpg";
import image7 from "../assets/images/assyst.jpeg";
import image8 from "../assets/images/val3.webp";
import image9 from "../assets/images/val4.jpg";
import logo from "../assets/images/logopurple.png"; // Importing the logo

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

const textSlides = [
  {
    title: "A Global and Diverse Environment",
    description:
      "We believe in diversity, inclusion, and respect. As you collaborate with colleagues from around the world, you’ll be exposed to and gain value from different walks of life.",
  },
  {
    title: "Innovation at its Core",
    description:
      "At HireGenius, we push the boundaries of technology, fostering a culture of innovation where ideas turn into reality.",
  },
  {
    title: "Empowering Talent, Transforming Businesses",
    description:
      "Our employees are our greatest strength. We invest in talent and provide the resources needed to create meaningful impact.",
  },
];

const GlobalEnvironment = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textSlides.length);
    }, 5000); // Change text every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-[#352F44] text-white py-12">
      {/* Company Logo at Top Right Corner */}
      <div className="absolute top-4 right-6 flex items-center gap-2">
        <img src={logo} alt="HireGenius Logo" className="w-12 h-auto" />
        <h1 className="text-2xl font-bold text-[#DBD8E3]">HireGenius</h1>
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          {/* Image Grid with Enhanced Animations */}
          <div className="md:w-1/2 grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Global Environment ${index + 1}`}
                className="rounded-lg shadow-lg w-full h-36 object-cover"
                whileHover={{
                  scale: 1.15,
                  rotate: 8,
                  boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.5)",
                  filter: "brightness(1.2)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Auto-Sliding Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:w-1/2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={textIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h2
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-3xl font-bold text-[#DBD8E3] mb-4"
                >
                  {textSlides[textIndex].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-gray-300 mb-6"
                >
                  {textSlides[textIndex].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalEnvironment;
