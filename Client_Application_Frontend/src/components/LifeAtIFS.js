


// import React from 'react';
// import { motion } from 'framer-motion';
// import image1 from '../assets/images/4.jpeg';

// const LifeAtIFS = () => {
//   return (
//     <>
//       {/* Life at HireGenius Section */}
//       <section className="relative py-12 bg-gray-50">
//         <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
//           {/* Animated Image */}
//           <motion.div
//             className="md:w-1/2"
//             initial={{ x: -200, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <img
//               src={image1}
//               alt="Life at IFS"
//               className="rounded-lg shadow-lg border-4 border-purple-700"
//             />
//           </motion.div>

//           {/* Animated Text */}
//           <motion.div
//             className="md:w-1/2 bg-white/80 backdrop-blur-lg p-6 rounded-lg shadow-lg"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 1, delay: 0.3 }}
//           >
//             <h2 className="text-3xl font-bold text-purple-700 mb-4">
//               Life at HireGenius
//             </h2>
//             <p className="text-gray-600 mb-6">
//               We help our customers by ensuring sustainability principles echo in their operations, 
//               giving them key differentiators to inspire customers worldwide. At IFS, you can contribute 
//               through our CSR initiatives and by partnering with the IFS Foundation.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="bg-purple-600 text-white rounded-md px-6 py-3 hover:bg-purple-700 shadow-md"
//             >
//               Find out more
//             </motion.button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Job Search Notification Section */}
//       <section className="relative py-12 bg-gradient-to-r from-purple-200 via-white to-purple-200">
//         <motion.div
//           className="container mx-auto px-6 text-center bg-white/80 backdrop-blur-lg p-6 rounded-lg shadow-lg"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <p className="text-gray-700 text-lg mb-6">
//             Can’t find the job you’re looking for? Click below to receive notifications when a suitable job is posted.
//           </p>
//           <motion.button
//             whileHover={{
//               scale: 1.1,
//               backgroundColor: '#6B46C1',
//               color: '#fff',
//             }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-purple-600 text-white rounded-md px-6 py-3 hover:bg-purple-700 shadow-md"
//           >
//             Notify me of jobs
//           </motion.button>
//         </motion.div>
//       </section>
//     </>
//   );
// };

// export default LifeAtIFS;

import React from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/images/4.jpeg';

const LifeAtIFS = () => {
  return (
    <>
      {/* Life at HireGenius Section */}
      <section className="relative py-12 bg-gray-50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          {/* Animated Image */}
          <motion.div
            className="md:w-1/2"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, type: 'spring' }}
          >
            <motion.img
              src={image1}
              alt="Life at IFS"
              className="rounded-lg shadow-lg border-4 border-purple-700"
              whileHover={{
                scale: 1.1,
                rotate: 3,
              }}
            />
          </motion.div>

          {/* Animated Text */}
          <motion.div
            className="md:w-1/2 bg-gradient-to-br from-purple-200/50 via-white/60 to-purple-300/40 backdrop-blur-md p-8 rounded-lg shadow-lg"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <motion.h2
              className="text-4xl font-extrabold text-purple-700 mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, type: 'spring' }}
            >
              Life at HireGenius
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.7 }}
            >
              We help our customers by ensuring sustainability principles echo in their operations,
              giving them key differentiators to inspire customers worldwide. At IFS, you can contribute
              through our CSR initiatives and by partnering with the IFS Foundation.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#5B21B6', color: '#fff' }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white font-semibold rounded-md px-6 py-3 hover:bg-purple-700 shadow-md"
            >
              Find out more
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Job Search Notification Section */}
      <section className="relative py-12 bg-gradient-to-r from-purple-300/50 via-white to-purple-300/50">
        <motion.div
          className="container mx-auto px-6 text-center bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.p
            className="text-gray-700 text-lg mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Can’t find the job you’re looking for? Click below to receive notifications when a suitable job is posted.
          </motion.p>
          <motion.button
            whileHover={{
              scale: 1.15,
              backgroundColor: '#6B46C1',
              color: '#fff',
              boxShadow: '0px 8px 15px rgba(107, 70, 193, 0.5)',
            }}
            whileTap={{ scale: 0.9 }}
            className="bg-purple-600 text-white font-semibold rounded-md px-6 py-3 hover:bg-purple-700 shadow-lg"
          >
            Notify me of jobs
          </motion.button>
        </motion.div>
      </section>
    </>
  );
};

export default LifeAtIFS;
