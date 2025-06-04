import React from "react";
import { motion } from "framer-motion";

import WhatWeDoImage from "/src/assets/acp-logo-and-hero-img/what we do.jpg";

const WhatWeDo = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative w-full h-[65vh] md:h-[60vh] lg:h-[70vh] overflow-hidden"
      style={{
        backgroundImage: `url(${WhatWeDoImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      {/* Centered Content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 "
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-xl mb-6 px-4"
          variants={textVariants}
        >
          How We Do It
        </motion.h2>
        <motion.p
          className="text-lg px-8 sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed drop-shadow-md max-w-4xl"
          // text-lg leading-relaxed text-gray-700 text-center px-2
          variants={textVariants}
        >
          We empower creativity by turning vision into action at the Arts Council of Pakistan. Through inclusive programs, bold projects, and strong community ties, we bring ideas to life and spark meaningful change. From nurturing talent to hosting one of the world’s largest cultural festivals, ACP’s impact reaches millions—shaping narratives and positioning Pakistan as a global hub of artistic excellence.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default WhatWeDo;
