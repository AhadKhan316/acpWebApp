//  
import { Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import './styles.css';

// Toasts
import { Toaster } from 'react-hot-toast';

// Components
import AlumniRedirect from './components/AlumniRedirect';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import StayUpdated from './components/StayUpdated';
import CommunityFeedback from './components/CommunityFeedback';
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
import MediaKit from './Pages/MediaKit';
import Registration from './Pages/RegistrationForm';
import Admission from './Pages/AdmissionsForm';
import VerifyOtp from './Pages/VerifyOtp';
import ResendOtp from './Pages/ResendOtp';
import UpcomingEventsPage from './Pages/AcpSubPages/UpcomingEventsPage';
import SovapaCoursePage from './Pages/AcpSubPages/SovapaCoursePage';
import VenueSubPage from './Pages/AcpSubPages/VenuesPage';
import WorldCultureFestival from './Pages/WorldCulturalFestival';
import PakistanLiteratureFestival from './Pages/PakistanLiteratureFestival';
import AalmiUrduConference from './Pages/AalmiUrduConference';
import PakistanYouthFestival from './Pages/PakistanYouthFestival';
import WomenConference from './Pages/WomenConference';
import PakistanTheatreFestival from './Pages/PakistanTheatreFestival';
import ArtsAlumniFestival from './Pages/ArtsAlumniFestival';
import NewsBlog from './Pages/NewsBlog';
import Whatweoffer from './components/Whatweoffer';
import Alloffers from './components/Alloffers';
import PresidentsMessage from './components/PresidentsMessage';
import Email from './Pages/Email';
import DelegatesPage from './Pages/DelegatesPage';
import RegistrationForm from './Pages/RegistrationForm';
import DashboardPage from './Pages/Dashboard';
import SettingPage from './Pages/SettingPage';
import ProfilePage from "./Pages/Profile";
import ResetPassword from "./Pages/ResetPassword";
import AdminUploadEvent from "./Pages/AdminUploadEvent"

import TicketPurchaseModal from "./components/TicketPurchaseModal";

import TicketBookingPage from "./Pages/TicketBooking";


const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <PresidentsMessage />
              <WhatWeDo />
              <Initiative />
              <Education />
              <CommunityFeedback />
              <Whatweoffer />
              <Alloffers />
              <StayUpdated />
              <OurSponsors />
            </>
          } />


          <Route path="/my-tickets" element={<TicketPurchaseModal/>} />
          <Route path="/ticket-booking" element={<TicketBookingPage/>} />


          <Route path="/initiatives" element={<Initiatives />} />
          <Route path="/events" element={<UpcomingEventsPage />} />
          <Route path="/sovapa/:department" element={<SovapaCoursePage />} />
          <Route path="/facilities/:venueId" element={<VenueSubPage />} />

          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/resend-otp" element={<ResendOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

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
          <Route path="/admin/upload" element={<AdminUploadEvent />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingPage />} />
        </Route>

        <Route path="/festival/wcf/*" element={<WorldCultureFestival />} />
        <Route path="/wcf" element={<Navigate to="/festival/wcf" />} />

        <Route path="/festival/plf/*" element={<PakistanLiteratureFestival />} />
        <Route path="/plf" element={<Navigate to="/festival/plf" />} />

        <Route path="/festival/auc/*" element={<AalmiUrduConference />} />
        <Route path="/auc" element={<Navigate to="/festival/auc" />} />

        <Route path="/festival/pyf/*" element={<PakistanYouthFestival />} />
        <Route path="/festival/wc/*" element={<WomenConference />} />
        <Route path="/festival/ptf/*" element={<PakistanTheatreFestival />} />
        <Route path="/festival/aaf/*" element={<ArtsAlumniFestival />} />
        <Route path="/alumni" element={<Navigate to="/festival/aaf" />} />
        <Route path="/alumni.php" element={<AlumniRedirect />} />
        <Route path="/email" element={<Email />} />

        <Route path="/book-tickets" element={<TicketPurchaseModal/>} />


      </Routes>
    </>
  );
};

export default App;
