import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import poster2025 from '/src/assets/ArtsAlumniAssets/alumni-2025.B9q1FqGS.jpeg';

import AafGalleryPage2024 from "../2024/GalleryPage2024";


const festivals = [
  {
    year: "2025",
    title: "Arts Alumni Festival",
    image: poster2025,
    description: "The Arts Council of Pakistan, Karachi, proudly presents the Alumni Festival 2025, a spectacular three-day celebration hosted by the School of Visual & Performing Arts. From 23rd to 25th May 2025, the festival will transform the Arts Council Karachi into a vibrant hub of creativity, bringing together past students and art enthusiasts for an unforgettable experience.",
    highlights: [
      "Grand opening ceremony with 500 performers",
      "Cultural pavilions from 30+ nations",
      "International food festival",
      "Nightly fireworks displays"
    ],
    stats: [
      { value: "30+", label: "Segments" },
      { value: "100+", label: "Alumni Celebrated" },
      { value: "5000+", label: "Attendees" }
    ]
  },
  // Add more festivals when available
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// const itemVariants = {
//   hidden: { y: 40, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.8,
//       ease: [0.2, 0.8, 0.3, 1]
//     }
//   }
// };

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const posterHoverVariants = {
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)",
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const imageHoverVariants = {
  hover: {
    scale: 1.01,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

function GalleryPage() {
  const [selectedFestival, setSelectedFestival] = useState(festivals[0]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-8 text-center"
        >
        </motion.div>

        {/* Festival Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-20"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <motion.div
              className="lg:w-1/2 p-6 lg:p-8"
              whileHover="hover"
              initial="rest"
            >
              <motion.div
                variants={posterHoverVariants}
                className="overflow-hidden rounded-xl shadow-md"
              >
                <motion.img
                  src={selectedFestival.image}
                  alt={selectedFestival.title}
                  className="w-full h-auto object-cover"
                  variants={imageHoverVariants}
                />
              </motion.div>

              {/* Stats Grid */}
              <div className="mt-6 grid grid-cols-3 gap-2">
                {selectedFestival.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="bg-gradient-to-br from-[#B90602]/10 to-[#E37A1E]/10 p-4 rounded-lg text-center"
                  >
                    <p className="text-2xl font-bold text-[#B90602]">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-6 lg:p-8 bg-gradient-to-br from-[#B90602]/5 to-[#E37A1E]/5">
              <div className="h-full flex flex-col">
                <div>
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-[#B90602] bg-[#B90602]/10 rounded-full mb-4">
                    {selectedFestival.year}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {selectedFestival.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {selectedFestival.description}
                  </p>


                </div>

                <Link to="/festival/aaf/alumniSessions">
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    variants={titleVariants}
                    transition={{ delay: 0.4 }}
                  >
                    <button className="flex-1 bg-[#B90602] hover:bg-[#9A0502] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-[1.02] cursor-pointer">
                      View Full Program
                    </button>
                  </motion.div>
                </Link>

              </div>
            </div>
          </div>
        </motion.div>


      </div>
      <AafGalleryPage2024 />
    </div>
  );
}

export default GalleryPage;