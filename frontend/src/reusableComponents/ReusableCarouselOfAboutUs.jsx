import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Custom arrow components
const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/90 p-2 rounded-full hover:bg-black/70 transition-colors"
    onClick={onClick}
  >
    <IoIosArrowForward className="text-white text-2xl" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/90 p-2 rounded-full hover:bg-black/70 transition-colors"
    onClick={onClick}
  >
    <IoIosArrowBack className="text-white text-2xl" />
  </button>
);

const SectionWithSlider = ({
  title,
  description,
  images,
  slidesPerView = 1,
  spaceBetween = 30,
  navigation = true,
  autoplay = true,
  autoplayDelay = 2500,
  className = "",
  imageClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  showAlumniButton = false, // New prop to control button visibility
}) => {
  // Slider settings
  const sliderSettings = {
    slidesToShow: slidesPerView,
    slidesToScroll: 1,
    arrows: navigation,
    autoplay: autoplay,
    autoplaySpeed: autoplayDelay,
    infinite: true,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col lg:flex-row items-center gap-8 p-4 sm:p-6 lg:p-8 ${className}`}
    >
      {/* Slider Section */}
      <div className="w-full lg:w-1/2 relative">
        <Slider
          {...sliderSettings}
          className="rounded-xl overflow-hidden backdrop-blur-md"
        >
          {images.map((image, index) => (
            <div key={index} className="">
              <div className="transform transition-all duration-300 hover:scale-105">
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-auto object-cover rounded-xl ${imageClassName}`}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Centered Title and Description */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0 flex flex-col justify-center items-center text-center">
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 bg-clip-text ${titleClassName}`}
        >
          {title}
        </h2>
        <p
          className={`text-black text-base sm:text-lg md:text-xl lg:max-w-3xl leading-relaxed ${descriptionClassName}`}
        >
          {description}
        </p>
        {showAlumniButton && (
          <Link to="/festival/aaf">
            <motion.div
              className="flex justify-center mt-8"
              variants={titleVariants}
              transition={{ delay: 0.4 }}
            >
              <button className="px-6 py-3 bg-red-600 hover:bg-red-600 text-white font-semibold rounded-full shadow-md transition-all duration-300 flex items-center gap-3 cursor-pointer">
                Arts Alumni Festival
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default SectionWithSlider;