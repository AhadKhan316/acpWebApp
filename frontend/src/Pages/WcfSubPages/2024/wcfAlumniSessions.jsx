import { FiCalendar, FiMapPin, FiArrowRight, FiPlay, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import Modal from "react-modal";

import OpeningPoster from "/src/assets/wcf-assets/wcf-upcomingShows/opening-ceremony.jpg"
import WhiteRabbit1 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit1.png"
import WhiteRabbit2 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit2.png"
import MegaMusicConcert1 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music1.jpg";
import Generation25 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25.jpg";
import WaitingForTrain from "/src/assets/wcf-assets/wcf-upcomingShows/Waiting-for-train.jpg";
import DanceForPeace from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace.jpg";
import KarachiKaBicchu from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bicchu.jpg";
import TaleemeBalighan1 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan1.jpg";
import Slaver from "/src/assets/wcf-assets/wcf-upcomingShows/slaver-aaj-ka-taza-khabar1.jpg";
import PutYourHeartInto1 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1.jpg";
import Vgen from "/src/assets/wcf-assets/wcf-upcomingShows/v-gen.jpg";
import UnfitBall from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball-hai-dunya-mere-agay.jpg";
import PutYourHeartInto2 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2.jpg";
import AreYouLovingIt from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-loving-it.jpg";
import MegaMusicConcert2 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music2.jpeg";
import QawwaliNight from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night.jpg";
import Suicide from "/src/assets/wcf-assets/wcf-upcomingShows/suicide.jpg";
import Clue from "/src/assets/wcf-assets/wcf-upcomingShows/clue.jpg";
import CircleMirrortransformation from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation.jpg";
import TaleemeBalighan2 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2.jpg";
import TheSoundOfTinklingBells from "/src/assets/wcf-assets/wcf-upcomingShows/sheema-kermani-the-sound-of-tinkling-bells.jpg";
import MegaMusicConcert3 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music3.jpg";
import DanceJunction from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night.jpeg";
import HemletKiKhudkalami from "/src/assets/wcf-assets/wcf-upcomingShows/hamlet-ki-khudkalami.jpg";
import Chaturaee from "/src/assets/wcf-assets/wcf-upcomingShows/chaturaee.jpg";
import The39Steps from "/src/assets/wcf-assets/wcf-upcomingShows/the-39-steps.jpeg";
import Salgirah from "/src/assets/wcf-assets/wcf-upcomingShows/salgirah.jpg";
import MiRaqsam from "/src/assets/wcf-assets/wcf-upcomingShows/mi-raqsam.jpeg";
import GoodFellis from "/src/assets/wcf-assets/wcf-upcomingShows/good-fellis.jpg";
import MegaMusicConcert4 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music4.jpeg";
import GhuriyaKaGhar from "/src/assets/wcf-assets/wcf-upcomingShows/gurrya-ka-ghar.jpg";
import KhawaboonKaNautanki from "/src/assets/wcf-assets/wcf-upcomingShows/khawboon-ki-nautanki.jpg";
import Road from "/src/assets/wcf-assets/wcf-upcomingShows/road.jpg";
import ShakesPearFool from "/src/assets/wcf-assets/wcf-upcomingShows/shakespear-fool.jpg";
import BerlinnachLahore from "/src/assets/wcf-assets/wcf-upcomingShows/berlin-nach-lahore.jpg";
import ThreeGifts from "/src/assets/wcf-assets/wcf-upcomingShows/three-gifts-of-the-north-wind.jpg";
import Inspiritus from "/src/assets/wcf-assets/wcf-upcomingShows/inspiritus.jpg";
import BodyRevolution from "/src/assets/wcf-assets/wcf-upcomingShows/body-revolution.jpg";
import AndHereIAm from "/src/assets/wcf-assets/wcf-upcomingShows/and-here-i-am.jpeg";
import CocconDance from "/src/assets/wcf-assets/wcf-upcomingShows/cocoon-dance.jpg";
import balletDeBarcelona from "/src/assets/wcf-assets/wcf-upcomingShows/ballet-de-barcelona.jpg";
import TheUntold from "/src/assets/wcf-assets/wcf-upcomingShows/the-untold.jpeg";
import MegaMusicConcert5 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music5.jpg";
import BoeingBoeing from "/src/assets/wcf-assets/wcf-upcomingShows/boeing-boeing.jpeg";
import ShameOnYou from "/src/assets/wcf-assets/wcf-upcomingShows/shame-on-you.jpg";
import JazzMusicConcert from "/src/assets/wcf-assets/wcf-upcomingShows/jazz-music-concert.jpeg";
import AliAurDragon from "/src/assets/wcf-assets/wcf-upcomingShows/ali-aur-dragon.jpg";
import TributeToPakMusic from "/src/assets/wcf-assets/wcf-upcomingShows/tribute-to-pakistani-music.jpg";
import ClosingCeremony from "/src/assets/wcf-assets/wcf-upcomingShows/closing-ceremony.jpeg"


// Opening Ceremony
import OpeningCeremony1 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/1.webp"
import OpeningCeremony2 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/2.webp"
import OpeningCeremony3 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/3.webp"
import OpeningCeremony4 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/4.webp"
import OpeningCeremony5 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/5.webp"
import OpeningCeremony6 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/6.webp"
import OpeningCeremony7 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/7.webp"
import OpeningCeremony8 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/8.webp"
import OpeningCeremony9 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/9.webp"
import OpeningCeremony10 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/10.webp"
import OpeningCeremony11 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/11.webp"
import OpeningCeremony12 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/12.webp"
import OpeningCeremony13 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/13.webp"
import OpeningCeremony14 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/14.webp"
import OpeningCeremony15 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/15.webp"
import OpeningCeremony16 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/16.webp"
import OpeningCeremony17 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/17.webp"
import OpeningCeremony18 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/18.webp"
import OpeningCeremony19 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/19.webp"
import OpeningCeremony20 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/20.webp"
import OpeningCeremony21 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/21.webp"
import OpeningCeremony22 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/22.webp"
import OpeningCeremony23 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/23.webp"
import OpeningCeremony24 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/24.webp"
import OpeningCeremony25 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/25.webp"
import OpeningCeremony26 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/26.webp"
import OpeningCeremony27 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/27.webp"
import OpeningCeremony28 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/28.webp"
import OpeningCeremony29 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/29.webp"
import OpeningCeremony30 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/30.webp"
import OpeningCeremony31 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/31.webp"
import OpeningCeremony32 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/32.webp"
import OpeningCeremony33 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/33.webp"
import OpeningCeremony34 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/34.webp"
import OpeningCeremony35 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/35.webp"
import OpeningCeremony36 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/36.webp"
import OpeningCeremony37 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/37.webp"
import OpeningCeremony38 from "/src/assets/wcf-assets/wcf-upcomingShows/opening-day/38.webp"

// White and red Rabbit 1
import WhiteAndRedRabbitShowFirst1 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-1/1.webp"
import WhiteAndRedRabbitShowFirst2 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-1/2.webp"
import WhiteAndRedRabbitShowFirst3 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-1/3.webp"
import WhiteAndRedRabbitShowFirst4 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-1/4.webp"
import WhiteAndRedRabbitShowFirst5 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-1/5.webp"
import WhiteAndRedRabbitShowFirst6 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-1/6.webp"
import WhiteAndRedRabbitShowFirst7 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-1/7.webp"
import WhiteAndRedRabbitShowFirst8 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-1/8.webp"
import WhiteAndRedRabbitShowFirst9 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-1/9.webp"
import WhiteAndRedRabbitShowFirst10 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-1/10.webp"
import WhiteAndRedRabbitShowFirst11 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-1/11.webp"
import WhiteAndRedRabbitShowFirst12 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-1/12.webp"

// White and red Rabbit 2
import WhiteAndRedRabbitShowSec1 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-2/1.webp"
import WhiteAndRedRabbitShowSec2 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-2/2.webp"
import WhiteAndRedRabbitShowSec3 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-2/3.webp"
import WhiteAndRedRabbitShowSec4 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-2/4.webp"
import WhiteAndRedRabbitShowSec5 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-2/5.webp"
import WhiteAndRedRabbitShowSec6 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-2/6.webp"
import WhiteAndRedRabbitShowSec7 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-2/7.webp"
import WhiteAndRedRabbitShowSec8 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-2/8.webp"
import WhiteAndRedRabbitShowSec9 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-2/9.webp"
import WhiteAndRedRabbitShowSec10 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-2/10.webp"
import WhiteAndRedRabbitShowSec11 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-2/11.webp"
import WhiteAndRedRabbitShowSec12 from "/src/assets/wcf-assets/wcf-upcomingShows/white-rabbit-red-rabbit-show-2/12.webp"

// Music Concert 1
import MusicConcertFirst1 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/1.webp"
import MusicConcertFirst2 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/2.webp"
import MusicConcertFirst3 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/3.webp"
import MusicConcertFirst4 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/4.webp"
import MusicConcertFirst5 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/5.webp"
import MusicConcertFirst6 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/6.webp"
import MusicConcertFirst7 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/7.webp"
import MusicConcertFirst8 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/8.webp"
import MusicConcertFirst9 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/9.webp"
import MusicConcertFirst10 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/10.webp"
import MusicConcertFirst11 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/11.webp"
import MusicConcertFirst12 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/12.webp"
import MusicConcertFirst13 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/13.webp"
import MusicConcertFirst14 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/14.webp"
import MusicConcertFirst15 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/15.webp"
import MusicConcertFirst16 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/16.webp"
import MusicConcertFirst17 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/17.webp"
import MusicConcertFirst18 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/18.webp"
import MusicConcertFirst19 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/19.webp"
import MusicConcertFirst20 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/20.webp"
import MusicConcertFirst21 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/21.webp"
import MusicConcertFirst22 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/22.webp"
import MusicConcertFirst23 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/23.webp"
import MusicConcertFirst24 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/24.webp"
import MusicConcertFirst25 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/25.webp"
import MusicConcertFirst26 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/26.webp"
import MusicConcertFirst27 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/27.webp"
import MusicConcertFirst28 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/28.webp"
import MusicConcertFirst29 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/29.webp"
import MusicConcertFirst30 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/30.webp"
import MusicConcertFirst31 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/31.webp"
import MusicConcertFirst32 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/32.webp"
import MusicConcertFirst33 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/33.webp"
import MusicConcertFirst34 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/34.webp"
import MusicConcertFirst35 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/35.webp"
import MusicConcertFirst36 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/36.webp"
import MusicConcertFirst37 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/37.webp"
import MusicConcertFirst38 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/38.webp"
import MusicConcertFirst39 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/39.webp"
import MusicConcertFirst40 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/40.webp"
import MusicConcertFirst41 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert/41.webp"

// Geneation 25
import Generation1 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/1.webp"
import Generation2 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/2.webp"
import Generation3 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/3.webp"
import Generation4 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/4.webp"
import Generation5 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/5.webp"
import Generation6 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/6.webp"
import Generation7 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/7.webp"
import Generation8 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/8.webp"
import Generation9 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/9.webp"
import Generation10 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/10.webp"
import Generation11 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/11.webp"
import Generation12 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/12.webp"
import Generation13 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/13.webp"
import Generation14 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/14.webp"
import Generation15 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/15.webp"
import Generation16 from "/src/assets/wcf-assets/wcf-upcomingShows/generation-25/16.webp"

// Waiting For Train
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

// Dance for peace
import Dance1 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/1.webp"
import Dance2 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/2.webp"
import Dance3 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/3.webp"
import Dance4 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/4.webp"
import Dance5 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/5.webp"
import Dance6 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/6.webp"
import Dance7 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/7.webp"
import Dance8 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/8.webp"
import Dance9 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/9.webp"
import Dance10 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/10.webp"
import Dance11 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/11.webp"
import Dance12 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/12.webp"
import Dance13 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/13.webp"
import Dance14 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/14.webp"
import Dance15 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/15.webp"
import Dance16 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/16.webp"
import Dance17 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/17.webp"
import Dance18 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/18.webp"
import Dance19 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/19.webp"
import Dance20 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/20.webp"
import Dance21 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/21.webp"
import Dance22 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/22.webp"
import Dance23 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/23.webp"
import Dance24 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/24.webp"
import Dance25 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-for-peace/25.webp"

// Karachi ka bicchu
import Bicchu1 from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bichu/1.webp"
import Bicchu2 from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bichu/2.webp"
import Bicchu3 from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bichu/3.webp"
import Bicchu4 from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bichu/4.webp"
import Bicchu5 from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bichu/5.webp"
import Bicchu6 from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bichu/6.webp"
import Bicchu7 from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bichu/7.webp"
import Bicchu8 from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bichu/8.webp"
import Bicchu9 from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bichu/9.webp"
import Bicchu10 from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bichu/10.webp"
import Bicchu11 from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bichu/11.webp"
import Bicchu12 from "/src/assets/wcf-assets/wcf-upcomingShows/karachi-ka-bichu/12.webp"

// Taleeme Balighan 1
import TaleemFirst1 from "/src/assets/wcf-assets/wcf-upcomingShows/taleeme-balighan1/1.webp"
import TaleemFirst2 from "/src/assets/wcf-assets/wcf-upcomingShows/taleeme-balighan1/2.webp"
import TaleemFirst3 from "/src/assets/wcf-assets/wcf-upcomingShows/taleeme-balighan1/3.webp"
import TaleemFirst4 from "/src/assets/wcf-assets/wcf-upcomingShows/taleeme-balighan1/4.webp"
import TaleemFirst5 from "/src/assets/wcf-assets/wcf-upcomingShows/taleeme-balighan1/5.webp"
import TaleemFirst6 from "/src/assets/wcf-assets/wcf-upcomingShows/taleeme-balighan1/6.webp"
import TaleemFirst7 from "/src/assets/wcf-assets/wcf-upcomingShows/taleeme-balighan1/7.webp"
import TaleemFirst8 from "/src/assets/wcf-assets/wcf-upcomingShows/taleeme-balighan1/8.webp"
import TaleemFirst9 from "/src/assets/wcf-assets/wcf-upcomingShows/taleeme-balighan1/9.webp"
import TaleemFirst10 from "/src/assets/wcf-assets/wcf-upcomingShows/taleeme-balighan1/10.webp"
import TaleemFirst11 from "/src/assets/wcf-assets/wcf-upcomingShows/taleeme-balighan1/11.webp"
import TaleemFirst12 from "/src/assets/wcf-assets/wcf-upcomingShows/taleeme-balighan1/12.webp"

// Slaver
import Slaver1 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/1.webp"
import Slaver2 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/2.webp"
import Slaver3 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/3.webp"
import Slaver4 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/4.webp"
import Slaver5 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/5.webp"
import Slaver6 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/6.webp"
import Slaver7 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/7.webp"
import Slaver8 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/8.webp"
import Slaver9 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/9.webp"
import Slaver10 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/10.webp"
import Slaver11 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/11.webp"
import Slaver12 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/12.webp"
import Slaver13 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/13.webp"
import Slaver14 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/14.webp"
import Slaver15 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/15.webp"
import Slaver16 from "/src/assets/wcf-assets/wcf-upcomingShows/slaver/16.webp"

// Put Your Heart Into it 1
import PutYourheartFirst1 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1/1.webp"
import PutYourheartFirst2 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1/2.webp"
import PutYourheartFirst3 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1/3.webp"
import PutYourheartFirst4 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1/4.webp"
import PutYourheartFirst5 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1/5.webp"
import PutYourheartFirst6 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1/6.webp"
import PutYourheartFirst7 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1/7.webp"
import PutYourheartFirst8 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1/8.webp"
import PutYourheartFirst9 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1/9.webp"
import PutYourheartFirst10 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1/10.webp"
import PutYourheartFirst11 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1/11.webp"
import PutYourheartFirst12 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it1/12.webp"

// V-Gen

// Unfit Ball
import UnfitBall1 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/1.webp"
import UnfitBall2 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/2.webp"
import UnfitBall3 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/3.webp"
import UnfitBall4 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/4.webp"
import UnfitBall5 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/5.webp"
import UnfitBall6 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/6.webp"
import UnfitBall7 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/7.webp"
import UnfitBall8 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/8.webp"
import UnfitBall9 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/9.webp"
import UnfitBall10 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/10.webp"
import UnfitBall11 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/11.webp"
import UnfitBall12 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/12.webp"
import UnfitBall13 from "/src/assets/wcf-assets/wcf-upcomingShows/unfit-ball/13.webp"

// Put Your Heart Into 2
import PutYourheartSec1 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/1.webp"
import PutYourheartSec2 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/2.webp"
import PutYourheartSec3 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/3.webp"
import PutYourheartSec4 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/4.webp"
import PutYourheartSec5 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/5.webp"
import PutYourheartSec6 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/6.webp"
import PutYourheartSec7 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/7.webp"
import PutYourheartSec8 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/8.webp"
import PutYourheartSec9 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/9.webp"
import PutYourheartSec10 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/10.webp"
import PutYourheartSec11 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/11.webp"
import PutYourheartSec12 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/12.webp"
import PutYourheartSec13 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/13.webp"
import PutYourheartSec14 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/14.webp"
import PutYourheartSec15 from "/src/assets/wcf-assets/wcf-upcomingShows/put-your-heart-into-it2/15.webp"

// Are you lovin it
import AreYou1 from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-lovin-it/1.webp"
import AreYou2 from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-lovin-it/2.webp"
import AreYou3 from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-lovin-it/3.webp"
import AreYou4 from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-lovin-it/4.webp"
import AreYou5 from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-lovin-it/5.webp"
import AreYou6 from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-lovin-it/6.webp"
import AreYou7 from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-lovin-it/7.webp"
import AreYou8 from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-lovin-it/8.webp"
import AreYou9 from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-lovin-it/9.webp"
import AreYou10 from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-lovin-it/10.webp"
import AreYou11 from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-lovin-it/11.webp"
import AreYou12 from "/src/assets/wcf-assets/wcf-upcomingShows/are-you-lovin-it/12.webp"


// Music Concert 2
import MusicConcertSec1 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/1.webp"
import MusicConcertSec2 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/2.webp"
import MusicConcertSec3 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/3.webp"
import MusicConcertSec4 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/4.webp"
import MusicConcertSec5 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/5.webp"
import MusicConcertSec6 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/6.webp"
import MusicConcertSec7 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/7.webp"
import MusicConcertSec8 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/8.webp"
import MusicConcertSec9 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/9.webp"
import MusicConcertSec10 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/10.webp"
import MusicConcertSec11 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/11.webp"
import MusicConcertSec12 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/12.webp"
import MusicConcertSec13 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/13.webp"
import MusicConcertSec14 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/14.webp"
import MusicConcertSec15 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/15.webp"
import MusicConcertSec16 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/16.webp"
import MusicConcertSec17 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/17.webp"
import MusicConcertSec18 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/18.webp"
import MusicConcertSec19 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/19.webp"
import MusicConcertSec20 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/20.webp"
import MusicConcertSec21 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/21.webp"
import MusicConcertSec22 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/22.webp"
import MusicConcertSec23 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/23.webp"
import MusicConcertSec24 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/24.webp"
import MusicConcertSec25 from "/src/assets/wcf-assets/wcf-upcomingShows/music-concert2/25.webp"

// Qawwali Night
import QawwaliNight1 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/1.webp"
import QawwaliNight2 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/2.webp"
import QawwaliNight3 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/3.webp"
import QawwaliNight4 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/4.webp"
import QawwaliNight5 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/5.webp"
import QawwaliNight6 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/6.webp"
import QawwaliNight7 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/7.webp"
import QawwaliNight8 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/8.webp"
import QawwaliNight9 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/9.webp"
import QawwaliNight10 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/10.webp"
import QawwaliNight11 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/11.webp"
import QawwaliNight12 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/12.webp"
import QawwaliNight13 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/13.webp"
import QawwaliNight14 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/14.webp"
import QawwaliNight15 from "/src/assets/wcf-assets/wcf-upcomingShows/qawwali-night/15.webp"

// Suicide
import Suicide1 from "/src/assets/wcf-assets/wcf-upcomingShows/suicide/1.webp"
import Suicide2 from "/src/assets/wcf-assets/wcf-upcomingShows/suicide/2.webp"
import Suicide3 from "/src/assets/wcf-assets/wcf-upcomingShows/suicide/3.webp"
import Suicide4 from "/src/assets/wcf-assets/wcf-upcomingShows/suicide/4.webp"
import Suicide5 from "/src/assets/wcf-assets/wcf-upcomingShows/suicide/5.webp"
import Suicide6 from "/src/assets/wcf-assets/wcf-upcomingShows/suicide/6.webp"
import Suicide7 from "/src/assets/wcf-assets/wcf-upcomingShows/suicide/7.webp"
import Suicide8 from "/src/assets/wcf-assets/wcf-upcomingShows/suicide/8.webp"
import Suicide9 from "/src/assets/wcf-assets/wcf-upcomingShows/suicide/9.webp"
import Suicide10 from "/src/assets/wcf-assets/wcf-upcomingShows/suicide/10.webp"

// Clue
import Clue1 from "/src/assets/wcf-assets/wcf-upcomingShows/clue/1.webp"
import Clue2 from "/src/assets/wcf-assets/wcf-upcomingShows/clue/2.webp"
import Clue3 from "/src/assets/wcf-assets/wcf-upcomingShows/clue/3.webp"
import Clue4 from "/src/assets/wcf-assets/wcf-upcomingShows/clue/4.webp"
import Clue5 from "/src/assets/wcf-assets/wcf-upcomingShows/clue/5.webp"
import Clue6 from "/src/assets/wcf-assets/wcf-upcomingShows/clue/6.webp"
import Clue7 from "/src/assets/wcf-assets/wcf-upcomingShows/clue/7.webp"
import Clue8 from "/src/assets/wcf-assets/wcf-upcomingShows/clue/8.webp"
import Clue9 from "/src/assets/wcf-assets/wcf-upcomingShows/clue/9.webp"
import Clue10 from "/src/assets/wcf-assets/wcf-upcomingShows/clue/10.webp"
import Clue11 from "/src/assets/wcf-assets/wcf-upcomingShows/clue/11.webp"
import Clue12 from "/src/assets/wcf-assets/wcf-upcomingShows/clue/12.webp"

// Circle the mirror
import CircleMirror1 from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation/1.webp"
import CircleMirror2 from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation/2.webp"
import CircleMirror3 from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation/3.webp"
import CircleMirror4 from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation/4.webp"
import CircleMirror5 from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation/5.webp"
import CircleMirror6 from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation/6.webp"
import CircleMirror7 from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation/7.webp"
import CircleMirror8 from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation/8.webp"
import CircleMirror9 from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation/9.webp"
import CircleMirror10 from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation/10.webp"
import CircleMirror11 from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation/11.webp"
import CircleMirror12 from "/src/assets/wcf-assets/wcf-upcomingShows/circle-mirror-transformation/12.webp"

// Taleeme Baleghan 2
import TaleemSec1 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2/1.webp"
import TaleemSec2 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2/1.webp"
import TaleemSec3 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2/1.webp"
import TaleemSec4 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2/1.webp"
import TaleemSec5 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2/1.webp"
import TaleemSec6 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2/1.webp"
import TaleemSec7 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2/1.webp"
import TaleemSec8 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2/1.webp"
import TaleemSec9 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2/1.webp"
import TaleemSec10 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2/1.webp"
import TaleemSec11 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2/1.webp"
import TaleemSec12 from "/src/assets/wcf-assets/wcf-upcomingShows/taleem-e-balighan2/1.webp"

// The Sound Tinkling Bells
import TheSoundBells1 from "/src/assets/wcf-assets/wcf-upcomingShows/the-sound-of-tinkling-bells/1.webp"
import TheSoundBells2 from "/src/assets/wcf-assets/wcf-upcomingShows/the-sound-of-tinkling-bells/2.webp"
import TheSoundBells3 from "/src/assets/wcf-assets/wcf-upcomingShows/the-sound-of-tinkling-bells/3.webp"
import TheSoundBells4 from "/src/assets/wcf-assets/wcf-upcomingShows/the-sound-of-tinkling-bells/4.webp"
import TheSoundBells5 from "/src/assets/wcf-assets/wcf-upcomingShows/the-sound-of-tinkling-bells/5.webp"
import TheSoundBells6 from "/src/assets/wcf-assets/wcf-upcomingShows/the-sound-of-tinkling-bells/6.webp"
import TheSoundBells7 from "/src/assets/wcf-assets/wcf-upcomingShows/the-sound-of-tinkling-bells/7.webp"
import TheSoundBells8 from "/src/assets/wcf-assets/wcf-upcomingShows/the-sound-of-tinkling-bells/8.webp"
import TheSoundBells9 from "/src/assets/wcf-assets/wcf-upcomingShows/the-sound-of-tinkling-bells/9.webp"
import TheSoundBells10 from "/src/assets/wcf-assets/wcf-upcomingShows/the-sound-of-tinkling-bells/10.webp"

// Mega Music Concert 3
import MusicConcertThird1 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/1.webp"
import MusicConcertThird2 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/2.webp"
import MusicConcertThird3 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/3.webp"
import MusicConcertThird4 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/4.webp"
import MusicConcertThird5 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/5.webp"
import MusicConcertThird6 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/6.webp"
import MusicConcertThird7 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/7.webp"
import MusicConcertThird8 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/8.webp"
import MusicConcertThird9 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/9.webp"
import MusicConcertThird10 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/10.webp"
import MusicConcertThird11 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/11.webp"
import MusicConcertThird12 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/12.webp"
import MusicConcertThird13 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/13.webp"
import MusicConcertThird14 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/14.webp"
import MusicConcertThird15 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/15.webp"
import MusicConcertThird16 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/16.webp"
import MusicConcertThird17 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/17.webp"
import MusicConcertThird18 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/18.webp"
import MusicConcertThird19 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/19.webp"
import MusicConcertThird20 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/20.webp"
import MusicConcertThird21 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/21.webp"
import MusicConcertThird22 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/22.webp"
import MusicConcertThird23 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/23.webp"
import MusicConcertThird24 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/24.webp"
import MusicConcertThird25 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/25.webp"
import MusicConcertThird26 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/26.webp"
import MusicConcertThird27 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/27.webp"
import MusicConcertThird28 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/28.webp"
import MusicConcertThird29 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/29.webp"
import MusicConcertThird30 from "/src/assets/wcf-assets/wcf-upcomingShows/mega-music-concert3/30.webp"

// Dance Junction
import DanceJunction1 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/1.webp"
import DanceJunction2 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/2.webp"
import DanceJunction3 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/3.webp"
import DanceJunction4 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/4.webp"
import DanceJunction5 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/5.webp"
import DanceJunction6 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/6.webp"
import DanceJunction7 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/7.webp"
import DanceJunction8 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/8.webp"
import DanceJunction9 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/9.webp"
import DanceJunction10 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/10.webp"
import DanceJunction11 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/11.webp"
import DanceJunction12 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/12.webp"
import DanceJunction13 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/13.webp"
import DanceJunction14 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/14.webp"
import DanceJunction15 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/15.webp"
import DanceJunction16 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/16.webp"
import DanceJunction17 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/17.webp"
import DanceJunction18 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/18.webp"
import DanceJunction19 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/19.webp"
import DanceJunction20 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/20.webp"
import DanceJunction21 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/21.webp"
import DanceJunction22 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/22.webp"
import DanceJunction23 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/23.webp"
import DanceJunction24 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/24.webp"
import DanceJunction25 from "/src/assets/wcf-assets/wcf-upcomingShows/dance-junction-night/25.webp"








const events = [
  // first session start here
  {
    id: "opening-ceremony",
    title: "Opening Ceremony",
    poster: OpeningPoster,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "September 26, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Second session start here
  {
    id: "white-rabbit1",
    title: "White Rabbit Red Rabbit 1",
    poster: WhiteRabbit1,
    description:
      "White Rabbit, Red Rabbit by Olomopolo will feature at the World Culture Festival - Karachi. Performed by Nadia Jamil & Sarmad Khoosat. Written by Nassim Soleimanpour and Produced by Kanwal Khoosat.",
    gallery: [
      WhiteAndRedRabbitShowFirst1,
      WhiteAndRedRabbitShowFirst2,
      WhiteAndRedRabbitShowFirst3,
      WhiteAndRedRabbitShowFirst4,
      WhiteAndRedRabbitShowFirst5,
      WhiteAndRedRabbitShowFirst6,
      WhiteAndRedRabbitShowFirst7,
      WhiteAndRedRabbitShowFirst8,
      WhiteAndRedRabbitShowFirst9,
      WhiteAndRedRabbitShowFirst10,
      WhiteAndRedRabbitShowFirst11,
      WhiteAndRedRabbitShowFirst12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "September 27, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Third session start here
  {
    id: "white-rabbit2",
    title: "White Rabbit Red Rabbit 2",
    poster: WhiteRabbit2,
    description:
      "White Rabbit, Red Rabbit by Olomopolo will feature at the World Culture Festival - Karachi. Performed by Nadia Jamil & Sarmad Khoosat. Written by Nassim Soleimanpour and Produced by Kanwal Khoosat.",
    gallery: [
      WhiteAndRedRabbitShowSec1,
      WhiteAndRedRabbitShowSec2,
      WhiteAndRedRabbitShowSec3,
      WhiteAndRedRabbitShowSec4,
      WhiteAndRedRabbitShowSec5,
      WhiteAndRedRabbitShowSec6,
      WhiteAndRedRabbitShowSec7,
      WhiteAndRedRabbitShowSec8,
      WhiteAndRedRabbitShowSec9,
      WhiteAndRedRabbitShowSec10,
      WhiteAndRedRabbitShowSec11,
      WhiteAndRedRabbitShowSec12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "September 28, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourth session start here
  {
    id: "mega-music-concert1",
    title: "Mega Music Concert",
    poster: MegaMusicConcert1,
    description:
      "Mega Music Night featuring Khumaariyan, Akhtar Chanal Zahri, Nafees Khan, Bashir Khan, Imran Momina, Lee Dia, Peace Joils, Delah Dube, Gasasira Rugamba Serge, Sahib Pashazade, Kamran Kari Mov, Madan Ghopal and ACMA the Band at the World Culture Festival - Karachi.",
    gallery: [
      MusicConcertFirst1,
      MusicConcertFirst2,
      MusicConcertFirst3,
      MusicConcertFirst4,
      MusicConcertFirst5,
      MusicConcertFirst6,
      MusicConcertFirst7,
      MusicConcertFirst8,
      MusicConcertFirst9,
      MusicConcertFirst10,
      MusicConcertFirst11,
      MusicConcertFirst12,
      MusicConcertFirst13,
      MusicConcertFirst14,
      MusicConcertFirst15,
      MusicConcertFirst16,
      MusicConcertFirst18,
      MusicConcertFirst19,
      MusicConcertFirst20,
      MusicConcertFirst21,
      MusicConcertFirst22,
      MusicConcertFirst23,
      MusicConcertFirst25,
      MusicConcertFirst26,
      MusicConcertFirst27,
      MusicConcertFirst28,
      MusicConcertFirst29,
      MusicConcertFirst30,
      MusicConcertFirst31,
      MusicConcertFirst32,
      MusicConcertFirst33,
      MusicConcertFirst34,
      MusicConcertFirst35,
      MusicConcertFirst36,
      MusicConcertFirst37,
      MusicConcertFirst38,
      MusicConcertFirst39,
      MusicConcertFirst40,
      MusicConcertFirst41,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "September 28, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fifth session start here
  {
    id: "generation-25",
    title: "Generation 25",
    poster: Generation25,
    description:
      "Generation 25 is a theatre play by Mashrika Performing Arts and Media Company will feature in the World Culture Festival - Karachi. Directed by Hope Azeda and Kamanzi Yannick",
    gallery: [
      Generation1,
      Generation2,
      Generation3,
      Generation4,
      Generation5,
      Generation6,
      Generation7,
      Generation8,
      Generation9,
      Generation10,
      Generation11,
      Generation12,
      Generation13,
      Generation14,
      Generation15,
      Generation16,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "September 29, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Sixth session start here
  {
    id: "waiting-train",
    title: "Waiting For Train",
    poster: WaitingForTrain,
    description:
      "Two travelers wait at a desolate station, drawn by the same goal, yet bound by their differences. Trains come and go, but they always miss them—sometimes by their own missteps, sometimes by forces unseen. As the station empties, will they ever find their way out?",
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
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "September 29, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Seventh session start here
  {
    id: "dance-for-peace",
    title: "Dance For Peace",
    poster: DanceForPeace,
    description:
      "Dance for Peace featuring performances from South Africa, Rwanda, Nepal, Congo and Pakistan is coming to the World Culture Festival - Karachi.",
    gallery: [
      Dance1,
      Dance2,
      Dance3,
      Dance4,
      Dance5,
      Dance6,
      Dance7,
      Dance8,
      Dance9,
      Dance10,
      Dance11,
      Dance12,
      Dance13,
      Dance14,
      Dance15,
      Dance16,
      Dance17,
      Dance18,
      Dance19,
      Dance20,
      Dance21,
      Dance22,
      Dance23,
      Dance24,
      Dance25,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "September 29, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Eighth session start here
  {
    id: "karachi-ka-bicchu",
    title: "Karachi ka Bicchu",
    poster: KarachiKaBicchu,
    description:
      "Karachi ka Bicchu is a farcical comedy reimagining Molière's classic Tartuffe in a modern-day Karachi setting. The story follows two neighbouring families, the Khaans and Sindhis, whose daily lives are turned upside down by their mischievous servants. The servants’ antics drive the humour, creating chaos and laughter throughout. With its witty dialogue and clever twists, the play offers a lighthearted take on family dynamics and deception.",
    gallery: [
      Bicchu1,
      Bicchu2,
      Bicchu3,
      Bicchu4,
      Bicchu5,
      Bicchu6,
      Bicchu7,
      Bicchu8,
      Bicchu9,
      Bicchu10,
      Bicchu11,
      Bicchu12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "September 30, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Nineth session start here
  {
    id: "taleeme-balighan",
    title: "Taleem e Balighan 2.0",
    poster: TaleemeBalighan1,
    description:
      "Taleem-e-Balighan 2.0 is a modern-day adaptation of Khawaja Moinuddin's iconic 1956 satire, which humorously critiques society through the lens of adult education. While updated for contemporary audiences, the play highlights how little has changed since its original debut, shedding light on persistent societal flaws. The sharp wit and comedic brilliance that made the original a classic remain intact, resonating with viewers today. Taleem-e-Balighan 2.0 combines humour and reflection to offer a timeless commentary on the absurdities of social and educational systems.",
    gallery: [
      TaleemFirst1,
      TaleemFirst2,
      TaleemFirst3,
      TaleemFirst4,
      TaleemFirst5,
      TaleemFirst6,
      TaleemFirst7,
      TaleemFirst8,
      TaleemFirst9,
      TaleemFirst10,
      TaleemFirst11,
      TaleemFirst12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 01, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // tenth session start here
  {
    id: "slaver",
    title: "Slaver",
    poster: Slaver,
    description:
      "In this dark comedy, four friends Kashif, Faisal, Billy, and Goonga, find refuge in a graveyard while evading the police. To their horror, the dead rise as they confront modern issues like terrorism and counterterrorism. As the story progresses, they grapple with making the right choices in a rapidly changing world.",
    gallery: [
      Slaver1,
      Slaver2,
      Slaver3,
      Slaver4,
      Slaver5,
      Slaver6,
      Slaver7,
      Slaver8,
      Slaver9,
      Slaver10,
      Slaver11,
      Slaver12,
      Slaver13,
      Slaver14,
      Slaver15,
      Slaver16,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 02, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Eleven session start here
  {
    id: "put-your-heart-into-1",
    title: "Put Your Heart Into 2.0",
    poster: PutYourHeartInto1,
    description:
      "Without words, only glances, music, and smiles. 'Put Your Heart Into It' is a charming and poetic cabaret-style puppet show. With grace and gentleness, the actress breathes life into puppets and objects, transforming them into endearing characters. Elegant and heartfelt, 'Put Your Heart Into It' is a family-friendly performance that touches the audience's heart, inviting them to smile, dream, reflect, and marvel at the beauty of life's simple joys.",
    gallery: [
      PutYourheartFirst1,
      PutYourheartFirst2,
      PutYourheartFirst3,
      PutYourheartFirst4,
      PutYourheartFirst5,
      PutYourheartFirst6,
      PutYourheartFirst7,
      PutYourheartFirst8,
      PutYourheartFirst9,
      PutYourheartFirst10,
      PutYourheartFirst11,
      PutYourheartFirst12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 03, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twelve session start here
  {
    id: "vgen",
    title: "Vgen",
    poster: Vgen,
    description:
      "A desperate attempt to mask failure, a ground breaking Ai project in process becomes a reflection of the chaos it's meant to conceal. Inspired by newspaper headlines, V-Gen...Error 404: Not Found is a satirical exploration of denial, delusion, deception, decay, despotism and despair.",
    gallery: [

    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 03, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Thirteen session start here
  {
    id: "unfit-ball",
    title: "Unfit Ball",
    poster: UnfitBall,
    description:
      "The story follows Chiya, a little girl from the village of Gandpur, who is passionate about nature and the environment. When she visits the city with her Aunt and cousins, she is overwhelmed by the pollution, fast-paced lifestyle, and lack of concern for the environment. What will she do to fix what she sees?",
    gallery: [
      UnfitBall1,
      UnfitBall2,
      UnfitBall3,
      UnfitBall4,
      UnfitBall5,
      UnfitBall6,
      UnfitBall7,
      UnfitBall8,
      UnfitBall9,
      UnfitBall10,
      UnfitBall11,
      UnfitBall12,
      UnfitBall13,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 04, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourteen session start here
  {
    id: "put-your-heart-into-2",
    title: "Put Your Heart Into 2.1",
    poster: PutYourHeartInto2,
    description:
      "Without words, only glances, music, and smiles. 'Put Your Heart Into It' is a charming and poetic cabaret-style puppet show. With grace and gentleness, the actress breathes life into puppets and objects, transforming them into endearing characters. Elegant and heartfelt, 'Put Your Heart Into It' is a family-friendly performance that touches the audience's heart, inviting them to smile, dream, reflect, and marvel at the beauty of life's simple joys.",
    gallery: [
      PutYourheartSec1,
      PutYourheartSec2,
      PutYourheartSec3,
      PutYourheartSec4,
      PutYourheartSec5,
      PutYourheartSec6,
      PutYourheartSec7,
      PutYourheartSec8,
      PutYourheartSec9,
      PutYourheartSec10,
      PutYourheartSec11,
      PutYourheartSec12,
      PutYourheartSec13,
      PutYourheartSec14,
      PutYourheartSec15,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 04, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fifteen session start here
  {
    id: "are-you-lovin-it",
    title: "Are You Loving It",
    poster: AreYouLovingIt,
    description:
      "Are You Lovin' It? is set in an imaginary theme park, WacDonald's Land, and explores the fast food industry as a symbol of globalisation and its global impact. The story delves into contemporary social issues in Japan. By blending traditional theatrical techniques like Kabuki and Japanese swordplay with modern pop culture elements such as Gothic Lolita, the production offers audiences a unique glimpse into contemporary Japanese culture.",
    gallery: [
      AreYou1,
      AreYou2,
      AreYou3,
      AreYou4,
      AreYou5,
      AreYou6,
      AreYou7,
      AreYou8,
      AreYou9,
      AreYou10,
      AreYou11,
      AreYou12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 05, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Sixteen session start here
  {
    id: "music-concert-2",
    title: "Mega Music Concert 2.0",
    poster: MegaMusicConcert2,
    description:
      "The World Culture Festival - Karachi stage will be lit up by Kamaliya from Ukraine, Bayaan, Aashir Wajahat, Mai Dhai, Natalia Gul, Shahzaib Ali, Ali Mohammad Roonjho and Sattar Jogi from Pakistan on October 05, 2024.",
    gallery: [
      MusicConcertSec1,
      MusicConcertSec2,
      MusicConcertSec3,
      MusicConcertSec4,
      MusicConcertSec5,
      MusicConcertSec6,
      MusicConcertSec7,
      MusicConcertSec8,
      MusicConcertSec9,
      MusicConcertSec10,
      MusicConcertSec11,
      MusicConcertSec12,
      MusicConcertSec13,
      MusicConcertSec14,
      MusicConcertSec15,
      MusicConcertSec16,
      MusicConcertSec17,
      MusicConcertSec18,
      MusicConcertSec19,
      MusicConcertSec20,
      MusicConcertSec21,
      MusicConcertSec22,
      MusicConcertSec23,
      MusicConcertSec24,
      MusicConcertSec25,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 05, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Seventeen session start here
  {
    id: "qawwali-night",
    title: "Qawwali Night",
    poster: QawwaliNight,
    description:
      "Fareed Ayaz and Abu Muhammad will perform at the World Culture Festival - Karachi",
    gallery: [
      QawwaliNight1,
      QawwaliNight2,
      QawwaliNight3,
      QawwaliNight4,
      QawwaliNight5,
      QawwaliNight6,
      QawwaliNight7,
      QawwaliNight8,
      QawwaliNight9,
      QawwaliNight10,
      QawwaliNight11,
      QawwaliNight12,
      QawwaliNight13,
      QawwaliNight14,
      QawwaliNight15,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 06, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Eighteen session start here
  {
    id: "suicide",
    title: "Suicide",
    poster: Suicide,
    description:
      "This unique and engaging performance delves into the complex emotion of shame, exploring its impact on individuals and communities. Developed as a fusion of verbatim theatre and documentary performance, it highlights stories from Pakistan and Europe, critically examining themes like class, race, religion, and body politics through a blend of languages and original songs.",
    gallery: [
      Suicide1,
      Suicide2,
      Suicide3,
      Suicide4,
      Suicide5,
      Suicide6,
      Suicide7,
      Suicide8,
      Suicide9,
      Suicide10,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 07, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Nineteen session start here
  {
    id: "clue",
    title: "Clue",
    poster: Clue,
    description:
      "Clue brings the classic board game to life as six guests, each given an alias, are invited to a mysterious dinner party hosted by a blackmailer. Armed with weapons and a choice—pay double or kill the butler—the guests must unravel the identity of the blackmailer. The evening spirals into a fast-paced, comedic murder mystery filled with twists, laughter, and intrigue.",
    gallery: [
      Clue1,
      Clue2,
      Clue3,
      Clue4,
      Clue5,
      Clue6,
      Clue7,
      Clue8,
      Clue9,
      Clue10,
      Clue11,
      Clue12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 08, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty session start here
  {
    id: "circle-mirror-transformation",
    title: "Circle Mirror Transformation",
    poster: CircleMirrortransformation,
    description:
      "In a community center’s six-week acting class, a quirky group—including a hippie, a former actress, a teenager, and a carpenter—engages in innocent theater games that gradually unravel deeper emotional conflicts and personal realizations. The play is a touching exploration of vulnerability and human connection.",
    gallery: [
      CircleMirror1,
      CircleMirror2,
      CircleMirror3,
      CircleMirror4,
      CircleMirror5,
      CircleMirror6,
      CircleMirror7,
      CircleMirror8,
      CircleMirror9,
      CircleMirror10,
      CircleMirror11,
      CircleMirror12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 09, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty One session start here
  {
    id: "taleeme-balighan2",
    title: "Taleem e Balighan 2.0",
    poster: TaleemeBalighan2,
    description:
      "Taleem-e-Balighan 2.0 is a modern-day adaptation of Khawaja Moinuddin's iconic 1956 satire, which humorously critiques society through the lens of adult education. While updated for contemporary audiences, the play highlights how little has changed since its original debut, shedding light on persistent societal flaws. The sharp wit and comedic brilliance that made the original a classic remain intact, resonating with viewers today. Taleem-e-Balighan 2.0 combines humour and reflection to offer a timeless commentary on the absurdities of social and educational systems.",
    gallery: [
      TaleemSec1,
      TaleemSec2,
      TaleemSec3,
      TaleemSec4,
      TaleemSec5,
      TaleemSec6,
      TaleemSec7,
      TaleemSec8,
      TaleemSec9,
      TaleemSec10,
      TaleemSec11,
      TaleemSec12,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 10, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty Two session start here
  {
    id: "the-sound-of-tinkling-bells",
    title: "The Sound Of Tinkling Bells",
    poster: TheSoundOfTinklingBells,
    description:
      "The Legendary Sheema Kermani will delight audiences with classical dances in ‘The Sound of Tinkling Bells’ exclusively at the World Culture Festival - Karachi!",
    gallery: [
      TheSoundBells1,
      TheSoundBells2,
      TheSoundBells3,
      TheSoundBells4,
      TheSoundBells5,
      TheSoundBells6,
      TheSoundBells7,
      TheSoundBells8,
      TheSoundBells9,
      TheSoundBells10,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 11, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty Three session start here
  {
    id: "mega-music-concert-3",
    title: "Mega Music Concert 3.0",
    poster: MegaMusicConcert3,
    description:
      "Are you ready for another unforgettable concert at the World Culture Festival - Karachi? Hurry up and grab your tickets to witness the epic Maanu, Abdur Rahman Sajid, Sounds of Kolachi, a special music performance from Spain, Cosmic Fluid and more!",
    gallery: [
      MusicConcertThird1,
      MusicConcertThird2,
      MusicConcertThird3,
      MusicConcertThird4,
      MusicConcertThird5,
      MusicConcertThird6,
      MusicConcertThird7,
      MusicConcertThird8,
      MusicConcertThird9,
      MusicConcertThird10,
      MusicConcertThird11,
      MusicConcertThird12,
      MusicConcertThird13,
      MusicConcertThird14,
      MusicConcertThird15,
      MusicConcertThird16,
      MusicConcertThird17,
      MusicConcertThird18,
      MusicConcertThird19,
      MusicConcertThird20,
      MusicConcertThird21,
      MusicConcertThird22,
      MusicConcertThird23,
      MusicConcertThird24,
      MusicConcertThird25,
      MusicConcertThird26,
      MusicConcertThird27,
      MusicConcertThird28,
      MusicConcertThird29,
      MusicConcertThird30,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 12, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty Four session start here
  {
    id: "dance-junction",
    title: "Dance Junction",
    poster: DanceJunction,
    description:
      "Join us to witness Dance Junction Night featuring NIGHAT CHAODHARY, MANI CHAO (GROUP), FARUKH DARBAR, WAQAR SAMRAT, ZAHIDA NOOR, PNCA (FOLK PERFORMANCE), JOG RANGAI FAISALABAD, ABDUL GHANI (GROUP), WAQAS & ROHIT (GROUP), DJ JOHN, MASTER GHULAM HUSSAIN, SAJID GARBA (GROUP), BHIT SHAH MATKA (GROUP) at the World Culture Festival - Karachi 2024.",
    gallery: [
      DanceJunction1,
      DanceJunction2,
      DanceJunction3,
      DanceJunction4,
      DanceJunction5,
      DanceJunction6,
      DanceJunction7,
      DanceJunction8,
      DanceJunction9,
      DanceJunction10,
      DanceJunction11,
      DanceJunction12,
      DanceJunction13,
      DanceJunction14,
      DanceJunction15,
      DanceJunction16,
      DanceJunction17,
      DanceJunction18,
      DanceJunction19,
      DanceJunction20,
      DanceJunction21,
      DanceJunction22,
      DanceJunction23,
      DanceJunction24,
      DanceJunction25,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 13, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty Five session start here
  {
    id: "hamlet-ki-khudkalami",
    title: "Hemlet Ki Khudkalami",
    poster: HemletKiKhudkalami,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 14, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty Six session start here
  {
    id: "chaturaee",
    title: "Chaturaee",
    poster: Chaturaee,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 15, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty Seven session start here
  {
    id: "the-39Steps",
    title: "The 39 Steps",
    poster: The39Steps,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 16, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty Eight session start here
  {
    id: "salgirah",
    title: "Salgirah",
    poster: Salgirah,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 17, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Twenty Nine session start here
  {
    id: "mi-raqsam",
    title: "Mi Raqsam",
    poster: MiRaqsam,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 18, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Thirty session start here
  {
    id: "good-fellis",
    title: "Good Fellis",
    poster: GoodFellis,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 19, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Thirty One session start here
  {
    id: "mega-music-concert-4.0",
    title: "Mega Music Concert 4.0",
    poster: MegaMusicConcert4,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 19, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Thirty Two session start here
  {
    id: "ghuriya-ka-ghar",
    title: "Ghuriya Ka Ghar",
    poster: GhuriyaKaGhar,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 20, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Thirty Three session start here
  {
    id: "khawaboon-ka-nautanki",
    title: "Khawaboon Ka Nautanki",
    poster: KhawaboonKaNautanki,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 21, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Thirty Four session start here
  {
    id: "road",
    title: "Road",
    poster: Road,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 22, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Thirty Five session start here
  {
    id: "shakes-pears-fool",
    title: "ShakesPears Fool",
    poster: ShakesPearFool,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 23, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Thirty Six session start here
  {
    id: "berlin-nach-lahore",
    title: "Berlin Nach Lahore",
    poster: BerlinnachLahore,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 23, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Thirty Seven session start here
  {
    id: "berlin-nach-lahore",
    title: "Berlin Nach Lahore",
    poster: BerlinnachLahore,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 23, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Thirty Eight session start here
  {
    id: "three-gifts",
    title: "Three Gifts",
    poster: ThreeGifts,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 24, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Thirty Nine session start here
  {
    id: "inspiritus",
    title: "Inspiritus",
    poster: Inspiritus,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 24, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourty session start here
  {
    id: "body-revolution",
    title: "Body Revolution",
    poster: BodyRevolution,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 25, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourty One session start here
  {
    id: "and-here-i-am",
    title: "And Here I Am",
    poster: AndHereIAm,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 25, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourty Two session start here
  {
    id: "cocon-dance",
    title: "Coccon Dance",
    poster: CocconDance,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 26, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourty three session start here
  {
    id: "ballet-de-barcelona",
    title: "Ballet De Barcelona",
    poster: balletDeBarcelona,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 26, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourty Four session start here
  {
    id: "the-untold",
    title: "The Untold",
    poster: TheUntold,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 27, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourty Five session start here
  {
    id: "mega-music-concert-5",
    title: "Mega Music Concert 5.0",
    poster: MegaMusicConcert5,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 27, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourty Six session start here
  {
    id: "boeing-boeing",
    title: "Boeing Boeing",
    poster: BoeingBoeing,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 28, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourty Seven session start here
  {
    id: "shame-on-you",
    title: "Shame On You",
    poster: ShameOnYou,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 29, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourty Eight session start here
  {
    id: "jazz-music-concert",
    title: "Jazz Music Concert",
    poster: JazzMusicConcert,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 30, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fourty Nine session start here
  {
    id: "ali-aur-dragon",
    title: "Ali Aur Dragon",
    poster: AliAurDragon,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "October 31, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fifty session start here
  {
    id: "tribute-to-pak",
    title: "Tribute To Pakistan Music",
    poster: TributeToPakMusic,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "November 01, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },

  // Fifty One session start here
  {
    id: "closing-ceremony",
    title: "Closing Ceremony",
    poster: ClosingCeremony,
    description:
      "Highlights of the Grand Opening Ceremony of World Culture Festival - Karachi 2024 The festival features more than 450 artists from 40 different countries and will continue till October 30 at Arts Council of Pakistan, Karachi.",
    gallery: [
      OpeningCeremony1,
      OpeningCeremony2,
      OpeningCeremony3,
      OpeningCeremony4,
      OpeningCeremony5,
      OpeningCeremony6,
      OpeningCeremony7,
      OpeningCeremony8,
      OpeningCeremony9,
      OpeningCeremony10,
      OpeningCeremony11,
      OpeningCeremony12,
      OpeningCeremony13,
      OpeningCeremony14,
      OpeningCeremony15,
      OpeningCeremony16,
      OpeningCeremony17,
      OpeningCeremony18,
      OpeningCeremony19,
      OpeningCeremony20,
      OpeningCeremony21,
      OpeningCeremony22,
      OpeningCeremony23,
      OpeningCeremony24,
      OpeningCeremony25,
      OpeningCeremony26,
      OpeningCeremony27,
      OpeningCeremony28,
      OpeningCeremony29,
      OpeningCeremony30,
      OpeningCeremony31,
      OpeningCeremony32,
      OpeningCeremony33,
      OpeningCeremony34,
      OpeningCeremony35,
      OpeningCeremony36,
      OpeningCeremony37,
      OpeningCeremony38,
    ],
    // youtubeVideo: "https://www.youtube.com/embed/PV9hxIoBxdI",
    sessions: [
      {
        date: "November 02, 2024",
        location: "Arts Council Karachi",
      },
    ],
  },


]

Modal.setAppElement("#root");

function WcfAlumniSessions() {

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

export default WcfAlumniSessions;
