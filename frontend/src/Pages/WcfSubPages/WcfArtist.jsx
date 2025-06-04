// import { useState, useEffect } from "react";
// import artist1 from "/src/assets/wcf-assets/wcf-artists/aashir-wajat-artist.jpg";
// import artist2 from "/src/assets/wcf-assets/wcf-artists/abdul-hannan.jpg";
// import artist3 from "/src/assets/wcf-assets/wcf-artists/abdur-rahman-sajid.jpg";
// import artist4 from "/src/assets/wcf-assets/wcf-artists/ACMA2-artist.jpg";
// import artist5 from "/src/assets/wcf-assets/wcf-artists/adnan-butt.jpg";
// import artist6 from "/src/assets/wcf-assets/wcf-artists/akhtar-chanal-zahri.jpg";
// import artist7 from "/src/assets/wcf-assets/wcf-artists/circle-mirror-main-alex-Liu.jpg";
// import artist8 from "/src/assets/wcf-assets/wcf-artists/ali-mohammad-roonjho-and-sattar-jogi.jpg";
// import artist9 from "/src/assets/wcf-assets/wcf-artists/bashir-khan.jpg";
// import artist10 from "/src/assets/wcf-assets/wcf-artists/bayaan.jpg";
// import artist11 from "/src/assets/wcf-assets/wcf-artists/bhawani-karki-nepal.jpg";
// import artist12 from "/src/assets/wcf-assets/wcf-artists/circle-mirror-main-chris-kelly.jpg";
// import artist13 from "/src/assets/wcf-assets/wcf-artists/cosmic-fluid.jpg";
// import artist14 from "/src/assets/wcf-assets/wcf-artists/daniele-fabio-italy.jpg";
// import artist15 from "/src/assets/wcf-assets/wcf-artists/daryl-giuliano-canada.jpg";
// import artist16 from "/src/assets/wcf-assets/wcf-artists/delah-dube-rwanda.jpg";
// import artist17 from "/src/assets/wcf-assets/wcf-artists/dominika-uk.jpeg";
// import artist18 from "/src/assets/wcf-assets/wcf-artists/circle-mirror-main-errica-lauren.jpg";
// import artist19 from "/src/assets/wcf-assets/wcf-artists/faraz-anwar.jpg";
// import artist20 from "/src/assets/wcf-assets/wcf-artists/gasasira-rugamba-serge-rwanda.jpg";
// import artist21 from "/src/assets/wcf-assets/wcf-artists/gizri.jpg";
// import artist22 from "/src/assets/wcf-assets/wcf-artists/hamza-akram-qawwal.jpeg";
// import artist23 from "/src/assets/wcf-assets/wcf-artists/circle-mirror-main-hanna-dibella.jpg";
// import artist24 from "/src/assets/wcf-assets/wcf-artists/imran-momina-aaka-emu.jpg";
// import artist25 from "/src/assets/wcf-assets/wcf-artists/jambroz.jpeg";
// import artist26 from "/src/assets/wcf-assets/wcf-artists/jazz-art-south-africa.jpg";
// import artist27 from "/src/assets/wcf-assets/wcf-artists/jihadi-urban-song-rwanda.jpg";
// import artist28 from "/src/assets/wcf-assets/wcf-artists/kamaliya-ukraine.jpg";
// import artist29 from "/src/assets/wcf-assets/wcf-artists/kamran-karimov-azerbaijan.jpg";
// import artist30 from "/src/assets/wcf-assets/wcf-artists/khumariyaan.jpg";
// import artist31 from "/src/assets/wcf-assets/wcf-artists/lee-dia-rwanda.jpg";
// import artist32 from "/src/assets/wcf-assets/wcf-artists/luise-volkmann-germany.jpg";
// import artist33 from "/src/assets/wcf-assets/wcf-artists/maanu.jpg";
// import artist34 from "/src/assets/wcf-assets/wcf-artists/madan-gopal-nepal.jpg";
// import artist35 from "/src/assets/wcf-assets/wcf-artists/mai-dhai.jpg";
// import artist36 from "/src/assets/wcf-assets/wcf-artists/max-andrzejewski-germany.jpg";
// import artist37 from "/src/assets/wcf-assets/wcf-artists/muneeb-khan.jpeg";
// import artist38 from "/src/assets/wcf-assets/wcf-artists/mustafa-baloch.jpg";
// import artist39 from "/src/assets/wcf-assets/wcf-artists/nafees-ahmed-khan.jpg";
// import artist40 from "/src/assets/wcf-assets/wcf-artists/natalia-gul.jpg";
// import artist41 from "/src/assets/wcf-assets/wcf-artists/natasha-baig.jpg";
// import artist42 from "/src/assets/wcf-assets/wcf-artists/noman-ali-sheikh.jpeg";
// import artist43 from "/src/assets/wcf-assets/wcf-artists/paul-jarret-germany.jpg";
// import artist44 from "/src/assets/wcf-assets/wcf-artists/peace-jolis-rwanda.jpg";
// import artist45 from "/src/assets/wcf-assets/wcf-artists/sahib-pashazade-azerbaijan.jpg";
// import artist46 from "/src/assets/wcf-assets/wcf-artists/samra-khan.jpeg";
// import artist47 from "/src/assets/wcf-assets/wcf-artists/circle-mirror-main-sarah-dillamore-spain.jpg";
// import artist48 from "/src/assets/wcf-assets/wcf-artists/schumaila-hussain.jpeg";
// import artist49 from "/src/assets/wcf-assets/wcf-artists/shahzeb-ali.jpg";
// import artist50 from "/src/assets/wcf-assets/wcf-artists/sikandar-and-raina.jpg";
// import artist51 from "/src/assets/wcf-assets/wcf-artists/sounds-of-kolachi.jpg";
// import artist52 from "/src/assets/wcf-assets/wcf-artists/street-dancers-congo.jpg";
// import artist53 from "/src/assets/wcf-assets/wcf-artists/sultan-baloch.jpeg";
// import artist54 from "/src/assets/wcf-assets/wcf-artists/veronica-belarus.jpg";
// import artist55 from "/src/assets/wcf-assets/wcf-artists/wahab-bugti.jpg";


// const WcfArtists = () => {
//   const artists = [
//     { id: 1, name: "Aashir Wajahat", image: artist1, country: "Pakistan" },
//     { id: 2, name: "Abdul Hannan", image: artist2, country: "Pakistan" },
//     { id: 3, name: "Abdur Rahman Sajid", image: artist3, country: "Pakistan" },
//     { id: 4, name: "Acma The Band", image: artist4, country: "Pakistan" },
//     { id: 5, name: "Adnan Butt", image: artist5, country: "Pakistan" },
//     { id: 6, name: "Akhtar Chanal Zahri", image: artist6, country: "Pakistan" },
//     { id: 7, name: "Alex Liu", image: artist7, country: "Spain" },
//     { id: 8, name: "Ali Mohammad Roonjho & Sattar Jogi", image: artist8, country: "Pakistan" },
//     { id: 9, name: "Bashir Khan", image: artist9, country: "Pakistan" },
//     { id: 10, name: "Bayaan", image: artist10, country: "Pakistan" },
//     { id: 11, name: "Bhawani Karki", image: artist11, country: "Nepal" },
//     { id: 12, name: "Chris Kelly", image: artist12, country: "Spain" },
//     { id: 13, name: "Cosmic Fluid", image: artist13, country: "Pakistan" },
//     { id: 14, name: "Daniele Fabio", image: artist14, country: "Italy" },
//     { id: 15, name: "Daryl Giullano", image: artist15, country: "Canada" },
//     { id: 16, name: "Delah Dube", image: artist16, country: "Rwanda" },
//     { id: 17, name: "Dominike", image: artist17, country: "UK" },
//     { id: 18, name: "Erica Lauren", image: artist18, country: "Spain" },
//     { id: 19, name: "Faraz Anwar", image: artist19, country: "Pakistan" },
//     { id: 20, name: "Gasasira Rugamba Serge", image: artist20, country: "Rwanda" },
//     { id: 21, name: "Gizri", image: artist21, country: "Pakistan" },
//     { id: 22, name: "Hamza Akram Qawwal", image: artist22, country: "Pakistan" },
//     { id: 23, name: "Hanna DiBella", image: artist23, country: "Spain" },
//     { id: 24, name: "Imran Momina Aaka emu", image: artist24, country: "Pakistan" },
//     { id: 25, name: "Jambroz", image: artist25, country: "South Africa" },
//     { id: 26, name: "Jazz Art", image: artist26, country: "South Africa" },
//     { id: 27, name: "Jihadi", image: artist27, country: "Rwanda" },
//     { id: 28, name: "Kamaliya", image: artist28, country: "Ukraine" },
//     { id: 29, name: "Kamran Karimov", image: artist29, country: "Azerbaijan" },
//     { id: 30, name: "Khumariyaan", image: artist30, country: "Pakistan" },
//     { id: 31, name: "Lee Dia", image: artist31, country: "Rwanda" },
//     { id: 32, name: "Luise Volkmann", image: artist32, country: "Germany" },
//     { id: 33, name: "Maanu", image: artist33, country: "Pakistan" },
//     { id: 34, name: "Madan Gopal", image: artist34, country: "Nepal" },
//     { id: 35, name: "Mai Dhai", image: artist35, country: "Pakistan" },
//     { id: 36, name: "Max Andrzejewski", image: artist36, country: "Germany" },
//     { id: 37, name: "Muneeb Khan", image: artist37, country: "Pakistan" },
//     { id: 38, name: "Mustafa Baloch", image: artist38, country: "Pakistan" },
//     { id: 39, name: "Nafees Ahmed Khan", image: artist39, country: "Pakistan" },
//     { id: 40, name: "Natalia Gul", image: artist40, country: "Belarus" },
//     { id: 41, name: "Natasha Baig", image: artist41, country: "Pakistan" },
//     { id: 42, name: "Noman Ali Sheikh", image: artist42, country: "Pakistan" },
//     { id: 43, name: "Paul Jarret", image: artist43, country: "Germany" },
//     { id: 44, name: "Peace Jolis", image: artist44, country: "Rwanda" },
//     { id: 45, name: "Sahib Pashazade", image: artist45, country: "Azerbaijan" },
//     { id: 46, name: "Samra Khan", image: artist46, country: "Pakistan" },
//     { id: 47, name: "Sarah Dillamore", image: artist47, country: "Spain" },
//     { id: 48, name: "Schumaila Hussain", image: artist48, country: "Pakistan" },
//     { id: 49, name: "Shahzeb Ali", image: artist49, country: "Pakistan" },
//     { id: 50, name: "Sikandar & Raina", image: artist50, country: "Pakistan" },
//     { id: 51, name: "Sounds of Kolachi", image: artist51, country: "Pakistan" },
//     { id: 52, name: "Street Dancers", image: artist52, country: "Congo" },
//     { id: 53, name: "Sultan Baloch", image: artist53, country: "Pakistan" },
//     { id: 54, name: "Veronica Belarus", image: artist54, country: "Belarus" },
//     { id: 55, name: "Wahab Bugti", image: artist55, country: "Pakistan" },
//   ];

//   // State management
//   const [visibleCards, setVisibleCards] = useState(12);
//   const [showAll, setShowAll] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter artists based on search
//   const filteredArtists = artists.filter(artist =>
//     artist.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Calculate initial cards based on screen size
//   useEffect(() => {
//     const calculateInitialCards = () => {
//       const width = window.innerWidth;
//       if (width >= 1280) return 12;
//       if (width >= 1024) return 9;
//       if (width >= 768) return 8;
//       return 6;
//     };

//     const handleResize = () => {
//       if (!showAll) {
//         setVisibleCards(calculateInitialCards());
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [showAll]);

//   // Handle see more/less
//   const handleSeeMore = () => {
//     setVisibleCards(filteredArtists.length);
//     setShowAll(true);
//   };

//   const handleSeeLess = () => {
//     const width = window.innerWidth;
//     if (width >= 1280) setVisibleCards(12);
//     else if (width >= 1024) setVisibleCards(9);
//     else if (width >= 768) setVisibleCards(8);
//     else setVisibleCards(6);
//     setShowAll(false);
//   };

//   // Displayed cards
//   const displayedArtists = filteredArtists.slice(0, visibleCards);
//   const hasMoreCards = visibleCards < filteredArtists.length;

//   return (
//     <div className="bg-white py-6 px-6 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header (unchanged) */}
//         <div className="text-center mb-12">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             Artists
//           </h1>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Discover talented artists from around the world
//           </p>
//         </div>

//         {/* Search (unchanged) */}
//         <div className="mb-8 flex justify-center">
//           <div className="relative w-full max-w-md">
//             <input
//               type="text"
//               placeholder="Search artists..."
//               className="w-full px-5 py-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm transition-all"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <svg
//               className="absolute right-4 top-3.5 h-5 w-5 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Artists Grid with enhanced hover effect */}
//         {filteredArtists.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {displayedArtists.map((artist) => (
//                 <div
//                   key={artist.id}
//                   className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
//                 >
//                   <div className="relative">
//                     <img
//                       src={artist.image}
//                       alt={artist.name}
//                       className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
//                     />

//                     {/* Gradient overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>

//                     {/* Artist info - appears on hover with animation */}
//                     <div className="absolute inset-0 flex flex-col justify-end p-10 text-white transform transition-all duration-500 group-hover:translate-y-0 translate-y-8">
//                       <div className="transform transition-all duration-300 group-hover:opacity-100 opacity-0 group-hover:delay-100">
//                         <svg
//                           className="w-8 h-8 mb-2 text-red-500"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
//                         </svg>
//                       </div>

//                       <h3 className="text-xl font-bold mb-1 transform transition-all duration-300 group-hover:translate-x-0 -translate-x-4 group-hover:delay-150">
//                         {artist.name}
//                       </h3>

//                       <div className="flex items-center transform transition-all duration-300 group-hover:translate-x-0 -translate-x-4 group-hover:delay-200">
//                         <svg
//                           className="w-4 h-4 mr-1 text-red-400"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                         </svg>
//                         <p className="text-sm text-gray-200">{artist.country}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* See More/Less Buttons (unchanged) */}
//             <div className="text-center mt-12">
//               {hasMoreCards && (
//                 <button
//                   onClick={handleSeeMore}
//                   className="px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md"
//                 >
//                   Load More Artists
//                 </button>
//               )}
//               {showAll && (
//                 <button
//                   onClick={handleSeeLess}
//                   className="ml-4 px-8 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300 shadow-md"
//                 >
//                   Show Less
//                 </button>
//               )}
//             </div>
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-xl text-gray-600">No artists found matching your search</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WcfArtists;