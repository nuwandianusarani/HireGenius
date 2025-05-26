

// import React from 'react';

// const Testimonial = () => {
//   return (
//     <section className="bg-[#DBD8E3] py-12 text-center">
//       <div className="container mx-auto px-6">
//         <blockquote className="text-lg italic text-[#352F44] mb-4">
//           “I have been fortunate to evolve and grow through diverse roles and various assignments 
//           across different functions and teams. These opportunities, hand in hand with the invaluable 
//           support and encouragement from my colleagues, have been the driving force that kept my passion 
//           alive over past two decades.”
//         </blockquote>
//         <p className="text-[#2A2438] font-bold">Sudarshana Devasena</p>
//         <p className="text-[#5C5470]">Manager Global Consulting</p>
//       </div>
//     </section>
//   );
// };

// export default Testimonial;


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "I have been fortunate to evolve and grow through diverse roles and various assignments across different functions and teams. These opportunities, hand in hand with the invaluable support and encouragement from my colleagues, have been the driving force that kept my passion alive over past two decades.",
    name: "Sudarshana Devasena",
    position: "Manager Global Consulting",
  },
  {
    quote:
      "Working at HireGenius has given me the opportunity to push boundaries and challenge myself every day. The culture of innovation and collaboration makes this a truly inspiring place to grow my career.",
    name: "Rahul Sharma",
    position: "Senior Software Engineer",
  },
  {
    quote:
      "The support and encouragement I have received from my colleagues and leadership have been phenomenal. HireGenius truly values its employees and fosters an environment of continuous learning.",
    name: "Emily Carter",
    position: "HR Business Partner",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#DBD8E3] py-12 text-center">
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="text-lg italic text-[#352F44] mb-4">
              “{testimonials[index].quote}”
            </blockquote>
            <p className="text-[#2A2438] font-bold">{testimonials[index].name}</p>
            <p className="text-[#5C5470]">{testimonials[index].position}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonial;
