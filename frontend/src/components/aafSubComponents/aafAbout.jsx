import { useState } from "react";
import { motion } from "framer-motion";

const AafAbout = () => {
  const [activeTab, setActiveTab] = useState("aaf"); 

  const tabs = [
    {
      id: "aaf",
      title: "About AAF",
      content: (
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-4">
            Arts Alumni Festival
          </h3>
          <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
            The Arts Council of Pakistan, Karachi, proudly presents the Alumni Festival, a spectacular celebration hosted by the School of Visual & Performing Arts. Held every year, this festival transforms the Arts Council Karachi into a vibrant hub of creativity, bringing together past students and art enthusiasts for an unforgettable experience.

            Since its inception in 2024, the Alumni Festival has become a cherished tradition, celebrating the artistic legacy of our alumni while fostering new connections and inspiration. Each edition offers a dynamic showcase of talent, featuring performances, exhibitions, and collaborative projects that highlight the enduring impact of our artistic community.
          </p>
        </div>
      ),
    },
    {
      id: "acp",
      title: "About ACP",
      content: (
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-orange-700 mb-4">
            Arts Council of Pakistan
          </h3>
          <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
            The Arts Council of Pakistan, Karachi, is a leading cultural institution dedicated to promoting art, literature, and cultural heritage across Pakistan. Established in 1954, it has been a beacon for artists and intellectuals, hosting events like the Pakistan Theatre Festival to foster creativity and cultural exchange.
          </p>
        </div>
      ),
    },
  ];

  // Framer Motion Variants
  const panelVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  const buttonVariants = {
    inactive: { scale: 1, backgroundColor: "#CC4927" },
    active: {
      scale: 1.05,
      backgroundColor: "#000",
      transition: { duration: 0.3 },
    },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };

  return (
    <section className="w-full py-6 sm:py-8 bg-white overflow-hidden relative" id="aboutAaf">
      {/* Tabs and Content */}
      <div className="mx-4 px-4 sm:px-6 lg:px-8">
        {/* Tab Buttons */}
        <div className="flex justify-center space-x-4 sm:space-x-6 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-white shadow-md"
              variants={buttonVariants}
              initial="inactive"
              animate={activeTab === tab.id ? "active" : "inactive"}
              whileHover="hover"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </motion.button>
          ))}
        </div>

        {/* Scroll Panel */}
        <motion.div
          key={activeTab} // Ensures animation retriggers on tab change
          className="relative bg-white/90 rounded-lg shadow-xl border-t-4 border-orange-700 max-w-full sm:max-w-3xl mx-auto"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </motion.div>
      </div>
    </section>
  );
};

export default AafAbout;