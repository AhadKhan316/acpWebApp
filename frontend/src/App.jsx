//  
import { Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import './styles.css';


// Components
import AlumniRedirect from './components/AlumniRedirect';
import Layout from './components/Layout';
import Hero from './components/Hero';
// import UpcomingEvents from './components/UpcomingEvents';
import About from './components/About';
// import Mainpagevideo from './components/Mainpagevideo';
// import PresidentMessage from './components/PresidentMessage';
import StayUpdated from './components/StayUpdated';
// import Sovapa from './components/Academy';
import CommunityFeedback from './components/CommunityFeedback';
// import Production from './components/Production';
// import OurSocial from './components/OurSocial'
import WhatWeDo from './components/WhatWeDo';
import Initiative from './components/Initiative';
import Education from './components/Education';
import OurSponsors from './components/Sponsors';
import ContactUs from './Pages/ContactUs';
import QRCodeRedirect from './Pages/Qrcode';
import UserRegister from './userportal/Register';
import UserLogin from './userportal/Login';
import EventsPortal from './userportal/Events';
import UserProfile from './userportal/Profile';

// Pages
import SovapaPage from './Pages/SovapaPage';
import VenuesPage from './Pages/Venue';
import AboutUs from './Pages/AboutUs';
import GoverningBody from './Pages/GoverningBody';
import Initiatives from './Pages/AcpSubPages/Initiative';
import TeamMembers from './Pages/TeamMember';
import MembersVerification from './Pages/MembersVerification';
import Career from './Pages/Careers';
import Tenders from './Pages/Tenders';

// Media Kit
import MediaKit from './Pages/MediaKit';
import Registration from './Pages/RegistrationForm';
import Admission from './Pages/AdmissionsForm';

// OTP sending pages
import VerifyOtp from './Pages/VerifyOtp';
import ResendOtp from './Pages/ResendOtp';

// ACP Sub Pages
import UpcomingEventsPage from './Pages/AcpSubPages/UpcomingEventsPage';
import SovapaCoursePage from './Pages/AcpSubPages/SovapaCoursePage';
import VenueSubPage from './Pages/AcpSubPages/VenuesPage';

// import SettingPage from "./Pages/AcpSubPages/SettingPage";
// import PurchaseHistory from "./Pages/AcpSubPages/PurchaseHistory";


// WCF Page
import WorldCultureFestival from './Pages/WorldCulturalFestival';

// PLF Page
import PakistanLiteratureFestival from './Pages/PakistanLiteratureFestival';

// AUC Page
import AalmiUrduConference from './Pages/AalmiUrduConference';

// PYF Page
import PakistanYouthFestival from './Pages/PakistanYouthFestival';

// Women Conference Page
import WomenConference from './Pages/WomenConference'

// PTF Pages
import PakistanTheatreFestival from './Pages/PakistanTheatreFestival';

// AAF Pages
import ArtsAlumniFestival from './Pages/ArtsAlumniFestival';
// import AlumniFestivalPage from './Pages/AlumniFestival'

// import AlumniEventsData from "./Pages/AlumniSubPages/Alumni-2025/alumniEventsPage";


import NewsBlog from './Pages/NewsBlog';
import Whatweoffer from './components/Whatweoffer';
import Alloffers from './components/Alloffers';
import PresidentsMessage from './components/PresidentsMessage';

import Email from './Pages/Email';


import DelegatesPage from './Pages/DelegatesPage';


import RegistrationForm from './Pages/RegistrationForm';

// import WcfArtistPage from "./Pages/WcfSubPages/2024/wcfArtistPage"

import Dashboard from './pages/Dashboard';
import SettingPage from './pages/SettingPage';
import ProfilePage from "./Pages/profile";


const App = () => {
  return (
    <Routes>
      {/* Routes with Navbar and Footer */}
      <Route element={<Layout />}>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            {/* <Mainpagevideo /> */}
           
            <PresidentsMessage />
            {/* <UpcomingEvents /> */}
            <WhatWeDo />
            <Initiative />
            <Education />


            {/* <Production /> */}
            {/* <OurSocial /> */}
            <CommunityFeedback />
            <Whatweoffer />
            <Alloffers />
            <StayUpdated />
            <OurSponsors />
          </>
        } />



        
        {/* ACP Sub Pages */}
        <Route path="/initiatives" element={<Initiatives />} />
        <Route path="/upcomingEvents" element={<UpcomingEventsPage />}></Route>
        <Route path="/sovapa/:department" element={<SovapaCoursePage />}></Route>
        <Route path="/facilities/:venueId" element={<VenueSubPage />} />
        
        {/* <Route path="/SettingPage" element={<SettingPage />} /> */}
        {/* <Route path="/purchaseHistory" element={<PurchaseHistory />} /> */}

        {/* Arts Alumni Festival Route */}
        {/* <Route path="/alumni" element={<ArtsAlumniFestival />} /> */}

        {/* OTP Pages */}
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/resend-otp" element={<ResendOtp />} />

        {/* Contact Us */}

        <Route path="/sovapa" element={<SovapaPage />} />
        <Route path="/facilities" element={<VenuesPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/governingBody" element={<GoverningBody />} />
        <Route path="/teamMembers" element={<TeamMembers />} />
        <Route path="/membersVerification" element={<MembersVerification />} />
        <Route path="/career" element={<Career />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/mediaKit" element={<MediaKit />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/admissions" element={<Admission />} />
        <Route path="/NewsBlog" element={<NewsBlog />} />
        <Route path="/DelegatesPage" element={<DelegatesPage />} />
        <Route path="/qrcode" element={<QRCodeRedirect />} />
        <Route path="/userportal" element={<Navigate to="/userportal/login" replace />} />
        <Route path="/userportal/register" element={<UserRegister />} />
        <Route path="/userportal/login" element={<UserLogin />} />
        <Route path="/userportal/events" element={<EventsPortal />} />
        <Route path="/userportal/profile" element={<UserProfile />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />

        <Route path="/dashboard" element={<Dashboard />} />
<Route path="/profile" element={<ProfilePage />} />
<Route path="/settings" element={<SettingPage />} />
      </Route>


      

      {/* Routes without Navbar and Footer */}

      {/* WCF */}
      <Route path="/festival/wcf/*" element={<WorldCultureFestival />} />
      <Route path="/wcf" element={<Navigate to="/festival/wcf" />} />

      {/* In your WorldCultureFestival.jsx */}
      {/* <Route path="artists">
        <Route index element={<WcfArtistPage />} />
        <Route path=":artistId" element={<WcfArtistPage />} />
      </Route> */}

      {/* PLF */}
      <Route path="/festival/plf/*" element={<PakistanLiteratureFestival />} />
      <Route path="/plf" element={<Navigate to="/festival/plf" />} />

      {/* AUC */}
      <Route path="/festival/auc/*" element={<AalmiUrduConference />} />
      <Route path="/auc" element={<Navigate to="/festival/auc" />} />

      {/* PYF */}
      <Route path="/festival/pyf/*" element={<PakistanYouthFestival />} />

      {/* WC */}
      <Route path="/festival/wc/*" element={<WomenConference />} />

      {/* PTF */}
      <Route path="/festival/ptf/*" element={<PakistanTheatreFestival />} />

      {/* AAF */}
      <Route path="/festival/aaf/*" element={<ArtsAlumniFestival />} />
      <Route path="/alumni" element={<Navigate to="/festival/aaf" />} />
      {/* <Route path="/AlumniPage/event/:id" element={<AlumniEventsData />} /> */}

      {/* for barcode scan */}
      <Route path="/alumni.php" element={<AlumniRedirect />} />

      {/* for email link */}
      <Route path="/email" element={<Email />} />
    </Routes>
  );
};

export default App;
