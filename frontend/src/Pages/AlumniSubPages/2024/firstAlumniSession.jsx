import { useState } from "react";
import { FiCalendar, FiMapPin, FiArrowRight, FiPlay, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Modal from "react-modal";

import OpeningPoster from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/the-police-theatre-play-poster.jpg"
import OpeningOfExhibition from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/art-exhibition-poster.jpg"
import DrumCircle from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/drum-circle-poster.jpg"
// import DanceFlashMob from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/drum-circle-poster.jpg"
import OpenMicLivePainting from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/open-mic-poster.jpg";
import DancePerformance from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-poerformance-poster.jpg";
import MusicalPerformance from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-2024.jpg";
import MusicalEnsemble from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music-ensemble-2024-poster.jpg";
import DanceWorkshop from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-workshop-poster.jpg";
import Talk from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/alumni-talks-poster.jpg"
import DastanGoe from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/storytelling-poster.jpg"
import DanceAndMusic from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/performance-by-music-and-dance-poster.jpg"
import MusicalPerformanceLast from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music-ensemble-poster.jpg"
import Music from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-poster-2024.jpg"

// The Police Tehatre Play
// import OpeningCeremony1 from "/src/assets/ArtsAlumniAssets/opening-ceremony/1.jpg"
// import OpeningCeremony2 from "/src/assets/ArtsAlumniAssets/opening-ceremony/3.jpg"
// import OpeningCeremony3 from "/src/assets/ArtsAlumniAssets/opening-ceremony/4.jpg"
// import OpeningCeremony4 from "/src/assets/ArtsAlumniAssets/opening-ceremony/5.jpg"
// import OpeningCeremony5 from "/src/assets/ArtsAlumniAssets/opening-ceremony/6.jpg"
// import OpeningCeremony6 from "/src/assets/ArtsAlumniAssets/opening-ceremony/7.jpg"
// import OpeningCeremony7 from "/src/assets/ArtsAlumniAssets/opening-ceremony/2.jpg"
// import OpeningCeremony8 from "/src/assets/ArtsAlumniAssets/opening-ceremony/8.jpg"

// Art Exhbition Opening
import ArtsExhbitionOpening1 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/arts-exhibition-opening/1.jpg"
import ArtsExhbitionOpening2 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/arts-exhibition-opening/2.jpg"
import ArtsExhbitionOpening3 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/arts-exhibition-opening/3.jpg"
import ArtsExhbitionOpening4 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/arts-exhibition-opening/4.jpg"
import ArtsExhbitionOpening5 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/arts-exhibition-opening/5.jpg"
import ArtsExhbitionOpening6 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/arts-exhibition-opening/6.jpg"
import ArtsExhbitionOpening7 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/arts-exhibition-opening/7.jpg"
import ArtsExhbitionOpening8 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/arts-exhibition-opening/8.jpg"

// Drum Circle
import DrumCircle1 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/drum-circle/1.jpg"
import DrumCircle2 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/drum-circle/2.jpg"

// Flash Mob


// Open Mic and Live Painting
import OpenMicLivePainting1 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/open-mic-and-live-painting/1.jpg"
import OpenMicLivePainting2 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/open-mic-and-live-painting/2.jpg"
import OpenMicLivePainting3 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/open-mic-and-live-painting/3.jpg"
import OpenMicLivePainting4 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/open-mic-and-live-painting/4.jpg"
import OpenMicLivePainting5 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/open-mic-and-live-painting/5.jpg"

// Dance Performance
import DancePerformance1 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/1.jpg"
import DancePerformance2 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/2.jpg"
import DancePerformance3 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/3.jpg"
import DancePerformance4 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/4.jpg"
import DancePerformance5 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/5.jpg"
import DancePerformance6 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/6.jpg"
import DancePerformance7 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/7.jpg"
import DancePerformance8 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/8.jpg"
import DancePerformance9 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/9.jpg"
import DancePerformance10 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/10.jpg"
import DancePerformance11 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/11.jpg"
import DancePerformance12 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/12.jpg"
import DancePerformance13 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/13.jpg"
import DancePerformance14 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-performance/14.jpg"

// Musical Performance Day 2
import MusicalPerformance1 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/1.jpg"
import MusicalPerformance2 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/2.jpg"
import MusicalPerformance3 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/3.jpg"
import MusicalPerformance4 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/4.jpg"
import MusicalPerformance5 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/5.jpg"
import MusicalPerformance6 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/6.jpg"
import MusicalPerformance7 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/7.jpg"
import MusicalPerformance8 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/8.jpg"
import MusicalPerformance9 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/9.jpg"
import MusicalPerformance10 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/10.jpg"
import MusicalPerformance11 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/11.jpg"
import MusicalPerformance12 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/12.jpg"
import MusicalPerformance13 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/13.jpg"
import MusicalPerformance14 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/14.jpg"
import MusicalPerformance15 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/15.jpg"
import MusicalPerformance16 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/16.jpg"
import MusicalPerformance17 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/17.jpg"
import MusicalPerformance18 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-day-2/18.jpg"

// Music Ensemble
import MusicEnsemble1 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music-ensemble/1.jpg"
import MusicEnsemble2 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music-ensemble/2.jpg"
import MusicEnsemble3 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music-ensemble/3.jpg"
import MusicEnsemble4 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music-ensemble/4.jpg"
import MusicEnsemble5 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music-ensemble/5.jpg"
import MusicEnsemble6 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music-ensemble/6.jpg"
import MusicEnsemble7 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music-ensemble/7.jpg"
import MusicEnsemble8 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music-ensemble/8.jpg"
import MusicEnsemble9 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music-ensemble/9.jpg"

// Dance Workshop
import DanceWorkshop1 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-workshop/1.jpg"
import DanceWorkshop2 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-workshop/2.jpg"
import DanceWorkshop3 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-workshop/3.jpg"
import DanceWorkshop4 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-workshop/4.jpg"
import DanceWorkshop5 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-workshop/5.jpg"
import DanceWorkshop6 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-workshop/6.jpg"
import DanceWorkshop7 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-workshop/7.jpg"
import DanceWorkshop8 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-workshop/8.jpg"

// Alumni Talks
import ALumniTalks1 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/talks/1.jpg"
import ALumniTalks2 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/talks/2.jpg"
import ALumniTalks3 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/talks/3.jpg"
import ALumniTalks4 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/talks/4.jpg"
import ALumniTalks5 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/talks/5.jpg"
import ALumniTalks6 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/talks/6.jpg"
import ALumniTalks7 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/talks/7.jpg"
import ALumniTalks8 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/talks/8.jpg"
import ALumniTalks9 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/talks/9.jpg"
import ALumniTalks10 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/talks/10.jpg"
import ALumniTalks11 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/talks/11.jpg"

// Ancient Story Telling
import DastanGoe1 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dastan-goe/1.jpg"
import DastanGoe2 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dastan-goe/2.jpg"
import DastanGoe3 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dastan-goe/3.jpg"
import DastanGoe4 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dastan-goe/4.jpg"
import DastanGoe5 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dastan-goe/5.jpg"

import DanceAndMusic1 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-and-music/1.jpg"
import DanceAndMusic2 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-and-music/2.jpg"
import DanceAndMusic3 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-and-music/3.jpg"
import DanceAndMusic4 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-and-music/4.jpg"
import DanceAndMusic5 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-and-music/5.jpg"
import DanceAndMusic6 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-and-music/6.jpg"
import DanceAndMusic7 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-and-music/7.jpg"
import DanceAndMusic8 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-and-music/8.jpg"
import DanceAndMusic9 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-and-music/9.jpg"
import DanceAndMusic10 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-and-music/10.jpg"
import DanceAndMusic11 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/dance-and-music/11.jpg"

// Music
import Music1 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/1.jpg"
import Music2 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/2.jpg"
import Music3 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/3.jpg"
import Music4 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/4.jpg"
import Music5 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/5.jpg"
import Music6 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/6.jpg"
import Music7 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/7.jpg"
import Music8 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/8.jpg"
import Music9 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/9.jpg"
import Music10 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/10.jpg"
import Music11 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/11.jpg"
import Music12 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/12.jpg"
import Music13 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/13.jpg"
import Music14 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/14.jpg"
import Music15 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/15.jpg"
import Music16 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/16.jpg"
import Music17 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/17.jpg"
import Music18 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/18.jpg"
import Music19 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/music/19.jpg"


// Musical Performance Last
import MusicalPerformanceLast1 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/1.jpg"
import MusicalPerformanceLast2 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/2.jpg"
import MusicalPerformanceLast3 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/3.jpg"
import MusicalPerformanceLast4 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/4.jpg"
import MusicalPerformanceLast5 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/5.jpg"
import MusicalPerformanceLast6 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/6.jpg"
import MusicalPerformanceLast7 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/7.jpg"
import MusicalPerformanceLast8 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/8.jpg"
import MusicalPerformanceLast9 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/9.jpg"
import MusicalPerformanceLast10 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/10.jpg"
import MusicalPerformanceLast11 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/11.jpg"
import MusicalPerformanceLast12 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/12.jpg"
import MusicalPerformanceLast13 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/13.jpg"
import MusicalPerformanceLast14 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/14.jpg"
import MusicalPerformanceLast15 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/15.jpg"
import MusicalPerformanceLast16 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/16.jpg"
import MusicalPerformanceLast17 from "/src/assets/ArtsAlumniAssets/alumni-festival-assets-2024/musical-performance-last/17.jpg"





const events = [
  // first session start here
  {
    id: "the-police-theatre-play",
    title: "The Police Theatre Play",
    poster: OpeningPoster,
    description:
      "The event was opened by Syed Asif Hyder Shah, Chief Secretary Sindh along with President ACP Mohammad Ahmed Shah",
    gallery: [
      // OpeningCeremony1,
      // OpeningCeremony2,
      // OpeningCeremony3,
      // OpeningCeremony4,
      // OpeningCeremony5,
      // OpeningCeremony6,
      // OpeningCeremony7,
      // OpeningCeremony8,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 26, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },
  {
    id: "opening-of-exhibition",
    title: "Opening of Exhibition",
    poster: OpeningOfExhibition,
    description:
      "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
    gallery: [
      ArtsExhbitionOpening1,
      ArtsExhbitionOpening2,
      ArtsExhbitionOpening3,
      ArtsExhbitionOpening4,
      ArtsExhbitionOpening5,
      ArtsExhbitionOpening6,
      ArtsExhbitionOpening7,
      ArtsExhbitionOpening8,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 27 & 28, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },
  {
    id: "drum-circle",
    title: "Drum Circle",
    poster: DrumCircle,
    description:
      "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
    gallery: [
      DrumCircle1,
      DrumCircle2,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 27, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },
  // {
  //   id: "dance-flash-mob",
  //   title: "Dance Flash Mob",
  //   poster: DanceFlashMob,
  //   description:
  //     "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
  //   gallery: [
  //     // DrumCircle1,
  //     // DrumCircle2,
  //   ],
  //   // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
  //   sessions: [
  //     {
  //       date: "Jan 27, 2024",
  //       location: "Arts Council Karachi",
  //     },
  //   ],
  // },
  {
    id: "open-mic-and-live-painting",
    title: "Open Mic and Live Painting",
    poster: OpenMicLivePainting,
    description:
      "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
    gallery: [
      OpenMicLivePainting1,
      OpenMicLivePainting2,
      OpenMicLivePainting3,
      OpenMicLivePainting4,
      OpenMicLivePainting5
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 27, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  {
    id: "dance-performance",
    title: "Dance Performance",
    poster: DancePerformance,
    description:
      "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
    gallery: [
      DancePerformance1,
      DancePerformance2,
      DancePerformance3,
      DancePerformance4,
      DancePerformance5,
      DancePerformance6,
      DancePerformance7,
      DancePerformance8,
      DancePerformance9,
      DancePerformance10,
      DancePerformance11,
      DancePerformance12,
      DancePerformance13,
      DancePerformance14,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 27, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  {
    id: "musical-performance",
    title: "Musical Performance",
    poster: MusicalPerformance,
    description:
      "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
    gallery: [
      MusicalPerformance1,
      MusicalPerformance2,
      MusicalPerformance3,
      MusicalPerformance4,
      MusicalPerformance5,
      MusicalPerformance6,
      MusicalPerformance7,
      MusicalPerformance8,
      MusicalPerformance9,
      MusicalPerformance10,
      MusicalPerformance11,
      MusicalPerformance12,
      MusicalPerformance13,
      MusicalPerformance14,
      MusicalPerformance15,
      MusicalPerformance16,
      MusicalPerformance17,
      MusicalPerformance18,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 27, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  {
    id: "music-ensemble",
    title: "Music Ensemble",
    poster: MusicalEnsemble,
    description:
      "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
    gallery: [
      MusicEnsemble1,
      MusicEnsemble2,
      MusicEnsemble3,
      MusicEnsemble4,
      MusicEnsemble5,
      MusicEnsemble6,
      MusicEnsemble7,
      MusicEnsemble8,
      MusicEnsemble9,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 27, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  {
    id: "dance-workshop",
    title: "Open Mic and Live Painting",
    poster: DanceWorkshop,
    description:
      "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
    gallery: [
      DanceWorkshop1,
      DanceWorkshop2,
      DanceWorkshop3,
      DanceWorkshop4,
      DanceWorkshop5,
      DanceWorkshop6,
      DanceWorkshop7,
      DanceWorkshop8,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 28, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  {
    id: "talk",
    title: "Alumni Talks",
    poster: Talk,
    description:
      "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
    gallery: [
      ALumniTalks1,
      ALumniTalks2,
      ALumniTalks3,
      ALumniTalks11,
      ALumniTalks4,
      ALumniTalks5,
      ALumniTalks6,
      ALumniTalks7,
      ALumniTalks8,
      ALumniTalks9,
      ALumniTalks10,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 28, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },
  {
    id: "ancient-storytelling",
    title: "Ancient Storytelling - Dastan Goe",
    poster: DastanGoe,
    description:
      "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
    gallery: [
      DastanGoe1,
      DastanGoe2,
      DastanGoe3,
      DastanGoe4,
      DastanGoe5,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 28, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  {
    id: "dance-and-music-combined-performance",
    title: "Dance and Music Performance",
    poster: DanceAndMusic,
    description:
      "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
    gallery: [
      DanceAndMusic1,
      DanceAndMusic2,
      DanceAndMusic3,
      DanceAndMusic4,
      DanceAndMusic5,
      DanceAndMusic6,
      DanceAndMusic7,
      DanceAndMusic8,
      DanceAndMusic9,
      DanceAndMusic10,
      DanceAndMusic11,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 28, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  {
    id: "music",
    title: "Musical Performance",
    poster: Music,
    description:
      "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
    gallery: [
      Music2,
      Music3,
      Music4,
      Music5,
      Music1,
      Music6,
      Music7,
      Music8,
      Music9,
      Music10,
      Music11,
      Music12,
      Music13,
      Music14,
      Music15,
      Music16,
      Music17,
      Music18,
      Music19,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 28, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  {
    id: "musical-performance-day-2",
    title: "Musical Performance",
    poster: MusicalPerformanceLast,
    description:
      "The 1st Alumni Festival 2024 of ACP Academies has kicked off with the opening of an exhibition of artwork put up by ACIAC Alumni. The exhibition was inaugurated by Anwar Maqsood with President Mohammad Ahmed Shah by his side.",
    gallery: [
      MusicalPerformanceLast1,
      MusicalPerformanceLast2,
      MusicalPerformanceLast3,
      MusicalPerformanceLast4,
      MusicalPerformanceLast5,
      MusicalPerformanceLast6,
      MusicalPerformanceLast7,
      MusicalPerformanceLast8,
      MusicalPerformanceLast9,
      MusicalPerformanceLast10,
      MusicalPerformanceLast11,
      MusicalPerformanceLast12,
      MusicalPerformanceLast13,
      MusicalPerformanceLast14,
      MusicalPerformanceLast15,
      MusicalPerformanceLast16,
      MusicalPerformanceLast17,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "Jan 28, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },


]

Modal.setAppElement("#root");

function FirstAlumniSession() {
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
        <h1 className="text-2xl md:text-3xl  font-bold text-center text-gray-900 mb-12 tracking-tight">
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

export default FirstAlumniSession;
