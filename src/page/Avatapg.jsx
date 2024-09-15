// Avatapg.jsx
import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import coinIcon from '../components/assets/img/coin.png';
import { avatars } from '../components/data/Avatadata';
import { Coincontext } from '../components/data/Coincontext'; // Import the context

const Avatapg = () => {
  const { setCurrentLevel } = useContext(Coincontext); // Use the context

  const handleSlideChange = (index) => {
    const selectedAvatar = avatars[index];
    setCurrentLevel({ level: selectedAvatar.name.split(':')[0], name: selectedAvatar.name.split(': ')[1] }); // Update the level and name
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-kc-bg text-white p-4 font-fractulregular pb-[0px] xs:pb-[80px]">
      <h1 className="text-2xl font-fractulsemibold mb-4 text-center">Avater</h1>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        navigation
        className="w-full max-w-xs"
        onSlideChange={(swiper) => handleSlideChange(swiper.realIndex)} // Handle slide change
      >
        {avatars.map((avatar, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center">
            <h2 className="text-xl mb-2 text-center">{avatar.name}</h2>
            <div className="relative flex justify-center items-center">
              <div className="absolute w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full bg-purple-500 blur-lg opacity-50"></div>
              <div className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-kc-bg1 rounded-full"></div>
              <div className="absolute w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 border-4 border-kc-bd rounded-full"></div>
              <LazyLoadImage
                src={avatar.image}
                alt={avatar.name}
                className="relative w-36 h-auto"
                effect="blur"
              />
            </div>
            <div className="mt-4 flex items-center justify-center w-full border border-purple-400 py-3 px-4 rounded-2xl">
              <img src={coinIcon} alt="Coin Icon" className="h-6 mr-2" />
              <span className="text-xl font-fractulregular">{avatar.price.toLocaleString()}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Avatapg;
