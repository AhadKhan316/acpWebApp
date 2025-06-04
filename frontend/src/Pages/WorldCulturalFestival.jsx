// src/pages/WorldCultureFestival.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";

import WcfNavbar from "../components/wcfSubComponents/WcfNavbar";
import WcfHeroSection from "../components/wcfSubComponents/WcfHero";
import WcfVideoSection from "../components/wcfSubComponents/WcfVideoSection";
import WcfAboutSection from "../components/wcfSubComponents/WcfAboutSection";
// import WcfAboutAcp from "../components/wcfSubComponents/WcfAboutAcp";
import WcfPerformingNations from "../components/wcfSubComponents/WcfPerformingNations";
import FullScreenVideo from "../components/wcfSubComponents/WcfFullScreenVideo";
// import WcfUpcomingShows from "../components/wcfSubComponents/WcfUpcomingShows";
// import WcfExhibitions from "../components/wcfSubComponents/WcfExhibitions";
import WcfShowcase from "../components/wcfSubComponents/WcfShowcase";
import WcfNewsLetterSignup from "../components/wcfSubComponents/WcfNewsLetter";
import WcfSponsors from "../components/wcfSubComponents/WcfSponsers";
import WcfFooter from "../components/wcfSubComponents/WcfFooter";

// WCF Pages
import WcfAboutPage from "../Pages/WcfSubPages/WcfAboutPage";
import WcfPerformances from "../Pages/WcfSubPages/WcfPerformancesPage";
import WcfWorkshops from "../Pages/WcfSubPages/WcfWorkshopsPage";
import WcfCommunityBuilding from "../Pages/WcfSubPages/WcfCommunityBuildingPage";
import WcfGallery from "../Pages/WcfSubPages/2024/wcfGallery";
import WcfArtistsPage from "./WcfSubPages/2024/wcfArtistPage"
import WcfAlumniSessions from "./WcfSubPages/2024/wcfAlumniSessions";
import WcfArtistsEngagement from "./WcfSubPages/WcfArtistsEngagementPage";
import WcfMediaCoverage from "./WcfSubPages/WcfMediaCourage";
import WcfContactUs from "./WcfSubPages/WcfContactUs";


// import WcfArtistPage from "../Pages/WcfSubPages/2024/wcfArtistPage"



const WorldCultureFestival = () => {
  return (
    <>
      <WcfNavbar />
      <Routes>
        <Route path="/" element={
          <>
            <WcfHeroSection />
            <WcfVideoSection />
            <WcfAboutSection />
            {/* <WcfAboutAcp /> */}
            <WcfPerformingNations />
            <FullScreenVideo />
            <WcfShowcase />
            {/* <WcfUpcomingShows /> */}
            {/* <WcfExhibitions /> */}
            <WcfNewsLetterSignup />
            <WcfSponsors />
          </>
        } />
        <Route path="about" element={<WcfAboutPage />} />
        <Route path="performances" element={<WcfPerformances />} />
        <Route path="workshops" element={<WcfWorkshops />} />
        <Route path="communityBuilding" element={<WcfCommunityBuilding />} />
        <Route path="gallery" element={<WcfGallery />} />
        <Route path="artists">
          <Route index element={<WcfArtistsPage />} />
          <Route path=":artistId" element={<WcfArtistsPage />} />
        </Route>
        <Route path="wcfAlumniSessions" element={<WcfAlumniSessions />} />
        <Route path="artistEngagement" element={<WcfArtistsEngagement />} />
        <Route path="mediaCoverage" element={<WcfMediaCoverage />} />
        <Route path="contactUs" element={<WcfContactUs />} />

        {/* In your WorldCultureFestival.jsx */}
        {/* <Route path="artists">
          <Route index element={<WcfArtistPage />} />
        </Route> */}
      </Routes >
      <WcfFooter />
    </>
  );
};

export default WorldCultureFestival;
