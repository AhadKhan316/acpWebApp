import { FiCalendar, FiMapPin, FiArrowRight, FiPlay, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import Modal from "react-modal";

// All events main poster image
import OpeningPoster from "/src/assets/ArtsAlumniAssets/opening-ceremony.jpg"
import JourneyOfAzadi from "/src/assets/ArtsAlumniAssets/Alumni 2025 - Opening.jpg"
import DailyActivityPoster from "/src/assets/ArtsAlumniAssets/block-Printing-Workshop-segment9.jpg"
import MusicPanelDiscussionPoster from "/src/assets/ArtsAlumniAssets/Music-Education-in-transition.jpg"
import MusicPerformancePoster from "/src/assets/ArtsAlumniAssets/gumaan-segment11.jpg"
import HouseBandPoster from "/src/assets/ArtsAlumniAssets/house-band.jpg"
import AnInnocentMurderPoster from "/src/assets/ArtsAlumniAssets/an-Innocent-Murder-segment1.jpg"
import AiAuthorshipsAndAuthenticity from "/src/assets/ArtsAlumniAssets/ai-authenticity-segment12.jpg"
import MonicaAndATaleOfTwoBetrayed from "/src/assets/ArtsAlumniAssets/double-Bill-segment6.jpg"
import MusicMasterclassPoster from "/src/assets/ArtsAlumniAssets/independent-artist-journey.jpg"
import FineArtsDiscussionPoster from "/src/assets/ArtsAlumniAssets/alumni-stars-segment13.jpg"
import BharatanatyamDanceWorkshopPoster from "/src/assets/ArtsAlumniAssets/bharatanatyam-workshop-segment5.jpg"
import MusicPerformanceFolkwoke from "/src/assets/ArtsAlumniAssets/folk-wolk-concert.jpg"
import ClassicalPerformancePoster from "/src/assets/ArtsAlumniAssets/classical-performance-segment21.jpg"
import SalgirahTheatrePlayPoster from "/src/assets/ArtsAlumniAssets/Salgirah-poster.jpg"
import TheatreWorkshopPoster from "/src/assets/ArtsAlumniAssets/Voice-Workshop-Khalid-Ahmed-segment7.jpg"
import MusicMasterclassSonicStoryTellingPoster from "/src/assets/ArtsAlumniAssets/the-art-story-telling-segment20.jpg";
import TextileAndCommunicationDesignPanelDiscussionPoster from "/src/assets/ArtsAlumniAssets/alumni-stars-segment19.jpg";
import TheatrePlayGlassMenageriePoster from "/src/assets/ArtsAlumniAssets/Glass-Menagerie-segment4.jpg";
import TheatrePlayDastaanGoiPoster from "/src/assets/ArtsAlumniAssets/daastangoi-segment8.png";
import JourneyOfDancePoster from "/src/assets/ArtsAlumniAssets/journey-of-dance.jpg";
import QawwaliFusionPoster from "/src/assets/ArtsAlumniAssets/qawwali-fusion-segment16.jpg";


// Opening Ceremony
import OpeningCeremony1 from "/src/assets/ArtsAlumniAssets/opening-ceremony/1.jpg"
import OpeningCeremony2 from "/src/assets/ArtsAlumniAssets/opening-ceremony/3.jpg"
import OpeningCeremony3 from "/src/assets/ArtsAlumniAssets/opening-ceremony/4.jpg"
import OpeningCeremony4 from "/src/assets/ArtsAlumniAssets/opening-ceremony/5.jpg"
import OpeningCeremony5 from "/src/assets/ArtsAlumniAssets/opening-ceremony/6.jpg"
import OpeningCeremony6 from "/src/assets/ArtsAlumniAssets/opening-ceremony/7.jpg"
import OpeningCeremony7 from "/src/assets/ArtsAlumniAssets/opening-ceremony/2.jpg"
import OpeningCeremony8 from "/src/assets/ArtsAlumniAssets/opening-ceremony/8.jpg"

// Journey of Azadi
import JourneyOfAzadi1 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/1.jpg"
import JourneyOfAzadi2 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/2.jpg"
import JourneyOfAzadi3 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/3.jpg"
import JourneyOfAzadi4 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/4.jpg"
import JourneyOfAzadi5 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/5.jpg"
import JourneyOfAzadi6 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/6.jpg"
import JourneyOfAzadi7 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/7.jpg"
import JourneyOfAzadi8 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/8.jpg"
import JourneyOfAzadi9 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/9.jpg"
import JourneyOfAzadi10 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/10.jpg"
import JourneyOfAzadi11 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/11.jpg"
import JourneyOfAzadi12 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/12.jpg"
import JourneyOfAzadi13 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/13.jpg"
import JourneyOfAzadi14 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/14.jpg"
import JourneyOfAzadi15 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/15.jpg"
import JourneyOfAzadi16 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/16.jpg"
import JourneyOfAzadi17 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/17.jpg"
import JourneyOfAzadi18 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/18.jpg"
import JourneyOfAzadi19 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/19.jpg"
import JourneyOfAzadi20 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/20.jpg"
import JourneyOfAzadi21 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/21.jpg"
import JourneyOfAzadi22 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/22.jpg"
import JourneyOfAzadi23 from "/src/assets/ArtsAlumniAssets/journey-of-azadi/23.jpg"


// Musical panel Discussion 2
import MusicPanelDiscussion1 from "/src/assets/ArtsAlumniAssets/music-panel-discussion-2/1.jpg";
import MusicPanelDiscussion2 from "/src/assets/ArtsAlumniAssets/music-panel-discussion-2/2.jpg";
import MusicPanelDiscussion3 from "/src/assets/ArtsAlumniAssets/music-panel-discussion-2/3.jpg";
import MusicPanelDiscussion4 from "/src/assets/ArtsAlumniAssets/music-panel-discussion-2/4.jpg";
import MusicPanelDiscussion5 from "/src/assets/ArtsAlumniAssets/music-panel-discussion-2/5.jpg";
import MusicPanelDiscussion6 from "/src/assets/ArtsAlumniAssets/music-panel-discussion-2/6.jpg";
import MusicPanelDiscussion7 from "/src/assets/ArtsAlumniAssets/music-panel-discussion-2/7.jpg";
import MusicPanelDiscussion8 from "/src/assets/ArtsAlumniAssets/music-panel-discussion-2/8.jpg";
import MusicPanelDiscussion9 from "/src/assets/ArtsAlumniAssets/music-panel-discussion-2/9.jpg";


// Daily Activities
import BlockPrintingWorkshop1 from "/src/assets/ArtsAlumniAssets/daily-activities/1.jpg";
import BlockPrintingWorkshop2 from "/src/assets/ArtsAlumniAssets/daily-activities/2.jpg";
import BlockPrintingWorkshop3 from "/src/assets/ArtsAlumniAssets/daily-activities/3.jpg";
import BlockPrintingWorkshop4 from "/src/assets/ArtsAlumniAssets/daily-activities/4.jpg";
import BlockPrintingWorkshop5 from "/src/assets/ArtsAlumniAssets/daily-activities/5.jpg";
import BlockPrintingWorkshop6 from "/src/assets/ArtsAlumniAssets/daily-activities/6.jpg";
import BlockPrintingWorkshop7 from "/src/assets/ArtsAlumniAssets/daily-activities/7.jpg";
import BlockPrintingWorkshop8 from "/src/assets/ArtsAlumniAssets/daily-activities/8.jpg";
import BlockPrintingWorkshop9 from "/src/assets/ArtsAlumniAssets/daily-activities/9.jpg";
import BlockPrintingWorkshop10 from "/src/assets/ArtsAlumniAssets/daily-activities/10.jpg";
import BlockPrintingWorkshop11 from "/src/assets/ArtsAlumniAssets/daily-activities/11.jpg";
import BlockPrintingWorkshop12 from "/src/assets/ArtsAlumniAssets/daily-activities/12.jpg";
import BlockPrintingWorkshop13 from "/src/assets/ArtsAlumniAssets/daily-activities/13.jpg";
import BlockPrintingWorkshop14 from "/src/assets/ArtsAlumniAssets/daily-activities/14.jpg";
import BlockPrintingWorkshop15 from "/src/assets/ArtsAlumniAssets/daily-activities/15.jpg";
import BlockPrintingWorkshop16 from "/src/assets/ArtsAlumniAssets/daily-activities/16.jpg";
import BlockPrintingWorkshop17 from "/src/assets/ArtsAlumniAssets/daily-activities/17.jpg";


// An Innocent Little Murder
import TheatreDarkComedy1 from "/src/assets/ArtsAlumniAssets/an-innocent-theatre-dark-play/1.jpg";
import TheatreDarkComedy2 from "/src/assets/ArtsAlumniAssets/an-innocent-theatre-dark-play/2.jpg";
import TheatreDarkComedy3 from "/src/assets/ArtsAlumniAssets/an-innocent-theatre-dark-play/3.jpg";
import TheatreDarkComedy4 from "/src/assets/ArtsAlumniAssets/an-innocent-theatre-dark-play/4.jpg";
import TheatreDarkComedy5 from "/src/assets/ArtsAlumniAssets/an-innocent-theatre-dark-play/5.jpg";
import TheatreDarkComedy6 from "/src/assets/ArtsAlumniAssets/an-innocent-theatre-dark-play/6.jpg";
import TheatreDarkComedy7 from "/src/assets/ArtsAlumniAssets/an-innocent-theatre-dark-play/7.jpg";
import TheatreDarkComedy8 from "/src/assets/ArtsAlumniAssets/an-innocent-theatre-dark-play/8.jpg";
import TheatreDarkComedy9 from "/src/assets/ArtsAlumniAssets/an-innocent-theatre-dark-play/9.jpg";


// Concert Rock & Pop
import MusicPerformanceRockPop1 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/1.jpg";
import MusicPerformanceRockPop2 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/2.jpg";
import MusicPerformanceRockPop3 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/3.jpg";
import MusicPerformanceRockPop4 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/4.jpg";
import MusicPerformanceRockPop5 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/5.jpg";
import MusicPerformanceRockPop6 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/6.jpg";
import MusicPerformanceRockPop7 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/7.jpg";
import MusicPerformanceRockPop8 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/8.jpg";
import MusicPerformanceRockPop9 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/9.jpg";
import MusicPerformanceRockPop10 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/10.jpg";
import MusicPerformanceRockPop11 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/11.jpg";
import MusicPerformanceRockPop12 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/12.jpg";
import MusicPerformanceRockPop13 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/13.jpg";
import MusicPerformanceRockPop14 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/14.jpg";
import MusicPerformanceRockPop15 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/15.jpg";
import MusicPerformanceRockPop16 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/16.jpg";
import MusicPerformanceRockPop17 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/17.jpg";
import MusicPerformanceRockPop18 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/18.jpg";
import MusicPerformanceRockPop19 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/19.jpg";
import MusicPerformanceRockPop20 from "/src/assets/ArtsAlumniAssets/music-performance-gumaan/20.jpg";

// Music Panel Discussion 1
import MusicPanelDiscuss1 from "/src/assets/ArtsAlumniAssets/music-panel-discussion/1.jpg";
import MusicPanelDiscuss2 from "/src/assets/ArtsAlumniAssets/music-panel-discussion/2.jpg";
import MusicPanelDiscuss3 from "/src/assets/ArtsAlumniAssets/music-panel-discussion/3.jpg";
import MusicPanelDiscuss4 from "/src/assets/ArtsAlumniAssets/music-panel-discussion/4.jpg";
import MusicPanelDiscuss5 from "/src/assets/ArtsAlumniAssets/music-panel-discussion/5.jpg";
import MusicPanelDiscuss6 from "/src/assets/ArtsAlumniAssets/music-panel-discussion/6.jpg";
import MusicPanelDiscuss7 from "/src/assets/ArtsAlumniAssets/music-panel-discussion/7.jpg";
import MusicPanelDiscuss8 from "/src/assets/ArtsAlumniAssets/music-panel-discussion/8.jpg";

// Monica-and-a-tale-of-two-betrayals
import MonicaAndATaleOfTwoBetrayals1 from "/src/assets/ArtsAlumniAssets/Monica-and-a-tale-of-two-betrayals/1.jpg";
import MonicaAndATaleOfTwoBetrayals2 from "/src/assets/ArtsAlumniAssets/Monica-and-a-tale-of-two-betrayals/2.jpg";
import MonicaAndATaleOfTwoBetrayals3 from "/src/assets/ArtsAlumniAssets/Monica-and-a-tale-of-two-betrayals/3.jpg";
import MonicaAndATaleOfTwoBetrayals4 from "/src/assets/ArtsAlumniAssets/Monica-and-a-tale-of-two-betrayals/4.jpg";
import MonicaAndATaleOfTwoBetrayals5 from "/src/assets/ArtsAlumniAssets/Monica-and-a-tale-of-two-betrayals/5.jpg";
import MonicaAndATaleOfTwoBetrayals6 from "/src/assets/ArtsAlumniAssets/Monica-and-a-tale-of-two-betrayals/6.jpg";
import MonicaAndATaleOfTwoBetrayals7 from "/src/assets/ArtsAlumniAssets/Monica-and-a-tale-of-two-betrayals/7.jpg";
import MonicaAndATaleOfTwoBetrayals8 from "/src/assets/ArtsAlumniAssets/Monica-and-a-tale-of-two-betrayals/8.jpg";
import MonicaAndATaleOfTwoBetrayals9 from "/src/assets/ArtsAlumniAssets/Monica-and-a-tale-of-two-betrayals/9.jpg";

// Music Masterclass
import MusicMasterclass1 from "/src/assets/ArtsAlumniAssets/music-masterclass/1.jpg";
import MusicMasterclass2 from "/src/assets/ArtsAlumniAssets/music-masterclass/2.jpg";
import MusicMasterclass3 from "/src/assets/ArtsAlumniAssets/music-masterclass/3.jpg";
import MusicMasterclass4 from "/src/assets/ArtsAlumniAssets/music-masterclass/4.jpg";
import MusicMasterclass5 from "/src/assets/ArtsAlumniAssets/music-masterclass/5.jpg";
import MusicMasterclass6 from "/src/assets/ArtsAlumniAssets/music-masterclass/6.jpg";
import MusicMasterclass7 from "/src/assets/ArtsAlumniAssets/music-masterclass/7.jpg";

// Fine Arts Panel Discussion
import FineArtsPanelDiscussion1 from "/src/assets/ArtsAlumniAssets/fine-arts-panel-discussion/1.jpg";
import FineArtsPanelDiscussion2 from "/src/assets/ArtsAlumniAssets/fine-arts-panel-discussion/2.jpg";
import FineArtsPanelDiscussion3 from "/src/assets/ArtsAlumniAssets/fine-arts-panel-discussion/3.jpg";
import FineArtsPanelDiscussion4 from "/src/assets/ArtsAlumniAssets/fine-arts-panel-discussion/4.jpg";
import FineArtsPanelDiscussion5 from "/src/assets/ArtsAlumniAssets/fine-arts-panel-discussion/5.jpg";
import FineArtsPanelDiscussion6 from "/src/assets/ArtsAlumniAssets/fine-arts-panel-discussion/6.jpg";
import FineArtsPanelDiscussion7 from "/src/assets/ArtsAlumniAssets/fine-arts-panel-discussion/7.jpg";
import FineArtsPanelDiscussion8 from "/src/assets/ArtsAlumniAssets/fine-arts-panel-discussion/8.jpg";
import FineArtsPanelDiscussion9 from "/src/assets/ArtsAlumniAssets/fine-arts-panel-discussion/9.jpg";
import FineArtsPanelDiscussion10 from "/src/assets/ArtsAlumniAssets/fine-arts-panel-discussion/10.jpg";
import FineArtsPanelDiscussion11 from "/src/assets/ArtsAlumniAssets/fine-arts-panel-discussion/11.jpg";
import FineArtsPanelDiscussion12 from "/src/assets/ArtsAlumniAssets/fine-arts-panel-discussion/12.jpg";

// Bharatanatyam Dance Workshop
import BharatanatyamDanceWorkshop1 from "/src/assets/ArtsAlumniAssets/bharatanatyam-dance-workshop/1.jpg";
import BharatanatyamDanceWorkshop2 from "/src/assets/ArtsAlumniAssets/bharatanatyam-dance-workshop/2.jpg";
import BharatanatyamDanceWorkshop3 from "/src/assets/ArtsAlumniAssets/bharatanatyam-dance-workshop/3.jpg";
import BharatanatyamDanceWorkshop4 from "/src/assets/ArtsAlumniAssets/bharatanatyam-dance-workshop/4.jpg";
import BharatanatyamDanceWorkshop5 from "/src/assets/ArtsAlumniAssets/bharatanatyam-dance-workshop/5.jpg";
import BharatanatyamDanceWorkshop6 from "/src/assets/ArtsAlumniAssets/bharatanatyam-dance-workshop/6.jpg";
import BharatanatyamDanceWorkshop7 from "/src/assets/ArtsAlumniAssets/bharatanatyam-dance-workshop/7.jpg";
import BharatanatyamDanceWorkshop8 from "/src/assets/ArtsAlumniAssets/bharatanatyam-dance-workshop/8.jpg";
import BharatanatyamDanceWorkshop9 from "/src/assets/ArtsAlumniAssets/bharatanatyam-dance-workshop/9.jpg";
import BharatanatyamDanceWorkshop10 from "/src/assets/ArtsAlumniAssets/bharatanatyam-dance-workshop/10.jpg";
import BharatanatyamDanceWorkshop11 from "/src/assets/ArtsAlumniAssets/bharatanatyam-dance-workshop/11.jpg";
import BharatanatyamDanceWorkshop12 from "/src/assets/ArtsAlumniAssets/bharatanatyam-dance-workshop/12.jpg";

// Music Folkwoke
import MusicPerformanceFolkwoke1 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/1.jpg";
import MusicPerformanceFolkwoke2 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/2.jpg";
import MusicPerformanceFolkwoke3 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/3.jpg";
import MusicPerformanceFolkwoke4 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/4.jpg";
import MusicPerformanceFolkwoke5 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/5.jpg";
import MusicPerformanceFolkwoke6 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/6.jpg";
import MusicPerformanceFolkwoke7 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/7.jpg";
import MusicPerformanceFolkwoke8 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/8.jpg";
import MusicPerformanceFolkwoke9 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/9.jpg";
import MusicPerformanceFolkwoke10 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/10.jpg";
import MusicPerformanceFolkwoke11 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/11.jpg";
import MusicPerformanceFolkwoke12 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/12.jpg";
import MusicPerformanceFolkwoke13 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/13.jpg";
import MusicPerformanceFolkwoke14 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/14.jpg";
import MusicPerformanceFolkwoke15 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/15.jpg";
import MusicPerformanceFolkwoke16 from "/src/assets/ArtsAlumniAssets/music-performance-folkwoke/16.jpg";



// classical-performance
import ClassicalPerformance1 from "/src/assets/ArtsAlumniAssets/classical-performance/1.jpg";
import ClassicalPerformance2 from "/src/assets/ArtsAlumniAssets/classical-performance/2.jpg";
import ClassicalPerformance3 from "/src/assets/ArtsAlumniAssets/classical-performance/3.jpg";
import ClassicalPerformance4 from "/src/assets/ArtsAlumniAssets/classical-performance/4.jpg";
import ClassicalPerformance5 from "/src/assets/ArtsAlumniAssets/classical-performance/5.jpg";
import ClassicalPerformance6 from "/src/assets/ArtsAlumniAssets/classical-performance/6.jpg";
import ClassicalPerformance7 from "/src/assets/ArtsAlumniAssets/classical-performance/7.jpg";
import ClassicalPerformance8 from "/src/assets/ArtsAlumniAssets/classical-performance/8.jpg";
import ClassicalPerformance9 from "/src/assets/ArtsAlumniAssets/classical-performance/9.jpg";
import ClassicalPerformance10 from "/src/assets/ArtsAlumniAssets/classical-performance/10.jpg";
import ClassicalPerformance11 from "/src/assets/ArtsAlumniAssets/classical-performance/11.jpg";
import ClassicalPerformance12 from "/src/assets/ArtsAlumniAssets/classical-performance/12.jpg";
import ClassicalPerformance13 from "/src/assets/ArtsAlumniAssets/classical-performance/13.jpg";
import ClassicalPerformance14 from "/src/assets/ArtsAlumniAssets/classical-performance/14.jpg";
import ClassicalPerformance15 from "/src/assets/ArtsAlumniAssets/classical-performance/15.jpg";

// Salgirah 
import Salgirah1 from "/src/assets/ArtsAlumniAssets/salgirah-theatre-play/1.jpg";
import Salgirah2 from "/src/assets/ArtsAlumniAssets/salgirah-theatre-play/2.jpg";
import Salgirah3 from "/src/assets/ArtsAlumniAssets/salgirah-theatre-play/3.jpg";
import Salgirah4 from "/src/assets/ArtsAlumniAssets/salgirah-theatre-play/4.jpg";
import Salgirah5 from "/src/assets/ArtsAlumniAssets/salgirah-theatre-play/5.jpg";
import Salgirah6 from "/src/assets/ArtsAlumniAssets/salgirah-theatre-play/6.jpg";
import Salgirah7 from "/src/assets/ArtsAlumniAssets/salgirah-theatre-play/7.jpg";
import Salgirah8 from "/src/assets/ArtsAlumniAssets/salgirah-theatre-play/8.jpg";
import Salgirah9 from "/src/assets/ArtsAlumniAssets/salgirah-theatre-play/9.jpg";
import Salgirah10 from "/src/assets/ArtsAlumniAssets/salgirah-theatre-play/10.jpg";
import Salgirah11 from "/src/assets/ArtsAlumniAssets/salgirah-theatre-play/11.jpg";
import Salgirah12 from "/src/assets/ArtsAlumniAssets/salgirah-theatre-play/12.jpg";

// Theatre Workshop Power of Voice
import TheatreWorkshopPowerOfVoice1 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/1.jpg";
import TheatreWorkshopPowerOfVoice2 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/2.jpg";
import TheatreWorkshopPowerOfVoice3 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/3.jpg";
import TheatreWorkshopPowerOfVoice4 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/4.jpg";
import TheatreWorkshopPowerOfVoice5 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/5.jpg";
import TheatreWorkshopPowerOfVoice6 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/6.jpg";
import TheatreWorkshopPowerOfVoice7 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/7.jpg";
import TheatreWorkshopPowerOfVoice8 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/8.jpg";
import TheatreWorkshopPowerOfVoice9 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/9.jpg";
import TheatreWorkshopPowerOfVoice10 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/10.jpg";
import TheatreWorkshopPowerOfVoice11 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/11.jpg";
import TheatreWorkshopPowerOfVoice12 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/12.jpg";
import TheatreWorkshopPowerOfVoice13 from "/src/assets/ArtsAlumniAssets/power-of-voice-theatre-workshop/13.jpg";


// music-masterclass-the-art-of-sonic-storytelling
import MusicMasterclassTheArtOfSonicStorytelling1 from "/src/assets/ArtsAlumniAssets/music-masterclass-the-art-of-sonic-storytelling/1.jpg";
import MusicMasterclassTheArtOfSonicStorytelling2 from "/src/assets/ArtsAlumniAssets/music-masterclass-the-art-of-sonic-storytelling/2.jpg";
import MusicMasterclassTheArtOfSonicStorytelling3 from "/src/assets/ArtsAlumniAssets/music-masterclass-the-art-of-sonic-storytelling/3.jpg";
import MusicMasterclassTheArtOfSonicStorytelling4 from "/src/assets/ArtsAlumniAssets/music-masterclass-the-art-of-sonic-storytelling/4.jpg";
import MusicMasterclassTheArtOfSonicStorytelling5 from "/src/assets/ArtsAlumniAssets/music-masterclass-the-art-of-sonic-storytelling/5.jpg";
import MusicMasterclassTheArtOfSonicStorytelling6 from "/src/assets/ArtsAlumniAssets/music-masterclass-the-art-of-sonic-storytelling/6.jpg";
import MusicMasterclassTheArtOfSonicStorytelling7 from "/src/assets/ArtsAlumniAssets/music-masterclass-the-art-of-sonic-storytelling/7.jpg";
import MusicMasterclassTheArtOfSonicStorytelling8 from "/src/assets/ArtsAlumniAssets/music-masterclass-the-art-of-sonic-storytelling/8.jpg";
import TextileAndCommunicationDesignPanelDiscussion7 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/7.jpg";
import MusicMasterclassTheArtOfSonicStorytelling9 from "/src/assets/ArtsAlumniAssets/music-masterclass-the-art-of-sonic-storytelling/9.jpg";
import MusicMasterclassTheArtOfSonicStorytelling10 from "/src/assets/ArtsAlumniAssets/music-masterclass-the-art-of-sonic-storytelling/10.jpg";
import MusicMasterclassTheArtOfSonicStorytelling11 from "/src/assets/ArtsAlumniAssets/music-masterclass-the-art-of-sonic-storytelling/11.jpg";
import MusicMasterclassTheArtOfSonicStorytelling12 from "/src/assets/ArtsAlumniAssets/music-masterclass-the-art-of-sonic-storytelling/12.jpg";

// Textile and Communication Design Panel Discussion
import TextileAndCommunicationDesignPanelDiscussion1 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/1.jpg";
import TextileAndCommunicationDesignPanelDiscussion2 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/2.jpg";
import TextileAndCommunicationDesignPanelDiscussion3 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/3.jpg";
import TextileAndCommunicationDesignPanelDiscussion4 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/4.jpg";
import TextileAndCommunicationDesignPanelDiscussion5 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/5.jpg";
import TextileAndCommunicationDesignPanelDiscussion6 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/6.jpg";
import TextileAndCommunicationDesignPanelDiscussion8 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/8.jpg";
import TextileAndCommunicationDesignPanelDiscussion9 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/9.jpg";
import TextileAndCommunicationDesignPanelDiscussion10 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/10.jpg";
import TextileAndCommunicationDesignPanelDiscussion11 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/11.jpg";
import TextileAndCommunicationDesignPanelDiscussion12 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/12.jpg";
import TextileAndCommunicationDesignPanelDiscussion13 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/13.jpg";
import TextileAndCommunicationDesignPanelDiscussion14 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/14.jpg";
import TextileAndCommunicationDesignPanelDiscussion15 from "/src/assets/ArtsAlumniAssets/textile-and-communication-panel-discussion/15.jpg";

// Glass Menagerie Theatre Play
import TheatrePlayGlassMenagerie1 from "/src/assets/ArtsAlumniAssets/glass-menagerie-theatre-play/1.jpg";
import TheatrePlayGlassMenagerie2 from "/src/assets/ArtsAlumniAssets/glass-menagerie-theatre-play/2.jpg";
import TheatrePlayGlassMenagerie3 from "/src/assets/ArtsAlumniAssets/glass-menagerie-theatre-play/3.jpg";
import TheatrePlayGlassMenagerie4 from "/src/assets/ArtsAlumniAssets/glass-menagerie-theatre-play/4.jpg";
import TheatrePlayGlassMenagerie5 from "/src/assets/ArtsAlumniAssets/glass-menagerie-theatre-play/5.jpg";
import TheatrePlayGlassMenagerie6 from "/src/assets/ArtsAlumniAssets/glass-menagerie-theatre-play/6.jpg";
import TheatrePlayGlassMenagerie7 from "/src/assets/ArtsAlumniAssets/glass-menagerie-theatre-play/7.jpg";
import TheatrePlayGlassMenagerie8 from "/src/assets/ArtsAlumniAssets/glass-menagerie-theatre-play/8.jpg";
import TheatrePlayGlassMenagerie9 from "/src/assets/ArtsAlumniAssets/glass-menagerie-theatre-play/9.jpg";
import TheatrePlayGlassMenagerie10 from "/src/assets/ArtsAlumniAssets/glass-menagerie-theatre-play/10.jpg";
import TheatrePlayGlassMenagerie11 from "/src/assets/ArtsAlumniAssets/glass-menagerie-theatre-play/11.jpg";
import TheatrePlayGlassMenagerie12 from "/src/assets/ArtsAlumniAssets/glass-menagerie-theatre-play/12.jpg";

// Dastaan Goi Theatre Play
import TheatrePlayDastaanGoi1 from "/src/assets/ArtsAlumniAssets/dastaan-goe-theatre-play/1.jpg";
import TheatrePlayDastaanGoi2 from "/src/assets/ArtsAlumniAssets/dastaan-goe-theatre-play/2.jpg";
import TheatrePlayDastaanGoi3 from "/src/assets/ArtsAlumniAssets/dastaan-goe-theatre-play/3.jpg";
import TheatrePlayDastaanGoi4 from "/src/assets/ArtsAlumniAssets/dastaan-goe-theatre-play/4.jpg";
import TheatrePlayDastaanGoi5 from "/src/assets/ArtsAlumniAssets/dastaan-goe-theatre-play/5.jpg";
import TheatrePlayDastaanGoi6 from "/src/assets/ArtsAlumniAssets/dastaan-goe-theatre-play/6.jpg";
import TheatrePlayDastaanGoi7 from "/src/assets/ArtsAlumniAssets/dastaan-goe-theatre-play/7.jpg";
import TheatrePlayDastaanGoi8 from "/src/assets/ArtsAlumniAssets/dastaan-goe-theatre-play/8.jpg";
import TheatrePlayDastaanGoi9 from "/src/assets/ArtsAlumniAssets/dastaan-goe-theatre-play/9.jpg";

// Journey of Dance
import JourneyOfDance1 from "/src/assets/ArtsAlumniAssets/journey-of-dance/1.jpg";
import JourneyOfDance2 from "/src/assets/ArtsAlumniAssets/journey-of-dance/2.jpg";
import JourneyOfDance3 from "/src/assets/ArtsAlumniAssets/journey-of-dance/3.jpg";
import JourneyOfDance4 from "/src/assets/ArtsAlumniAssets/journey-of-dance/4.jpg";
import JourneyOfDance5 from "/src/assets/ArtsAlumniAssets/journey-of-dance/5.jpg";
import JourneyOfDance6 from "/src/assets/ArtsAlumniAssets/journey-of-dance/6.jpg";
import JourneyOfDance7 from "/src/assets/ArtsAlumniAssets/journey-of-dance/7.jpg";
import JourneyOfDance8 from "/src/assets/ArtsAlumniAssets/journey-of-dance/8.jpg";
import JourneyOfDance9 from "/src/assets/ArtsAlumniAssets/journey-of-dance/9.jpg";
import JourneyOfDance10 from "/src/assets/ArtsAlumniAssets/journey-of-dance/10.jpg";
import JourneyOfDance11 from "/src/assets/ArtsAlumniAssets/journey-of-dance/11.jpg";
import JourneyOfDance12 from "/src/assets/ArtsAlumniAssets/journey-of-dance/12.jpg";
import JourneyOfDance13 from "/src/assets/ArtsAlumniAssets/journey-of-dance/13.jpg";
import JourneyOfDance14 from "/src/assets/ArtsAlumniAssets/journey-of-dance/14.jpg";
import JourneyOfDance15 from "/src/assets/ArtsAlumniAssets/journey-of-dance/15.jpg";
import JourneyOfDance16 from "/src/assets/ArtsAlumniAssets/journey-of-dance/16.jpg";
import JourneyOfDance17 from "/src/assets/ArtsAlumniAssets/journey-of-dance/17.jpg";
import JourneyOfDance18 from "/src/assets/ArtsAlumniAssets/journey-of-dance/18.jpg";
import JourneyOfDance19 from "/src/assets/ArtsAlumniAssets/journey-of-dance/19.jpg";
import JourneyOfDance20 from "/src/assets/ArtsAlumniAssets/journey-of-dance/20.jpg";
import JourneyOfDance21 from "/src/assets/ArtsAlumniAssets/journey-of-dance/21.jpg";
import JourneyOfDance22 from "/src/assets/ArtsAlumniAssets/journey-of-dance/22.jpg";
import JourneyOfDance23 from "/src/assets/ArtsAlumniAssets/journey-of-dance/23.jpg";
import JourneyOfDance24 from "/src/assets/ArtsAlumniAssets/journey-of-dance/24.jpg";
import JourneyOfDance25 from "/src/assets/ArtsAlumniAssets/journey-of-dance/25.jpg";
import JourneyOfDance26 from "/src/assets/ArtsAlumniAssets/journey-of-dance/26.jpg";
import JourneyOfDance27 from "/src/assets/ArtsAlumniAssets/journey-of-dance/27.jpg";
import JourneyOfDance28 from "/src/assets/ArtsAlumniAssets/journey-of-dance/28.jpg";
import JourneyOfDance29 from "/src/assets/ArtsAlumniAssets/journey-of-dance/29.jpg";
import JourneyOfDance30 from "/src/assets/ArtsAlumniAssets/journey-of-dance/30.jpg";
// import JourneyOfDance31 from "/src/assets/ArtsAlumniAssets/journey-of-dance/31.jpg";
// import JourneyOfDance32 from "/src/assets/ArtsAlumniAssets/journey-of-dance/32.jpg";
// import JourneyOfDance33 from "/src/assets/ArtsAlumniAssets/journey-of-dance/33.jpg";
// import JourneyOfDance34 from "/src/assets/ArtsAlumniAssets/journey-of-dance/34.jpg";
// import JourneyOfDance35 from "/src/assets/ArtsAlumniAssets/journey-of-dance/35.jpg";
import JourneyOfDance36 from "/src/assets/ArtsAlumniAssets/journey-of-dance/36.jpg";
import JourneyOfDance37 from "/src/assets/ArtsAlumniAssets/journey-of-dance/37.jpg";
import JourneyOfDance38 from "/src/assets/ArtsAlumniAssets/journey-of-dance/38.jpg";
import JourneyOfDance39 from "/src/assets/ArtsAlumniAssets/journey-of-dance/39.jpg";
import JourneyOfDance40 from "/src/assets/ArtsAlumniAssets/journey-of-dance/40.jpg";
import JourneyOfDance41 from "/src/assets/ArtsAlumniAssets/journey-of-dance/41.jpg";
import JourneyOfDance42 from "/src/assets/ArtsAlumniAssets/journey-of-dance/42.jpg";
import JourneyOfDance43 from "/src/assets/ArtsAlumniAssets/journey-of-dance/43.jpg";
import JourneyOfDance44 from "/src/assets/ArtsAlumniAssets/journey-of-dance/44.jpg";
import JourneyOfDance45 from "/src/assets/ArtsAlumniAssets/journey-of-dance/45.jpg";


// Qawwali Fusion
import QawwaliFusion1 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/1.jpg";
import QawwaliFusion2 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/2.jpg";
import QawwaliFusion3 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/3.jpg";
import QawwaliFusion4 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/4.jpg";
import QawwaliFusion5 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/5.jpg";
import QawwaliFusion6 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/6.jpg";
import QawwaliFusion7 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/7.jpg";
import QawwaliFusion8 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/8.jpg";
import QawwaliFusion9 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/9.jpg";
import QawwaliFusion10 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/10.jpg";
import QawwaliFusion11 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/11.jpg";
import QawwaliFusion12 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/12.jpg";
import QawwaliFusion13 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/13.jpg";
import QawwaliFusion14 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/14.jpg";
import QawwaliFusion15 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/15.jpg";
import QawwaliFusion16 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/16.jpg";
import QawwaliFusion17 from "/src/assets/ArtsAlumniAssets/qawaali-fusion/17.jpg";

const fallbackImage = "https://via.placeholder.com/800x600?text=Event+Poster";


const events = [
  // first session start here
  {
    id: "opening-ceremony",
    title: "Opening Ceremony",
    poster: OpeningPoster,
    description:
      "The event was opened by Syed Asif Hyder Shah, Chief Secretary Sindh along with President ACP Mohammad Ahmed Shah",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 23, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // second session start here
  {
    id: "journey-of-azadi",
    title: "Journey of Azadi",
    poster: JourneyOfAzadi,
    description:
      "Activities for the day included an Art Exhibition followed by a Tribute to Pakistan's Martyrs. Speeches, Music, Theatre, and Dance performances were held at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi.",
    gallery: [
      JourneyOfAzadi20,
      JourneyOfAzadi21,
      JourneyOfAzadi22,
      JourneyOfAzadi23,
      JourneyOfAzadi1,
      JourneyOfAzadi2,
      JourneyOfAzadi3,
      JourneyOfAzadi4,
      JourneyOfAzadi5,
      JourneyOfAzadi6,
      JourneyOfAzadi7,
      JourneyOfAzadi8,
      JourneyOfAzadi9,
      JourneyOfAzadi10,
      JourneyOfAzadi11,
      JourneyOfAzadi13,
      JourneyOfAzadi14,
      JourneyOfAzadi12,
      JourneyOfAzadi15,
      JourneyOfAzadi19,
      JourneyOfAzadi16,
      JourneyOfAzadi17,
      JourneyOfAzadi18,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 23, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Third session start here
  {
    id: "daily-activities",
    title: "Daily Activities",
    poster: DailyActivityPoster,
    description:
      "A series of workshops and activities were held at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi. These included a Block Printing Workshop, a Calligraphy Workshop, and a Painting Workshop.",
    gallery: [
      BlockPrintingWorkshop1,
      BlockPrintingWorkshop2,
      BlockPrintingWorkshop3,
      BlockPrintingWorkshop4,
      BlockPrintingWorkshop5,
      BlockPrintingWorkshop6,
      BlockPrintingWorkshop7,
      BlockPrintingWorkshop8,
      BlockPrintingWorkshop9,
      BlockPrintingWorkshop10,
      BlockPrintingWorkshop11,
      BlockPrintingWorkshop12,
      BlockPrintingWorkshop13,
      BlockPrintingWorkshop14,
      BlockPrintingWorkshop15,
      BlockPrintingWorkshop16,
      BlockPrintingWorkshop17,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 23, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourth session start here
  {

    id: "music-panel-discussion",
    title: "Music Panel Discussion",
    poster: MusicPanelDiscussionPoster,
    description:
      "A discussion on music curriculums, the challenges faced by musicians, and the future of music education in Pakistan was held at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi.",
    gallery: [
      MusicPanelDiscussion1,
      MusicPanelDiscussion2,
      MusicPanelDiscussion3,
      MusicPanelDiscussion4,
      MusicPanelDiscussion5,
      MusicPanelDiscussion6,
      MusicPanelDiscussion7,
      MusicPanelDiscussion8,
      MusicPanelDiscussion9,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 23, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fifth session start here
  {
    id: "music-performance-rock-n-pop",
    title: "Music Performance: Rock & Pop",
    poster: MusicPerformancePoster,
    description: "A Concert by Gumaan and SOVAPA Alumni's.",
    gallery: [
      MusicPerformanceRockPop1,
      MusicPerformanceRockPop2,
      MusicPerformanceRockPop3,
      MusicPerformanceRockPop4,
      MusicPerformanceRockPop5,
      MusicPerformanceRockPop6,
      MusicPerformanceRockPop7,
      MusicPerformanceRockPop8,
      MusicPerformanceRockPop9,
      MusicPerformanceRockPop10,
      MusicPerformanceRockPop11,
      MusicPerformanceRockPop12,
      MusicPerformanceRockPop13,
      MusicPerformanceRockPop14,
      MusicPerformanceRockPop15,
      MusicPerformanceRockPop16,
      MusicPerformanceRockPop17,
      MusicPerformanceRockPop18,
      MusicPerformanceRockPop19,
      MusicPerformanceRockPop20,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 23, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Sixth session start here
  {
    id: "house-band",
    title: "House Band",
    poster: HouseBandPoster,
    description: "A Concert by Gumaan and SOVAPA Alumni's.",
    gallery: [
      MusicPerformanceRockPop1,
      MusicPerformanceRockPop2,
      MusicPerformanceRockPop3,
      MusicPerformanceRockPop4,
      MusicPerformanceRockPop5,
      MusicPerformanceRockPop6,
      MusicPerformanceRockPop7,
      MusicPerformanceRockPop8,
      MusicPerformanceRockPop9,
      MusicPerformanceRockPop10,
      MusicPerformanceRockPop11,
      MusicPerformanceRockPop12,
      MusicPerformanceRockPop13,
      MusicPerformanceRockPop14,
      MusicPerformanceRockPop15,
      MusicPerformanceRockPop16,
      MusicPerformanceRockPop17,
      MusicPerformanceRockPop18,
      MusicPerformanceRockPop19,
      MusicPerformanceRockPop20,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 23, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Seventh session start here
  {
    id: "an-innocent-little-murder",
    title: "An Innocent Little Murder",
    poster: AnInnocentMurderPoster,
    description: "The Dark Comedy play an innocent Little Murder.",
    gallery: [
      TheatreDarkComedy1,
      TheatreDarkComedy2,
      TheatreDarkComedy3,
      TheatreDarkComedy4,
      TheatreDarkComedy5,
      TheatreDarkComedy6,
      TheatreDarkComedy7,
      TheatreDarkComedy8,
      TheatreDarkComedy9,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 23, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Eighth session start here
  {
    id: "ai-authorship-authenticity",
    title: "AI Authorship & Authenticity",
    poster: AiAuthorshipsAndAuthenticity,
    description: " The panel discussion on music, ‘AI, Authorship & Authenticity: Who’s Really Making The Music,’ touched upon the new challenges faced by musicians at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi. ",
    gallery: [
      MusicPanelDiscuss1,
      MusicPanelDiscuss2,
      MusicPanelDiscuss3,
      MusicPanelDiscuss4,
      MusicPanelDiscuss5,
      MusicPanelDiscuss6,
      MusicPanelDiscuss7,
      MusicPanelDiscuss8,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 24, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Ninth session start here
  {
    id: "Monica-and-a-tale-of-two-betrayed",
    title: "Monica and a Tale of Two Betrayed",
    poster: MonicaAndATaleOfTwoBetrayed,
    description: "The double bill of theatre plays ‘Monica’ & ‘A Tale Of Two Betrayals’, had the audience intrigued at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi. ",
    gallery: [
      MonicaAndATaleOfTwoBetrayals1,
      MonicaAndATaleOfTwoBetrayals2,
      MonicaAndATaleOfTwoBetrayals3,
      MonicaAndATaleOfTwoBetrayals4,
      MonicaAndATaleOfTwoBetrayals5,
      MonicaAndATaleOfTwoBetrayals6,
      MonicaAndATaleOfTwoBetrayals7,
      MonicaAndATaleOfTwoBetrayals8,
      MonicaAndATaleOfTwoBetrayals9,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 24, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Tenth session start here
  {
    id: "music-master-class",
    title: "Music masterclass",
    poster: MusicMasterclassPoster,
    description: "The music masterclass ‘The Independent Artist’s Journey: From Idea to Release’ gave young musicians a roadmap for independently creating music during SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi. ",
    gallery: [
      MusicMasterclass1,
      MusicMasterclass2,
      MusicMasterclass3,
      MusicMasterclass4,
      MusicMasterclass5,
      MusicMasterclass6,
      MusicMasterclass7,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 24, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Eleventh session start here
  {
    id: "fine-arts-panel-discussion",
    title: "Fine Arts Panel Discussion",
    poster: FineArtsDiscussionPoster,
    description: "Alumni Stars - History & Future: Our Success Stories put forward the journeys of the Fine Arts students from SOVAPA at the Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi.",
    gallery: [
      FineArtsPanelDiscussion1,
      FineArtsPanelDiscussion2,
      FineArtsPanelDiscussion3,
      FineArtsPanelDiscussion4,
      FineArtsPanelDiscussion5,
      FineArtsPanelDiscussion6,
      FineArtsPanelDiscussion7,
      FineArtsPanelDiscussion8,
      FineArtsPanelDiscussion9,
      FineArtsPanelDiscussion10,
      FineArtsPanelDiscussion11,
      FineArtsPanelDiscussion12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 24, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // twelve session start here
  {
    id: "bharatanatyam-dance-workshop",
    title: "Bharatanatyam Dance Workshop",
    poster: BharatanatyamDanceWorkshopPoster,
    description: "The Bharatnatyam Dance Workshop by Mani Chao at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi gave the participants a biginners look at one of the world’s most famous dance form.",
    gallery: [
      BharatanatyamDanceWorkshop1,
      BharatanatyamDanceWorkshop2,
      BharatanatyamDanceWorkshop3,
      BharatanatyamDanceWorkshop4,
      BharatanatyamDanceWorkshop5,
      BharatanatyamDanceWorkshop6,
      BharatanatyamDanceWorkshop7,
      BharatanatyamDanceWorkshop8,
      BharatanatyamDanceWorkshop9,
      BharatanatyamDanceWorkshop10,
      BharatanatyamDanceWorkshop11,
      BharatanatyamDanceWorkshop12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 24, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // thirteen session start here
  {
    id: "music-performance-folkwoke",
    title: "Music Performance: Folkwoke",
    poster: MusicPerformanceFolkwoke,
    description: "The Folkwoke Concert by SOVAPA Alumni's at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi.",
    gallery: [
      MusicPerformanceFolkwoke1,
      MusicPerformanceFolkwoke2,
      MusicPerformanceFolkwoke3,
      MusicPerformanceFolkwoke4,
      MusicPerformanceFolkwoke5,
      MusicPerformanceFolkwoke6,
      MusicPerformanceFolkwoke7,
      MusicPerformanceFolkwoke8,
      MusicPerformanceFolkwoke9,
      MusicPerformanceFolkwoke10,
      MusicPerformanceFolkwoke11,
      MusicPerformanceFolkwoke12,
      MusicPerformanceFolkwoke13,
      MusicPerformanceFolkwoke14,
      MusicPerformanceFolkwoke15,
      MusicPerformanceFolkwoke16,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 24, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourteen session start here
  {
    id: "classical-performance",
    title: "Classical Performance",
    poster: ClassicalPerformancePoster,
    description: "Classical performances by SOVAPA Alumni were held at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi. ",
    gallery: [
      ClassicalPerformance1,
      ClassicalPerformance2,
      ClassicalPerformance3,
      ClassicalPerformance4,
      ClassicalPerformance5,
      ClassicalPerformance6,
      ClassicalPerformance7,
      ClassicalPerformance8,
      ClassicalPerformance9,
      ClassicalPerformance10,
      ClassicalPerformance11,
      ClassicalPerformance12,
      ClassicalPerformance13,
      ClassicalPerformance14,
      ClassicalPerformance15,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 24, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fifteen session start here
  {
    id: "salgirah",
    title: "Theatre Play Salgirah",
    poster: SalgirahTheatrePlayPoster,
    description: "Audiences enjoyed the family drama depicted in Salgirah a theatre play showcased at SOVAPA's Arts Alumni Festival 2025 by Arts Council of Pakistan, Karachi.",
    gallery: [
      Salgirah1,
      Salgirah2,
      Salgirah3,
      Salgirah4,
      Salgirah5,
      Salgirah6,
      Salgirah7,
      Salgirah8,
      Salgirah9,
      Salgirah10,
      Salgirah11,
      Salgirah12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 24, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Sixteen session start here
  {
    id: "theatre-workshop",
    title: "Master the Power of Your Voice - Theatre Workshop",
    poster: TheatreWorkshopPoster,
    description: "At the theatre workshop Master The Power of Your Voice with Khalid Ahmed, audiences learned how to train their voice for various formats at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi.",
    gallery: [
      TheatreWorkshopPowerOfVoice1,
      TheatreWorkshopPowerOfVoice2,
      TheatreWorkshopPowerOfVoice3,
      TheatreWorkshopPowerOfVoice4,
      TheatreWorkshopPowerOfVoice5,
      TheatreWorkshopPowerOfVoice6,
      TheatreWorkshopPowerOfVoice7,
      TheatreWorkshopPowerOfVoice8,
      TheatreWorkshopPowerOfVoice9,
      TheatreWorkshopPowerOfVoice10,
      TheatreWorkshopPowerOfVoice11,
      TheatreWorkshopPowerOfVoice12,
      TheatreWorkshopPowerOfVoice13,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 25, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Seventeen session start here
  {
    id: "music-masterclass",
    title: "The Art of Sonic Storytelling - Music Masterclass",
    poster: MusicMasterclassSonicStoryTellingPoster,
    description: "The Art of Sonic Storytelling from Folkroots to Modern Sounds gave the audience a glimpse of how storytelling and music go hand in hand at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi.",
    gallery: [
      MusicMasterclassTheArtOfSonicStorytelling1,
      MusicMasterclassTheArtOfSonicStorytelling2,
      MusicMasterclassTheArtOfSonicStorytelling3,
      MusicMasterclassTheArtOfSonicStorytelling4,
      MusicMasterclassTheArtOfSonicStorytelling5,
      MusicMasterclassTheArtOfSonicStorytelling6,
      MusicMasterclassTheArtOfSonicStorytelling7,
      MusicMasterclassTheArtOfSonicStorytelling8,
      MusicMasterclassTheArtOfSonicStorytelling9,
      MusicMasterclassTheArtOfSonicStorytelling10,
      MusicMasterclassTheArtOfSonicStorytelling11,
      MusicMasterclassTheArtOfSonicStorytelling12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 25, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Eighteen session start here
  {
    id: "textile-communication-design-panel-discussion",
    title: "Textile & Communication Design Panel Discussion",
    poster: TextileAndCommunicationDesignPanelDiscussionPoster,
    description: "The Textile & Communication Design panel discussion Alumni Stars – History & Future: Our Success Stories made way for stories of SOVAPA graduates’ success at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi.",
    gallery: [
      TextileAndCommunicationDesignPanelDiscussion1,
      TextileAndCommunicationDesignPanelDiscussion2,
      TextileAndCommunicationDesignPanelDiscussion3,
      TextileAndCommunicationDesignPanelDiscussion4,
      TextileAndCommunicationDesignPanelDiscussion5,
      TextileAndCommunicationDesignPanelDiscussion6,
      TextileAndCommunicationDesignPanelDiscussion7,
      TextileAndCommunicationDesignPanelDiscussion8,
      TextileAndCommunicationDesignPanelDiscussion9,
      TextileAndCommunicationDesignPanelDiscussion10,
      TextileAndCommunicationDesignPanelDiscussion11,
      TextileAndCommunicationDesignPanelDiscussion12,
      TextileAndCommunicationDesignPanelDiscussion13,
      TextileAndCommunicationDesignPanelDiscussion14,
      TextileAndCommunicationDesignPanelDiscussion15,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 25, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Nineteen session start here
  {
    id: "theatre-play-glass-menagerie",
    title: "Theatre Play Glass Menagerie",
    poster: TheatrePlayGlassMenageriePoster,
    description: "The theatre play Glass Menagerie gave the audiences yet another family drama to enjoy at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi.",
    gallery: [
      TheatrePlayGlassMenagerie1,
      TheatrePlayGlassMenagerie2,
      TheatrePlayGlassMenagerie3,
      TheatrePlayGlassMenagerie4,
      TheatrePlayGlassMenagerie5,
      TheatrePlayGlassMenagerie6,
      TheatrePlayGlassMenagerie7,
      TheatrePlayGlassMenagerie8,
      TheatrePlayGlassMenagerie9,
      TheatrePlayGlassMenagerie10,
      TheatrePlayGlassMenagerie11,
      TheatrePlayGlassMenagerie12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 25, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty session start here
  {
    id: "theatre-performance-dastaan-goi",
    title: "Theatre Performance Dastaan Goi",
    poster: TheatrePlayDastaanGoiPoster,
    description: "Audiences enjoyed Dastan Goi and a dramatic telling of Tilism e Hoshruba: Mugarnis Jadu, Sikandar Jadu, Kuttay by Patras Bukhari at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi. ",
    gallery: [
      TheatrePlayDastaanGoi1,
      TheatrePlayDastaanGoi2,
      TheatrePlayDastaanGoi3,
      TheatrePlayDastaanGoi4,
      TheatrePlayDastaanGoi5,
      TheatrePlayDastaanGoi6,
      TheatrePlayDastaanGoi7,
      TheatrePlayDastaanGoi8,
      TheatrePlayDastaanGoi9,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 25, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty One session start here
  {
    id: "journey-of-dance",
    title: "Journey of Dance",
    poster: JourneyOfDancePoster,
    description: "The Journey of Dance took the audience through the evolution of the art form at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi.",
    gallery: [
      JourneyOfDance1,
      JourneyOfDance2,
      JourneyOfDance3,
      JourneyOfDance4,
      JourneyOfDance5,
      JourneyOfDance6,
      JourneyOfDance7,
      JourneyOfDance8,
      JourneyOfDance9,
      JourneyOfDance10,
      JourneyOfDance11,
      JourneyOfDance12,
      JourneyOfDance13,
      JourneyOfDance14,
      JourneyOfDance15,
      JourneyOfDance16,
      JourneyOfDance17,
      JourneyOfDance18,
      JourneyOfDance19,
      JourneyOfDance20,
      JourneyOfDance21,
      JourneyOfDance22,
      JourneyOfDance23,
      JourneyOfDance24,
      JourneyOfDance25,
      JourneyOfDance26,
      JourneyOfDance27,
      JourneyOfDance28,
      JourneyOfDance29,
      JourneyOfDance30,
      // JourneyOfDance31,
      // JourneyOfDance32,
      // JourneyOfDance33,
      // JourneyOfDance34,
      // JourneyOfDance35,
      JourneyOfDance36,
      JourneyOfDance37,
      JourneyOfDance38,
      JourneyOfDance39,
      JourneyOfDance40,
      JourneyOfDance41,
      JourneyOfDance42,
      JourneyOfDance43,
      JourneyOfDance44,
      JourneyOfDance45,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 25, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty Two session start here
  {
    id: "qawwali-fusion",
    title: "Qawwali Fusion by Jambroz & Friends",
    poster: QawwaliFusionPoster,
    description: "Audiences enjoyed Dastan Goi and a dramatic telling of Tilism e Hoshruba: Mugarnis Jadu, Sikandar Jadu, Kuttay by Patras Bukhari at SOVAPA’s Arts Alumni Festival 2025 by the Arts Council of Pakistan, Karachi. ",
    gallery: [
      QawwaliFusion1,
      QawwaliFusion2,
      QawwaliFusion3,
      QawwaliFusion4,
      QawwaliFusion5,
      QawwaliFusion6,
      QawwaliFusion7,
      QawwaliFusion8,
      QawwaliFusion9,
      QawwaliFusion10,
      QawwaliFusion11,
      QawwaliFusion12,
      QawwaliFusion13,
      QawwaliFusion14,
      QawwaliFusion15,
      QawwaliFusion16,
      QawwaliFusion17,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "May 25, 2025",
        location: "Arts Council Karachi",
      },
    ],
  },



];

Modal.setAppElement("#root");

function AlumniSessions() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [posterLoadError, setPosterLoadError] = useState({});

  const openModal = (event) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % selectedEvent.gallery.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + selectedEvent.gallery.length) %
        selectedEvent.gallery.length
    );
  };

  const handlePosterError = (eventId) => {
    setPosterLoadError((prev) => ({ ...prev, [eventId]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12 tracking-tight">
          Event Gallery
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
            >
              <div className="relative w-full h-full sm:h-full md:h-full lg:h-full overflow-hidden bg-gray-100">
                <img
                  src={posterLoadError[event.id] ? fallbackImage : event.poster}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => handlePosterError(event.id)}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold tracking-wide">
                    View Gallery
                  </span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                  {event.title}
                </h2>
                <div className="space-y-3 mb-4 flex-grow">
                  {event.sessions.map((session, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-[#B90602] pl-4 py-2 bg-gray-50 rounded-r-lg"
                    >
                      <div className="flex items-center text-sm text-gray-700">
                        <FiCalendar className="mr-2 min-w-[16px] text-[#B90602]" />
                        <span>
                          {session.date}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <FiMapPin className="mr-2 min-w-[16px] text-[#B90602]" />
                        <span>{session.location}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => openModal(event)}
                  className="mt-auto w-full bg-[#B90602] hover:bg-[#9a0500] text-white py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 text-base font-medium"
                >
                  View Gallery <FiArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Gallery"
        className="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto my-12 overflow-auto max-h-[90vh] transform transition-all duration-300"
        overlayClassName="modal-overlay fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      >
        {selectedEvent && (
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                {selectedEvent.title}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 text-2xl p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <FiX />
              </button>
            </div>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {selectedEvent.description}
            </p>

            <div className="relative mb-8">
              {selectedEvent.gallery[currentImageIndex] ? (
                <img
                  src={selectedEvent.gallery[currentImageIndex]}
                  alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-xl shadow-lg mx-auto transition-opacity duration-300"
                  onError={(e) => {
                    e.target.src = fallbackImage;
                    e.target.className =
                      "w-full h-64 object-cover rounded-xl shadow-lg mx-auto";
                  }}
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl">
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}

              {selectedEvent.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 p-3 rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-200"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 p-3 rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all duration-200"
                  >
                    <FiChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {selectedEvent.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentImageIndex
                          ? "bg-[#B90602] scale-125"
                          : "bg-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {selectedEvent.youtubeVideo && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center text-gray-900">
                  <FiPlay className="mr-2 text-[#B90602]" /> Highlights
                </h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={selectedEvent.youtubeVideo}
                    className="w-full h-64 md:h-80 rounded-xl shadow-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AlumniSessions;