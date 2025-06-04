// src/components/wcfSubComponents/ArtistDetail.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiArrowRight, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ArtistDetail({ artist }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('performances');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [posterLoadError, setPosterLoadError] = useState(false);

  const openModal = (performance) => {
    setSelectedPerformance(performance);
    setCurrentImageIndex(0);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPerformance(null);
  };

  const nextImage = () => {
    setCurrentImageIndex(prev =>
      (prev + 1) % selectedPerformance.gallery.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev =>
      (prev - 1 + selectedPerformance.gallery.length) % selectedPerformance.gallery.length
    );
  };

  const handlePosterError = () => {
    setPosterLoadError(true);
  };


  if (!artist) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Artist Not Found</h2>
        <p className="text-gray-600 mb-6">The artist you're looking for doesn't exist or may have been removed.</p>
        {/* <button
          onClick={() => navigate('/festival/wcf/artists')}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Back to Artists
        </button> */}
      </div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      {/* Artist Header Section */}
      <div className="relative overflow-hidden rounded-2xl mb-8 h-64 md:h-80 bg-gradient-to-r from-purple-900 to-indigo-800">
        <img
          src={artist.image}
          alt={artist.name}
          className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay"
        />
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-xl">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg">{artist.name}</h2>
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-4">
                {artist.genre}
              </span>
              <div className="flex gap-3">
                <button className="flex items-center px-4 py-2 bg-white hover:bg-gray-100 text-purple-800 rounded-lg transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Follow
                </button>
                <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bio Section */}
        <div className="mb-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About</h3>
            <p className="text-gray-700 leading-relaxed">{artist.bio}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {['performances', 'workshops', 'videos'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {/* Performances Tab */}
          {activeTab === 'performances' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {artist.performances.map((performance, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1">
                  <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                    <img
                      src={posterLoadError ? WaitingForTrain : (performance.gallery?.[0])}
                      alt={performance.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={handlePosterError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold tracking-wide">
                        View Gallery
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                      {performance.title}
                    </h2>
                    <div className="space-y-3 mb-4 flex-grow">
                      <div className="border-l-4 border-[#B90602] pl-4 py-2 bg-gray-50 rounded-r-lg">
                        <div className="flex items-center text-sm text-gray-700">
                          <FiCalendar className="mr-2 min-w-[16px] text-[#B90602]" />
                          <span>
                            {new Date(performance.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <FiMapPin className="mr-2 min-w-[16px] text-[#B90602]" />
                          <span>{performance.location}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openModal(performance)}
                      className="mt-auto w-full bg-[#B90602] hover:bg-[#9a0500] text-white py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 text-base font-medium"
                    >
                      View Gallery <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}



          {/* Workshops Tab */}
          {activeTab === 'workshops' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artist.workshops.map((workshop, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">{workshop.title}</h4>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {new Date(workshop.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <button className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artist.videos.map((video, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-w-16 aspect-h-9">
                    <iframe
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-64 md:h-80"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-gray-900">{video.title}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${video.type === 'performance'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-indigo-100 text-indigo-800'
                        }`}>
                        {video.type === 'performance' ? 'Performance' : 'Interview'}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Performance Gallery"
        className="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto my-12 overflow-auto max-h-[90vh] transform transition-all duration-300"
        overlayClassName="modal-overlay fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      >
        {selectedPerformance && (
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                {selectedPerformance.title}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 text-2xl p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <FiX />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-700 mb-2">
                <FiCalendar className="mr-2 min-w-[16px] text-[#B90602]" />
                <span>
                  {new Date(selectedPerformance.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <FiMapPin className="mr-2 min-w-[16px] text-[#B90602]" />
                <span>{selectedPerformance.location}</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {artist.bio}
            </p>

            <div className="relative mb-8">
              {selectedPerformance.gallery?.[currentImageIndex] ? (
                <img
                  src={selectedPerformance.gallery[currentImageIndex]}
                  alt={`${selectedPerformance.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-xl shadow-lg mx-auto transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl">
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}

              {selectedPerformance.gallery?.length > 1 && (
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
                    {selectedPerformance.gallery.map((_, index) => (
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
          </div>
        )}
      </Modal>
    </div>

  );
}