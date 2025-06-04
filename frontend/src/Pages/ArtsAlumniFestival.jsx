// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import AafNavbar from "../components/aafSubComponents/aafNavbar";
import AafHero from "../components/aafSubComponents/aafHero";
import AafAbout from "../components/aafSubComponents/aafAbout";
import Videosecttion from "/src/components/aafSubComponents/videosecttion";
import AafCelebration from "../components/aafSubComponents/aafCelebration";

import AlumniPage from "../components/aafSubComponents/AlumniPage";
// import MainAlumniCompo from "../Pages/AlumniFestival";

import AafFooter from "../components/aafSubComponents/aafFooter";

// Pages 
import AafAboutPage from "./AafSubPages/aafAboutPage";
import AafContactUsPage from "./AafSubPages/aafContactUsPage";

// Arts Alumni Pages 2025
import AafGalleryPage from "./AlumniSubPages/2025/GalleryPage";
import AlumniSessions from "./AlumniSubPages/2025/AlumniSessions";

// Arts Alumni Pages 2024
import FirstAlumniSession from "./AlumniSubPages/2024/firstAlumniSession";

// import AlumniFestivalPage from './AlumniFestival'




function ArtsAlumiFestival() {

  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/festival/aaf");
  // }, []);


  return (
    <>
      <AafNavbar />
      <Routes>
        <Route path="/" element={
          <>
            <AafHero />
            <AafAbout />
            <Videosecttion />
            <AafCelebration />
            {/* <MainAlumniCompo /> */}
            {/* <AucDelegates /> */}
            {/* <AucHighlightedSessions /> */}
            {/* <AucNewsletter /> */}
            {/* <AucSponsors /> */}
          </>
        } />

        <Route path="AlumniPage" element={<AlumniPage />} />
        {/* <Route path="/alumni" element={<AlumniFestivalPage />} /> */}
        <Route path="about" element={<AafAboutPage />} />
        <Route path="gallery" element={<AafGalleryPage />} />
        <Route path="alumniSessions" element={<AlumniSessions />} />
        <Route path="firstAlumniSession" element={<FirstAlumniSession />} />
        <Route path="contactUs" element={<AafContactUsPage />} />

      </Routes>
      <AafFooter />
    </>
  );
}

export default ArtsAlumiFestival;