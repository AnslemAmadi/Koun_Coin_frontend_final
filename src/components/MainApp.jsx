// MainApp.jsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Coincontext } from './data/Coincontext';
import Head from './Head';
import Avatabtn from './Avatabtn';
import Boost from './Boost';
import Airdropbtn from './Airdropbtn';
import Characterbtn from './Characterbtn';
import Progress from './Progress';
import Coin from './assets/img/coin.png';
import Charone from './Charone';
import { avatars } from './data/Avatadata';
import bot from '../components/assets/img/bot.png';

const MainApp = () => {
  const {
    coinCount,
    setCoinCount,
    setCurrentLevel,
    highestLevelReached,
    setHighestLevelReached,
    tapMultiplier,
    progress,
    setProgress,
    maxProgress,
  } = useContext(Coincontext);

  const [animations, setAnimations] = useState([]);
  const [isVibrating, setIsVibrating] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState(avatars[0].image);
  const MAX_ANIMATIONS = 10;
  const progressIntervalRef = useRef(null);
  const [showClaimPopup, setShowClaimPopup] = useState(false);
  const [coinsEarnedWhileAway, setCoinsEarnedWhileAway] = useState(0);

  useEffect(() => {
    const lastActiveTime = parseInt(localStorage.getItem('lastActiveTime'), 10) || Date.now();
    const currentTime = Date.now();
    const timeElapsed = Math.floor((currentTime - lastActiveTime) / 1000);

    if (localStorage.getItem('isTapBotPurchased') === 'true') {
      const earnedCoins = timeElapsed;
      if (earnedCoins > 0) {
        setCoinsEarnedWhileAway(earnedCoins);
        setShowClaimPopup(true);
      }
    }
    localStorage.setItem('lastActiveTime', Date.now());
  }, []);

  const handleClaimCoins = () => {
    setCoinCount((prevCount) => {
      const newCount = prevCount + coinsEarnedWhileAway;
      localStorage.setItem('coinCount', newCount);
      return newCount;
    });
    setCoinsEarnedWhileAway(0);
    setShowClaimPopup(false);
  };

  useEffect(() => {
    const unlockedAvatar = avatars.find((avatar, index) => coinCount >= avatar.price && index > highestLevelReached);

    if (unlockedAvatar) {
      const unlockedLevel = avatars.indexOf(unlockedAvatar);
      if (unlockedLevel > highestLevelReached) {
        setHighestLevelReached(unlockedLevel);
        setCurrentLevel({ level: unlockedAvatar.name.split(':')[0], name: unlockedAvatar.name.split(': ')[1] });
        setCurrentCharacter(unlockedAvatar.image);
      } else {
        const highestUnlockedAvatar = avatars[highestLevelReached];
        setCurrentCharacter(highestUnlockedAvatar.image);
        setCurrentLevel({ level: highestUnlockedAvatar.name.split(':')[0], name: highestUnlockedAvatar.name.split(': ')[1] });
      }
    } else {
      const highestUnlockedAvatar = avatars[highestLevelReached];
      setCurrentCharacter(highestUnlockedAvatar.image);
      setCurrentLevel({ level: highestUnlockedAvatar.name.split(':')[0], name: highestUnlockedAvatar.name.split(': ')[1] });
    }
  }, [coinCount, highestLevelReached, setHighestLevelReached, setCurrentLevel]);

  const handleCharacterTouchStart = (event) => {
    event.preventDefault();
    stopRefillProgress();
    const touches = Array.from(event.touches);
    touches.forEach((touch) => {
      if (animations.length < MAX_ANIMATIONS && progress > 0) {
        addAnimation(touch.clientX, touch.clientY, touch.identifier);
      }
    });
  };

  const addAnimation = (x, y, identifier) => {
    setCoinCount((prevCount) => prevCount + tapMultiplier);
    setProgress((prevProgress) => {
      const newProgress = Math.max(prevProgress - 1, 0);
      localStorage.setItem('currentProgress', newProgress);
      return newProgress;
    });

    const newAnimation = {
      id: Date.now() + identifier,
      x,
      y,
    };
    setAnimations((prevAnimations) => [...prevAnimations, newAnimation]);
    setIsVibrating(true);

    setTimeout(() => {
      setAnimations((prevAnimations) => prevAnimations.filter((anim) => anim.id !== newAnimation.id));
      setIsVibrating(false);
    }, 800);
  };

  const handleCharacterTouchEnd = () => {
    startRefillProgress();
  };

  const startRefillProgress = () => {
    stopRefillProgress();
    progressIntervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < maxProgress) {
          const updatedProgress = Math.min(prevProgress + 2, maxProgress);
          localStorage.setItem('currentProgress', updatedProgress);
          return updatedProgress;
        }
        stopRefillProgress();
        return prevProgress;
      });
    }, 1000);
  };

  const stopRefillProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    return () => {
      stopRefillProgress();
    };
  }, []);

  return (
    <div className="no-scroll min-h-screen flex flex-col items-center bg-kc-bg text-white p-2 sm:p-4 font-fractulregular pb-[0px] xs:pb-[80px]">
      <div className="w-full max-w-md">
        <Head />
        <div className="flex justify-around mb-2 sm:mb-3 mt-2 sm:mt-4 space-x-1 sm:space-x-2">
          <Link to="/avatabtn">
            <Avatabtn />
          </Link>
          <Link to="/boost">
            <Boost />
          </Link>
          <Link to="/airdropbtn">
            <Airdropbtn />
          </Link>
        </div>

        <div className="text-center flex flex-row justify-center items-center">
          <img src={Coin} alt="Coin" className="w-10 h-10 sm:w-10 sm:h-10 md:w-14 md:h-14" />
          <div className="p-1 sm:p-2 text-2xl sm:text-2xl md:text-4xl font-fractulsemibold">
            {coinCount}
          </div>
        </div>

        <div className="flex justify-center relative mt-4 sm:mt-6 md:mt-10">
          {animations.map((animation) => (
            <div
              key={animation.id}
              style={{
                position: 'fixed',
                top: animation.y,
                left: animation.x,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-10"
            >
              <Charone />
            </div>
          ))}
          <div
            onTouchStart={handleCharacterTouchStart}
            onTouchEnd={handleCharacterTouchEnd}
            onContextMenu={handleContextMenu}
            className={`cursor-pointer ${isVibrating ? 'animate-vibrate' : ''} z-0`}
          >
            <Characterbtn characterImage={currentCharacter} />
          </div>
        </div>

        <div className="flex flex-col items-center text-lg mt-6 sm:mt-10 md:mt-16">
          <Progress currentProgress={progress} maxProgress={maxProgress} />
        </div>

        {showClaimPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-kc-bg1 border border-kc-bd border-2 p-12 rounded-xl text-center relative">
              <div className='flex items-center justify-center mb-2'>
            <img src={bot} alt="Bot Minning" className="h-14 animate-bounce " /></div>
              <h3 className='text-sm font-regular '>You have earned <br/>
                <span className='flex items-center justify-center text-3xl font-bold'><img src={Coin} alt="Coin Icon" className="h-8 mr-2"/>{coinsEarnedWhileAway} </span> from Tap Bot</h3>
              <button onClick={handleClaimCoins} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded">
                Claim
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainApp;
