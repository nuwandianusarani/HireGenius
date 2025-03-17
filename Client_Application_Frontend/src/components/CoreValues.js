

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaStar, FaHeart, FaSmile } from 'react-icons/fa'; // Import some icons from react-icons
import image1 from '../assets/images/cv3.jpg';
import image2 from '../assets/images/cv2.jpg';
import image3 from '../assets/images/cv1.jpg';
import image4 from '../assets/images/val5.jpg';
import image5 from '../assets/images/cv4.jpeg';

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
    <section className="relative bg-gradient-to-r from-[#352F44] via-[#5C5470] to-[#DBD8E3] opacity-7 py-12 overflow-hidden">
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
            className="mt-6 px-6 md:px-8 py-3 md:py-4 bg-[#5C5470] text-white font-semibold rounded-full shadow-lg hover:bg-[#352F44] transition">
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

      
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </section>
  );
};

export default LatestNews;