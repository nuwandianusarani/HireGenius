// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import axios for making the API request
// import { useNavigate } from 'react-router-dom';

// const LatestNews = () => {
//   const [newsItems, setNewsItems] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const visibleNews = 1; // Show 1 news item at a time on mobile
//   const navigate = useNavigate();
//   const API_URL = process.env.REACT_APP_API_URL;

//   // useEffect(() => {
//   //   // Function to fetch news items from the API
//   //   const fetchNews = async () => {
//   //     try {
//   //       const response = await axios.get(`${API_URL}news`);
//   //       const data = response.data;
//   //       // Take the top 5 news items from the response
//   //       const topFiveNews = data.slice(0, 5).map((newsItem) => ({
//   //         title: newsItem.heading, // Use heading as the title
//   //         image: newsItem.imageUrl, // Use imageUrl as the image
//   //       }));
//   //       setNewsItems(topFiveNews); // Update state with the top 5 news
//   //     } catch (error) {
//   //       console.error("Error fetching news:", error);
//   //     }
//   //   };

//   //   fetchNews(); // Call the function to fetch news on component mount
//   // }, []);


//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await axios.get(`${API_URL}news`);
//         const data = response.data;

//         const topFiveNews = data.slice(0, 5).map((newsItem) => ({
//           title: newsItem.heading,
//           image: newsItem.imageUrl,
//         }));
//         setNewsItems(topFiveNews);

        
//         // Filter news items that are today or earlier, then sort and slice to get the latest 5
//         const today = new Date();
//         const filteredNews = data
//         .filter(newsItem => new Date(newsItem.dateTime) <= today)
//         .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
//         .slice(0, 5)
//         .map(newsItem => ({
//             title: newsItem.heading,
//             image: Array.isArray(newsItem.images) && newsItem.images.length > 0
//               ? (typeof newsItem.images[0] === 'string' 
//                  ? newsItem.images[0] // If it's a string, use it directly
//                  : newsItem.images[0].imageUrl) // If it's an object, access imageUrl
//               : '', // Fallback
//         }));
      
//         setNewsItems(filteredNews);

//       } catch (error) {
//         console.error("Error fetching news:", error);
//       }
//     };

//     fetchNews();
//   }, []);
//   const nextSlide = () => {
//     if (currentSlide < newsItems.length - 1) {
//       setCurrentSlide(currentSlide + 1);
//     } else {
//       setCurrentSlide(0); // Loop back to the first slide
//     }
//   };

//   const prevSlide = () => {
//     if (currentSlide > 0) {
//       setCurrentSlide(currentSlide - 1);
//     } else {
//       setCurrentSlide(newsItems.length - 1); // Loop to the last slide
//     }
//   };

//   const handleButtonClick = () => {
//     navigate('/initial-news'); // Replace with your target page
//   };

//   return (
//     <section className="bg-white py-12">
//       <div className="flex flex-col md:flex-row gap-0">
//         {/* Left Heading Section */}
//         <div className="w-full md:w-[50%] mt-8 md:mt-24 md:ml-20 px-4 md:px-0">
//           <div className="flex items-end space-x-0">
//             <h1 className="text-2xl md:text-[3rem] font-extrabold text-[#00175F] tracking-wide">
//               Core Values
//             </h1>
//           </div>
//           <p className="text-gray-500 mt-4 max-w-md">
//             Stay tuned for the latest news from our school cricket teams! From
//             thrilling match victories to upcoming tournaments and player
//             achievements, this is your go-to spot for all the action.
//           </p>
//           <button 
//             onClick={handleButtonClick}
//             className="mt-6 px-6 md:px-8 py-3 md:py-4 bg-[#00175F] text-white font-semibold rounded-full shadow-lg hover:bg-[#00175F] transition">
//             MORE HERE &rarr;
//           </button>
//         </div>

//         {/* Right News Section */}
//         <div className="w-full md:w-[100%] mt-8 md:ml-20">
//           {/* Mobile News Carousel */}
//           <div className="block md:hidden">
//             <div className="overflow-hidden w-full">
//               <div
//                 className="flex transition-transform duration-300"
//                 style={{ transform: `translateX(-${currentSlide * 100}%)` }} // Move by full width
//               >
//                 {newsItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="w-full flex-shrink-0 p-4 rounded-lg overflow-hidden shadow-lg"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-[250px] object-cover rounded-lg"
//                     />
//                     <div className="p-4">
//                       <p className="font-semibold text-gray-700 text-sm">{item.title}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Arrow buttons for mobile carousel */}
//             <div className="flex justify-center mt-4 space-x-4">
//               <button
//                 onClick={prevSlide}
//                 className={`text-2xl font-bold focus:outline-none p-2 rounded-full border-2 border-[#4A0D34] ${
//                   currentSlide === 0 ? "text-[#CBECFF]" : "text-[#4A0D34] hover:text-[#00175F]"
//                 }`}
//                 disabled={newsItems.length <= 1} // Disable if only one news item
//               >
//                 &#8592;
//               </button>

//               <button
//                 onClick={nextSlide}
//                 className={`text-2xl font-bold focus:outline-none p-2 rounded-full border-2 border-[#4A0D34] ${
//                   currentSlide >= newsItems.length - 1 ? "text-[#CBECFF]" : "text-[#4A0D34] hover:text-[#00175F]"
//                 }`}
//                 disabled={newsItems.length <= 1} // Disable if only one news item
//               >
//                 &#8594;
//               </button>
//             </div>
//           </div>

//           {/* Desktop News Carousel */}
//           <div className="hidden md:block">
//             <div className="overflow-hidden w-full">
//               <div
//                 className="flex transition-transform duration-300"
//                 style={{ transform: `translateX(-${currentSlide * 33.33}%)` }} // Show 3 items at a time
//               >
//                 {newsItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="w-[100%] md:w-[40%] p-4 flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-[250px] md:h-[500px] object-cover rounded-lg"
//                     />
//                     <div className="p-4">
//                       <p className="font-semibold text-gray-700 text-sm md:text-base">{item.title}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Arrow buttons for desktop carousel */}
//             <div className="flex justify-center mt-4 space-x-4 md:space-x-8">
//               <button
//                 onClick={prevSlide}
//                 className={`text-2xl md:text-4xl font-bold focus:outline-none p-2 md:p-4 rounded-full border-2 border-[#4A0D34] ${
//                   currentSlide === 0 ? "text-[#CBECFF]" : "text-[#4A0D34] hover:text-[#00175F]"
//                 }`}
//                 disabled={newsItems.length <= 1} // Disable if only one news item
//               >
//                 &#8592;
//               </button>

//               <button
//                 onClick={nextSlide}
//                 className={`text-2xl md:text-4xl font-bold focus:outline-none p-2 md:p-4 rounded-full border-2 border-[#4A0D34] ${
//                   currentSlide >= newsItems.length - 1 ? "text-[#CBECFF]" : "text-[#4A0D34] hover:text-[#00175F]"
//                 }`}
//                 disabled={newsItems.length <= 1} // Disable if only one news item
//               >
//                 &#8594;
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LatestNews;

// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import image1 from '../assets/images/rec1.jpg';
// import image2 from '../assets/images/rec2.jpg';
// import image3 from '../assets/images/rec3.jpeg';
// import image4 from '../assets/images/rec4.jpg';
// import image5 from '../assets/images/rec5.jpeg';

// const LatestNews = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const navigate = useNavigate();

//   const newsItems = [
//     {
//       title: "Exciting Match Victory",
//       image:image1,
//     },
//     {
//       title: "Upcoming Tournament",
//       image: image2,
//     },
//     {
//       title: "Player Achievements",
//       image: image3,
//     },
//     {
//       title: "New Training Sessions",
//       image: image4,
//     },
//     {
//       title: "Community Outreach",
//       image: image5,
//     },
//   ];

//   const nextSlide = () => {
//     if (currentSlide < newsItems.length - 1) {
//       setCurrentSlide(currentSlide + 1);
//     } else {
//       setCurrentSlide(0); // Loop back to the first slide
//     }
//   };

//   const prevSlide = () => {
//     if (currentSlide > 0) {
//       setCurrentSlide(currentSlide - 1);
//     } else {
//       setCurrentSlide(newsItems.length - 1); // Loop to the last slide
//     }
//   };

//   const handleButtonClick = () => {
//     navigate('/initial-news'); // Replace with your target page
//   };

//   return (
//     <section className="bg-white py-12">
//       <div className="flex flex-col md:flex-row gap-0">
//         {/* Left Heading Section */}
//         <div className="w-full md:w-[50%] mt-8 md:mt-24 md:ml-20 px-4 md:px-0">
//           <div className="flex items-end space-x-0">
//             <h1 className="text-2xl md:text-[3rem] font-extrabold text-[#00175F] tracking-wide">
//               Core Values
//             </h1>
//           </div>
//           <p className="text-gray-500 mt-4 max-w-md">
//             Stay tuned for the latest news from our school cricket teams! From
//             thrilling match victories to upcoming tournaments and player
//             achievements, this is your go-to spot for all the action.
//           </p>
//           <button 
//             onClick={handleButtonClick}
//             className="mt-6 px-6 md:px-8 py-3 md:py-4 bg-[#00175F] text-white font-semibold rounded-full shadow-lg hover:bg-[#00175F] transition">
//             MORE HERE &rarr;
//           </button>
//         </div>

//         {/* Right News Section */}
//         <div className="w-full md:w-[100%] mt-8 md:ml-20">
//           {/* Mobile News Carousel */}
//           <div className="block md:hidden">
//             <div className="overflow-hidden w-full">
//               <div
//                 className="flex transition-transform duration-300"
//                 style={{ transform: `translateX(-${currentSlide * 100}%)` }} // Move by full width
//               >
//                 {newsItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="w-full flex-shrink-0 p-4 rounded-lg overflow-hidden shadow-lg"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-[250px] object-cover rounded-lg"
//                     />
//                     <div className="p-4">
//                       <p className="font-semibold text-gray-700 text-sm">{item.title}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Arrow buttons for mobile carousel */}
//             <div className="flex justify-center mt-4 space-x-4">
//               <button
//                 onClick={prevSlide}
//                 className={`text-2xl font-bold focus:outline-none p-2 rounded-full border-2 border-[#4A0D34] ${
//                   currentSlide === 0 ? "text-[#CBECFF]" : "text-[#4A0D34] hover:text-[#00175F]"
//                 }`}
//                 disabled={newsItems.length <= 1} // Disable if only one news item
//               >
//                 &#8592;
//               </button>

//               <button
//                 onClick={nextSlide}
//                 className={`text-2xl font-bold focus:outline-none p-2 rounded-full border-2 border-[#4A0D34] ${
//                   currentSlide >= newsItems.length - 1 ? "text-[#CBECFF]" : "text-[#4A0D34] hover:text-[#00175F]"
//                 }`}
//                 disabled={newsItems.length <= 1} // Disable if only one news item
//               >
//                 &#8594;
//               </button>
//             </div>
//           </div>

//           {/* Desktop News Carousel */}
//           <div className="hidden md:block">
//             <div className="overflow-hidden w-full">
//               <div
//                 className="flex transition-transform duration-300"
//                 style={{ transform: `translateX(-${currentSlide * 33.33}%)` }} // Show 3 items at a time
//               >
//                 {newsItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="w-[100%] md:w-[40%] p-4 flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-[250px] md:h-[500px] object-cover rounded-lg"
//                     />
//                     <div className="p-4">
//                       <p className="font-semibold text-gray-700 text-sm md:text-base">{item.title}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Arrow buttons for desktop carousel */}
//             <div className="flex justify-center mt-4 space-x-4 md:space-x-8">
//               <button
//                 onClick={prevSlide}
//                 className={`text-2xl md:text-4xl font-bold focus:outline-none p-2 md:p-4 rounded-full border-2 border-[#4A0D34] ${
//                   currentSlide === 0 ? "text-[#CBECFF]" : "text-[#4A0D34] hover:text-[#00175F]"
//                 }`}
//                 disabled={newsItems.length <= 1} // Disable if only one news item
//               >
//                 &#8592;
//               </button>

//               <button
//                 onClick={nextSlide}
//                 className={`text-2xl md:text-4xl font-bold focus:outline-none p-2 md:p-4 rounded-full border-2 border-[#4A0D34] ${
//                   currentSlide >= newsItems.length - 1 ? "text-[#CBECFF]" : "text-[#4A0D34] hover:text-[#00175F]"
//                 }`}
//                 disabled={newsItems.length <= 1} // Disable if only one news item
//               >
//                 &#8594;
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LatestNews;

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaStar, FaHeart, FaSmile } from 'react-icons/fa'; // Import some icons from react-icons
import image1 from '../assets/images/rec1.jpg';
import image2 from '../assets/images/rec2.jpg';
import image3 from '../assets/images/rec3.jpeg';
import image4 from '../assets/images/rec4.jpg';
import image5 from '../assets/images/rec5.jpeg';

const LatestNews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const newsItems = [
    {
      title: "Exciting Match Victory",
      image: image1,
    },
    {
      title: "Upcoming Tournament",
      image: image2,
    },
    {
      title: "Player Achievements",
      image: image3,
    },
    {
      title: "New Training Sessions",
      image: image4,
    },
    {
      title: "Community Outreach",
      image: image5,
    },
  ];

  const nextSlide = () => {
    if (currentSlide < newsItems.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0); // Loop back to the first slide
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(newsItems.length - 1); // Loop to the last slide
    }
  };

  const handleButtonClick = () => {
    navigate('/initial-news'); // Replace with your target page
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-purple-700 to-pink-500 opacity-7 py-12 overflow-hidden">
      {/* Background Animation */}
     
      <div className="flex flex-col md:flex-row gap-0">
        {/* Left Heading Section */}
        <div className="w-full md:w-[50%] mt-8 md:mt-24 md:ml-20 px-4 md:px-0">
          <div className="flex items-end space-x-0">
            <h1 className="text-2xl md:text-[3rem] font-extrabold text-white tracking-wide">
              Core Values
            </h1>
          </div>
          <p className="text-gray-300 mt-4 max-w-md">
            Stay tuned for the latest news from our school cricket teams! From
            thrilling match victories to upcoming tournaments and player
            achievements, this is your go-to spot for all the action.
          </p>
          <button 
            onClick={handleButtonClick}
            className="mt-6 px-6 md:px-8 py-3 md:py-4 bg-[#00175F] text-white font-semibold rounded-full shadow-lg hover:bg-[#00175F] transition">
            MORE HERE &rarr;
          </button>
        </div>

        {/* Right News Section */}
        <div className="w-full md:w-[100%] mt-8 md:ml-20">
          {/* Mobile News Carousel */}
          <div className="block md:hidden">
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }} // Move by full width
              >
                {newsItems.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 p-4 rounded-lg overflow-hidden shadow-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[250px] object-cover rounded-lg"
                    />
                    <div className="p-4">
                      <p className="font-semibold text-white text-sm">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow buttons for mobile carousel */}
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={prevSlide}
                className={`text-2xl font-bold focus:outline-none p-2 rounded-full border-2 border-[#4A0D34] ${
                  currentSlide === 0 ? "text-[#CBECFF]" : "text-[#4A0D34] hover:text-[#00175F]"
                }`}
                disabled={newsItems.length <= 1} // Disable if only one news item
              >
                &#8592;
              </button>

              <button
                onClick={nextSlide}
                className={`text-2xl font-bold focus:outline-none p-2 rounded-full border-2 border-[#4A0D34] ${
                  currentSlide >= newsItems.length - 1 ? "text-[#CBECFF]" : "text-[#4A0D34] hover:text-[#00175F]"
                }`}
                disabled={newsItems.length <= 1} // Disable if only one news item
              >
                &#8594;
              </button>
            </div>
          </div>

          {/* Desktop News Carousel */}
          <div className="hidden md:block">
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentSlide * 33.33}%)` }} // Show 3 items at a time
              >
                {newsItems.map((item, index) => (
                  <div
                    key={index}
                    className="w-[100%] md:w-[40%] p-4 flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[250px] md:h-[500px] object-cover rounded-lg"
                    />
                    <div className="p-4">
                      <p className="font-semibold text-gray-700 text-sm md:text-base">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow buttons for desktop carousel */}
            <div className="flex justify-center mt-4 space-x-4 md:space-x-8">
            <button
    onClick={nextSlide}
    className={`w-12 h-12 md:w-16 md:h-16 text-2xl md:text-4xl font-bold focus:outline-none flex items-center justify-center rounded-full border-2 border-[#4A0D34] ${
      currentSlide >= newsItems.length - 1 ? "text-[#CBECFF]" : "text-[#4A0D34] hover:text-[#00175F]"
    }`}
                disabled={newsItems.length <= 1} // Disable if only one news item
              >
                &#8592;
              </button>

              <button
    onClick={prevSlide}
    className={`w-12 h-12 md:w-16 md:h-16 text-2xl md:text-4xl font-bold focus:outline-none flex items-center justify-center rounded-full border-2 border-[#4A0D34] ${
      currentSlide === 0 ? "text-[#CBECFF]" : "text-[#4A0D34] hover:text-[#00175F]"
    }`}
                disabled={newsItems.length <= 1} // Disable if only one news item
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Falling Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, index) => (
          <FaStar
            key={index}
            className="absolute text-yellow-500"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `fall ${Math.random() * 5 + 5}s linear infinite`,
              fontSize: `${Math.random() * 24 + 16}px`,
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, index) => (
          <FaHeart
            key={index}
            className="absolute text-red-500"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `fall ${Math.random() * 5 + 5}s linear infinite`,
              fontSize: `${Math.random() * 24 + 16}px`,
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, index) => (
          <FaSmile
            key={index}
            className="absolute text-yellow-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `fall ${Math.random() * 5 + 5}s linear infinite`,
              fontSize: `${Math.random() * 24 + 16}px`,
            }}
          />
        ))}
      </div>

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

export default LatestNews;