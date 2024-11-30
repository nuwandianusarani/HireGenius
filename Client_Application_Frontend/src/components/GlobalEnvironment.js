// import React from 'react';
// import image1 from '../assets/images/1.jpeg';
// import image2 from '../assets/images/2.jpeg';
// import image3 from '../assets/images/3.jpeg';
// import image4 from '../assets/images/4.jpeg';
// import image5 from '../assets/images/5.jpeg';
// import image6 from '../assets/images/rec.jpg';
// import image7 from '../assets/images/rec1.jpg';
// import image8 from '../assets/images/rec2.jpg';
// import image9 from '../assets/images/rec3.jpeg';

// const GlobalEnvironment = () => {
//   const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

//   return (
//     <section className="bg-gray-50 py-12">
//       <div className="container mx-auto px-6">
//         <div className="flex flex-col md:flex-row items-center gap-8">
//           {/* Image Grid */}
//           <div className="md:w-1/2 grid grid-cols-3 gap-4">
//             {images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Global Environment ${index + 1}`}
//                 className="rounded-lg shadow-md w-full h-32 object-cover"
//               />
//             ))}
//           </div>

//           {/* Text Section */}
//           <div className="md:w-1/2">
//             <h2 className="text-2xl font-bold text-purple-700 mb-4">A global and diverse environment</h2>
//             <p className="text-gray-600 mb-6">
//               We believe in diversity, inclusion, and respect. As you collaborate with colleagues 
//               from around the world, you’ll be exposed to and gain value from different walks of life.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GlobalEnvironment;

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import image1 from '../assets/images/1.jpeg';
// import image2 from '../assets/images/2.jpeg';
// import image3 from '../assets/images/3.jpeg';
// import image4 from '../assets/images/4.jpeg';
// import image5 from '../assets/images/5.jpeg';
// import image6 from '../assets/images/rec.jpg';
// import image7 from '../assets/images/rec1.jpg';
// import image8 from '../assets/images/rec2.jpg';
// import image9 from '../assets/images/rec3.jpeg';

// const GlobalEnvironment = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

//   return (
//     <section
//       className={`transition-colors duration-500 ${
//         darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
//       } py-12`}
//     >
//       <div className="container mx-auto px-6">
//         {/* Dark Mode Toggle */}
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
//           >
//             Toggle {darkMode ? 'Light' : 'Dark'} Mode
//           </button>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="flex flex-col md:flex-row items-center gap-8"
//         >
//           {/* Image Grid with Animations */}
//           <div className="md:w-1/2 grid grid-cols-3 gap-4">
//             {images.map((image, index) => (
//               <motion.img
//                 key={index}
//                 src={image}
//                 alt={`Global Environment ${index + 1}`}
//                 className="rounded-lg shadow-md w-full h-32 object-cover"
//                 whileHover={{
//                   scale: 1.1,
//                   rotate: 5,
//                   boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)',
//                 }}
//                 transition={{ type: 'spring', stiffness: 200 }}
//               />
//             ))}
//           </div>

//           {/* Text Section with Animation */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="md:w-1/2"
//           >
//             <h2 className="text-2xl font-bold text-purple-700 mb-4">
//               A global and diverse environment
//             </h2>
//             <p className="mb-6">
//               We believe in diversity, inclusion, and respect. As you collaborate with colleagues
//               from around the world, you’ll be exposed to and gain value from different walks of life.
//             </p>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default GlobalEnvironment;


import React from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/images/1.jpeg';
import image2 from '../assets/images/2.jpeg';
import image3 from '../assets/images/3.jpeg';
import image4 from '../assets/images/4.jpeg';
import image5 from '../assets/images/5.jpeg';
import image6 from '../assets/images/rec.jpg';
import image7 from '../assets/images/rec1.jpg';
import image8 from '../assets/images/rec2.jpg';
import image9 from '../assets/images/rec3.jpeg';

const GlobalEnvironment = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          {/* Image Grid with Enhanced Animations */}
          <div className="md:w-1/2 grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Global Environment ${index + 1}`}
                className="rounded-lg shadow-lg w-full h-32 object-cover"
                whileHover={{
                  scale: 1.15,
                  rotate: 8,
                  boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.5)',
                  filter: 'brightness(1.2)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            ))}
          </div>

          {/* Text Section with Animation */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="md:w-1/2"
          >
            <motion.h2
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl font-bold text-purple-500 mb-4"
            >
              A Global and Diverse Environment
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-300 mb-6"
            >
              We believe in diversity, inclusion, and respect. As you collaborate with colleagues
              from around the world, you’ll be exposed to and gain value from different walks of life.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalEnvironment;
