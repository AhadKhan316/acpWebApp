// src/Pages/WcfSubPages/WcfArtistPage.jsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import ArtistCard from '../../../components/wcfSubComponents/WcfArtistCard'
import ArtistDetail from '../../../components/wcfSubComponents/WcfArtistDetail'

import WcfProfile1 from "/src/assets/wcf-assets/wcf-artists-profile/1.jpg"

import WaitingForTrain from "/src/assets/wcf-assets/wcf-upcomingShows/Waiting-for-train.jpg";

import WaitingForTrain1 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/1.webp"
import WaitingForTrain2 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/2.webp"
import WaitingForTrain3 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/3.webp"
import WaitingForTrain4 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/4.webp"
import WaitingForTrain5 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/5.webp"
import WaitingForTrain6 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/6.webp"
import WaitingForTrain7 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/7.webp"
import WaitingForTrain8 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/8.webp"
import WaitingForTrain9 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/9.webp"
import WaitingForTrain10 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/10.webp"
import WaitingForTrain11 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/11.webp"
import WaitingForTrain12 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/12.webp"
import WaitingForTrain13 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/13.webp"
import WaitingForTrain14 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/14.webp"
import WaitingForTrain15 from "/src/assets/wcf-assets/wcf-upcomingShows/waiting-for-train/15.webp"


const WcfArtists = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState(artistId ? 'detail' : 'grid')



  // Sample data - replace with your actual data source
  const artists = [
    {
      id: 1,
      name: "Art Per Art",
      genre: "Kosovo",
      image: WcfProfile1,
      performances: [
        { title: "Waiting for Train - Tragicomedy", date: "2024-09-29", location: "Arts Council Karachi" },
        // { title: "Neon Nights Tour", date: "2023-09-22", location: "Los Angeles, CA" }
      ],
      workshops: [
        { title: "Electronic Music Production", date: "2023-08-10" },
        { title: "DJ Techniques Masterclass", date: "2023-10-05" }
      ],
      videos: [
        { title: "Sunset Festival Performance", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "performance" },
        { title: "Artist Interview", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "interview" }
      ],
      bio: "Two travelers wait at a desolate station, drawn by the same goal, yet bound by their differences. Trains come and go, but they always miss them—sometimes by their own missteps, sometimes by forces unseen. As the station empties, will they ever find their way out?",
      gallery: [
        WaitingForTrain1,
        WaitingForTrain2,
        WaitingForTrain3,
        WaitingForTrain4,
        WaitingForTrain5,
        WaitingForTrain6,
        WaitingForTrain7,
        WaitingForTrain8,
        WaitingForTrain9,
        WaitingForTrain10,
        WaitingForTrain11,
        WaitingForTrain12,
        WaitingForTrain13,
        WaitingForTrain14,
        WaitingForTrain15,
      ]
    },
    // {
    //   id: 2,
    //   name: "Maria Garcia",
    //   genre: "Jazz",
    //   image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    //   performances: [
    //     { title: "Jazz in the Park", date: "2023-06-18", location: "Chicago, IL" },
    //     { title: "Blue Note Sessions", date: "2023-11-05", location: "New York, NY" }
    //   ],
    //   workshops: [
    //     { title: "Vocal Jazz Techniques", date: "2023-07-30" },
    //     { title: "Improvisation Workshop", date: "2023-09-14" }
    //   ],
    //   videos: [
    //     { title: "Blue Note Live", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "performance" },
    //     { title: "Behind the Music", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "interview" }
    //   ],
    //   bio: "Maria Garcia is a critically acclaimed jazz vocalist with a career spanning over two decades, known for her soulful interpretations of jazz standards."
    // }
  ]

  const selectedArtist = artists.find(artist => artist.id === Number(artistId));

  const handleArtistClick = (artist) => {
    navigate(`/festival/wcf/artists/${artist.id}`)
    setView('detail')
  }

  const handleBackClick = () => {
    navigate('/festival/wcf/artists')
    setView('grid')
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          {view === 'grid' ? 'Featured Artists' : selectedArtist?.name}
        </h1>
        {view === 'detail' && (
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Artists
          </button>
        )}
      </header>

      <main>
        {view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artists.map(artist => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onClick={() => handleArtistClick(artist)}
              />
            ))}
          </div>
        ) : (
          <ArtistDetail artist={selectedArtist} />
        )}
      </main>
    </div>
  )
}

export default WcfArtists