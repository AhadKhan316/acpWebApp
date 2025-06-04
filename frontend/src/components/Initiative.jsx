import React from "react";
import { motion } from "framer-motion";
import WCFLogo from "/src/assets/wcf-assets/Logo-wcf-black.png";
import PLFLogo from "/src/assets/plf-assets/plf-logo.png";
import AUCLogo from "/src/assets/auc-assets/logo copy.png";

// Women Empowerment
import WomenEmpowerment from "/src/assets/acp-logo-and-hero-img/women-empowerment.png";
import YouthEngagement from "/src/assets/acp-logo-and-hero-img/youth-engagement.png";
import ClimateChange from "/src/assets/acp-logo-and-hero-img/climate-change.png";

const Initiative = () => {
  const showcases = [
    {
      id: 1,
      title: "World Culture Festival Karachi",
      desc: "The World Culture Festival is a vibrant celebration of global creativity, uniting art creators to share their cultures and co-create art. Featuring music, theatre, dance, and visual arts, it offers a dynamic platform for artistic exchange and cultural dialogue from around the world.",
      logo: WCFLogo,
      link: "/festival/wcf",
    },
    {
      id: 2,
      title: "Pakistan Literature Festival",
      desc: "The Pakistan Literature Festival is a groundbreaking national event celebrating the richness of our culture, languages, literature, and art. It brings together diverse voices and creative expressions, fostering dialogue, pride, and unity through an inclusive, large-scale platform unlike any other in the country.",
      logo: PLFLogo,
      link: "/festival/plf",
    },
    {
      id: 3,
      title: "Aalmi Urdu Conference",
      desc: "The Aalmi Urdu Conference is the flagship literary event of the Arts Council of Pakistan, Karachi. It celebrates the richness of Pakistan’s languages and literary traditions, uniting writers, poets, and scholars in a powerful annual tribute to our cultural and intellectual heritage.",
      logo: AUCLogo,
      link: "/festival/auc",
    },
    // New cards
    {
      id: 4,
      title: "Women Empowerment",
      desc: "Since its inception, the Arts Council of Pakistan, Karachi has championed women’s rights, emerging as a national leader in women’s arts education, leadership, and cultural discourse. It stands at the forefront of advocating for gender equity, artistic empowerment, and the fight for social justice.",
      logo: WomenEmpowerment,
      link: "#",
    },
    {
      id: 5,
      title: "Youth Engagement",
      desc: "Guided by the motto Youth Is the Only Way Forward, the Arts Council of Pakistan, Karachi empowers young voices through world-class outreach across Karachi and arts education not just in the city but across rural Sindh. We take bold, practical steps to embed youth in the heart of cultural and artistic discourse.",
      logo: YouthEngagement,
      link: "#",
    },
    {
      id: 6,
      title: "Climate Advocacy",
      desc: "With a vision to leave behind a better planet, the Arts Council of Pakistan, Karachi is taking practical, sustained steps for meaningful climate action. Through awareness, advocacy, and eco-conscious programming, we aim to inspire lasting environmental change in the cultural and public sphere.",
      logo: ClimateChange,
      link: "#",
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
    hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" },
  };

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-white to-gray-50 text-center">
      <div className="container mx-auto px-6 sm:px-6 lg:px-8 max-w-7xl">
        <motion.h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-10 text-gray-900 bg-clip-text bg-gradient-to-r from-red-500 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Initiatives/Brands
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {showcases.map((showcase, index) => (
            <motion.a
              key={showcase.id}
              href={showcase.link}
              className="flex flex-col p-6 bg-white/80 backdrop-blur-md border border-gray-100/50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 min-h-[400px] no-underline text-inherit cursor-pointer"
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  window.location.href = showcase.link;
                }
              }}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={index}
            >
              <div className="flex justify-center mb-6 h-25">
                <img
                  src={showcase.logo}
                  alt={showcase.title}
                  className="h-full w-full object-contain max-h-28 max-w-[180px]"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 line-clamp-2">{showcase.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base flex-grow line-clamp-4">{showcase.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Initiative;