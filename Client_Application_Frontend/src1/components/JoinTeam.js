// import React from 'react';

// const JoinTeam = () => {
//   return (
//     <section className="bg-gray-50 py-12">
//       <div className="container mx-auto px-6">
//         <div className="flex flex-col md:flex-row items-center gap-8">
//           <div className="md:w-1/2">
//             <h2 className="text-2xl font-bold text-purple-700 mb-4">Join our team</h2>
//             <p className="text-gray-600 mb-6">
//               Work in an established company, but operate with the passion and speed of a startup.
//               Challenge the ordinary and innovate to create amazing experiences for our customers.
//             </p>
//             <button className="bg-purple-600 text-white rounded-md px-6 py-3 hover:bg-purple-700">
//               Search career opportunities
//             </button>
//           </div>
//           <div className="md:w-1/2 flex justify-center">
//             <div className="bg-gray-300 h-48 w-full rounded-lg shadow-md flex justify-center items-center">
//               <span className="text-purple-700 text-4xl font-bold">Video Placeholder</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JoinTeam;

// import React from 'react';
// import { motion } from 'framer-motion';
// import image1 from '../assets/images/life.mp4';

// const JoinTeam = () => {
//   return (
//     <section className="bg-gray-50 py-12">
//       <div className="container mx-auto px-6">
//         <motion.div
//           className="flex flex-col md:flex-row items-center gap-8"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <motion.div
//             className="md:w-1/2"
//             initial={{ opacity: 0, x: -100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, delay: 0.5 }}
//           >
//             <h2 className="text-3xl font-bold text-purple-700 mb-4">
//               Join our team
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Work in an established company, but operate with the passion and speed of a startup.
//               Challenge the ordinary and innovate to create amazing experiences for our customers.
//             </p>
//             <motion.button
//               className="bg-purple-600 text-white rounded-md px-6 py-3 font-bold hover:bg-purple-700"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               Search career opportunities
//             </motion.button>
//           </motion.div>
//           <motion.div
//             className="md:w-1/2 flex justify-center"
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, delay: 0.5 }}
//           >
//             <div className="bg-gray-300 h-80 w-full rounded-lg shadow-md flex justify-center items-center">
//               <video
//                 className="h-full w-full object-cover rounded-lg"
//                 src={image1}
//                 autoPlay
//                 loop
//                 muted
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default JoinTeam;

import React from 'react';
import { motion } from 'framer-motion';
import video1 from '../assets/images/life.mp4';
import video2 from '../assets/images/values.mp4';

const JoinTeam = () => {
  return (
    <section
      className="relative bg-gradient-to-r from-[#352F44] via-[#5C5470] to-[#DBD8E3] opacity-7 py-12"
    
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {/* Left Video */}
          <motion.div
            className="md:w-1/4 flex justify-center"
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <motion.div
              className="bg-gray-300 h-96 w-96 rounded-lg shadow-md flex justify-center items-center"
              whileHover={{
                scale: 1.05,
                rotate: -2,
                transition: { type: 'spring', stiffness: 150 },
              }}
            >
              <motion.video
                className="h-full w-full object-cover rounded-lg"
                src={video1}
                autoPlay
                loop
                muted
                whileHover={{
                  filter: 'brightness(0.8) blur(2px)',
                  transition: { duration: 0.5 },
                }}
              />
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="md:w-1/2 text-center md:text-left text-white"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <motion.h2
              className="text-4xl font-bold mb-4"
              whileHover={{ scale: 1.1, color: '#FFD700' }}
            >
              Join our team
            </motion.h2>
            <motion.p
              className="text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Work in an established company, but operate with the passion and
              speed of a startup. Challenge the ordinary and innovate to create
              amazing experiences for our customers.
            </motion.p>
            <motion.button
              className="bg-yellow-500 text-gray-900 rounded-md px-6 py-3 font-bold hover:bg-yellow-600"
              whileHover={{
                scale: 1.1,
                boxShadow: '0px 5px 15px rgba(255, 215, 0, 0.6)',
              }}
              whileTap={{
                scale: 0.9,
                boxShadow: '0px 3px 8px rgba(255, 215, 0, 0.5)',
              }}
            >
              Search career opportunities
            </motion.button>
          </motion.div>

          {/* Right Video */}
          <motion.div
            className="md:w-1/4 flex justify-center"
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <motion.div
              className="bg-gray-300 h-96 w-96 rounded-lg shadow-md flex justify-center items-center"
              whileHover={{
                scale: 1.05,
                rotate: 2,
                transition: { type: 'spring', stiffness: 150 },
              }}
            >
              <motion.video
                className="h-full w-full object-cover rounded-lg"
                src={video2}
                autoPlay
                loop
                muted
                whileHover={{
                  filter: 'brightness(0.8) blur(2px)',
                  transition: { duration: 0.5 },
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinTeam;
