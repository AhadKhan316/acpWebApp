import React from "react";
import { motion } from "framer-motion";

// Import the single sponsor image
import AllSponsors from "../assets/acp-logo-and-hero-img/home-partner-img.jpg";

const SponsorsSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="py-10 px-2 sm:px-6 lg:px-8 bg-white max-w-7xl mx-auto">
      <motion.div
        className="mx-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-2xl sm:text-4xl font-bold text-center mb-6 text-black"
          variants={itemVariants}
        >
          Our Partners
        </motion.h2>

        <motion.div
          className="flex justify-center"
          variants={itemVariants}
        // whileHover="hover"
        >
          <img
            src={AllSponsors}
            alt="Our Sponsors"
            className="w-full object-contain"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SponsorsSection;