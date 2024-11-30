

// import React from 'react';
// import { motion } from 'framer-motion';
// import image1 from '../assets/images/3.jpeg';
// import BackgroundSlider from './BackgroundSlider'; // Import the BackgroundSlider component

// const HeroSection = () => {
//   return (
//     <section className="relative w-full h-screen text-white">
//       <BackgroundSlider /> {/* Add the BackgroundSlider component */}
//       <div className="absolute inset-0 flex items-center justify-center z-10">
//         <div className="container mx-auto px-6 py-20">
//           <div className="flex flex-col md:flex-row items-center">
//             <motion.div
//               className="w-full md:w-1/2 flex justify-center order-2 md:order-1"
//               initial={{ opacity: 0, x: -100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1 }}
//             >
//               <motion.img
//                 src={image1}
//                 alt="Career at HireGenius"
//                 className="rounded-full shadow-lg w-80 h-80 md:w-96 md:h-96"
//                 animate={{ rotate: 360 }}
//                 transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
//               />
//             </motion.div>
//             <motion.div
//               className="w-full md:w-1/2 order-1 md:order-2 text-center md:text-left"
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1 }}
//             >
//               <motion.h1
//                 className="text-4xl md:text-5xl font-bold mb-6"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5, duration: 1 }}
//               >
//                 Careers at HireGenius
//               </motion.h1>
//               <motion.p
//                 className="mb-8"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 1, duration: 1 }}
//               >
//                 Life is full of moments that define who we are. At IFS, everyone
//                 can create moments that give them a sense of purpose. <span className="font-semibold">#MakeYourMoment</span>
//               </motion.p>
//               <motion.button
//                 className="bg-green-500 text-white rounded-md px-6 py-3 font-bold hover:bg-green-600"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 See Available Positions
//               </motion.button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/images/3.jpeg';
import BackgroundSlider from './BackgroundSlider'; // Import the BackgroundSlider component
import equipment1 from '../assets/images/Untitled-25.png';
import equipment2 from '../assets/images/Untitled-27.png';
import equipment3 from '../assets/images/Untitled-28.png';

const equipmentImages = [equipment1, equipment2, equipment3];

const HeroSection = () => {
  const [rotateDirection, setRotateDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotateDirection((prevDirection) => prevDirection * -1);
    }, 10000); // Change direction every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen text-white overflow-hidden">
      <BackgroundSlider /> {/* Add the BackgroundSlider component */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-2 sm:px-6 py-20 relative">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="w-full md:w-1/2 flex justify-center order-2 md:order-1"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.img
                src={image1}
                alt="Career at HireGenius"
                className="rounded-full shadow-lg w-50 h-50 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96"
                animate={{ rotate: rotateDirection * 45 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 order-1 md:order-2 text-center md:text-left"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="relative p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 z-10">
                  Careers at HireGenius
                </h1>
              </motion.div>
              <motion.div
                className="relative p-4 sm:p-6 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <p className="relative text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-8 z-10">
                  Life is full of moments that define who we are. At HireGenius, everyone
                  can create moments that give them a sense of purpose. <span className="font-semibold">#MakeYourMoment</span>
                </p>
              </motion.div>
              <motion.button
                className="bg-green-500 text-white rounded-md px-4 py-2 sm:px-6 sm:py-3 font-bold hover:bg-green-600 mt-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                See Available Positions
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
      {equipmentImages.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt="Equipment"
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '30px',
            height: '30px',
            animation: `fall ${Math.random() * 5 + 5}s linear infinite`,
          }}
        />
      ))}
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