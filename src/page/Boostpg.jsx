// Boostpg.jsx
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Coincontext } from '../components/data/Coincontext';
import Coin from '../components/assets/img/coin.png';
import flash from '../components/assets/img/flash.png';
import bot from '../components/assets/img/bot.png';
import battery from '../components/assets/img/battery.png';
import mysterybox from '../components/assets/img/mysterybox.png';
import plusone from '../components/assets/img/plusone.png';
import CelebrationPopup from '../components/data/Celebrationpopup';
import TooltipNotification from '../components/data/Tooltipnotification';

// Default prices for boosters
const defaultPrices = {
  "Energy Drink": 2000,
  "+1 Tap": 2000,
  "Tap Bot": 500000,
};

// Booster items
const boosters = [
  { id: 1, imgSrc: battery, title: "Energy Drink", price: defaultPrices["Energy Drink"], comingSoon: false },
  { id: 2, imgSrc: plusone, title: "+1 Tap", price: defaultPrices["+1 Tap"], comingSoon: false },
  { id: 3, imgSrc: flash, title: "Full Tank", price: "Coming Soon", comingSoon: true },
  { id: 4, imgSrc: mysterybox, title: "Mystery Box", price: "Coming Soon", comingSoon: true },
  { id: 5, imgSrc: bot, title: "Tap Bot", price: defaultPrices["Tap Bot"], comingSoon: false },
];

// Popup component to display booster details
const Popup = ({ title, price, imgSrc, onClose, onBuy }) => {
  const isComingSoon = title === "Full Tank" || title === "Mystery Box";
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-kc-bg1 text-white p-6 rounded-xl w-80 text-center border border-purple-400 relative">
        <button className="absolute top-2 right-2 text-white text-4xl" onClick={onClose}>
          &times;
        </button>
        <img src={imgSrc} alt={title} className="h-44 mx-auto mb-4 animate-bounce" />
        <p className="mb-4 font-bold text-lg">{title}</p>
        <div className="flex items-center justify-center mb-4">
          <img src={Coin} alt="Coin Icon" className="h-6 mr-2" />
          <span className="text-lg font-bold">{isComingSoon ? "Coming Soon" : price.toLocaleString()}</span>
        </div>
        <h2 className="text-sm font-regular mb-4">
          {isComingSoon ? "Coming Soon" : "Buy this booster using your coin"}
        </h2>

        <div className="flex justify-center">
          <button
            onClick={onBuy}
            className="text-white py-2 px-4 rounded bg-purple-700"
            disabled={isComingSoon}
          >
            {isComingSoon ? "Coming Soon" : "Boost"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Boostpg = () => {
  const {
    coinCount,
    setCoinCount,
    tapMultiplier,
    setTapMultiplier,
    progress,
    setProgress,
    maxProgress,
    setMaxProgress,
  } = useContext(Coincontext);
  const [selectedBooster, setSelectedBooster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [boosterPrices, setBoosterPrices] = useState({});
  const tapBotActiveRef = useRef(false); // Ref to manage Tap Bot activation

  useEffect(() => {
    // Load saved prices from local storage or use default prices
    const savedPrices = JSON.parse(localStorage.getItem('boosterPrices')) || defaultPrices;
    setBoosterPrices(savedPrices);

    const startTime = performance.now();
    const timer = setTimeout(() => {
      const loadTime = performance.now() - startTime;
      if (loadTime > 1000) {
        setShowSkeleton(true);
      }
      setLoading(false);
    }, 2000);

    // Gradually refill current progress to maxProgress
    const refillProgress = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < maxProgress) {
          return prevProgress + 1; // Increment progress gradually
        }
        clearInterval(refillProgress); // Stop once maxProgress is reached
        return prevProgress;
      });
    }, 1000);

    // Check if Tap Bot is already purchased and activate
    if (localStorage.getItem('isTapBotPurchased') === 'true') {
      tapBotActiveRef.current = true;
      activateTapBot();
    }

    return () => {
      clearTimeout(timer);
      clearInterval(refillProgress);
      stopTapBot(); // Stop Tap Bot when the component is unmounted
    };
  }, [maxProgress, setProgress]);

  const handleBoosterClick = (booster) => {
    setSelectedBooster(booster);
  };

  const closePopup = () => {
    setSelectedBooster(null);
  };

  const handleBuy = () => {
    const currentPrice = boosterPrices[selectedBooster.title] || defaultPrices[selectedBooster.title];

    // Energy Drink specific logic
    if (selectedBooster.title === "Energy Drink") {
      if (coinCount >= currentPrice) {
        const newPrice = currentPrice + 1000;
        setCoinCount(coinCount - currentPrice);
        updatePrice("Energy Drink", newPrice);

        // Show celebration popup and refill progress
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 1000);
        setProgress(maxProgress); // Refill currentProgress to maxProgress

        closePopup();
      } else {
        // Show insufficient balance notification
        setNotificationMessage("Not enough coins");
      }
      return;
    }

    // +1 Tap specific logic
    if (selectedBooster.title === "+1 Tap") {
      if (coinCount >= currentPrice) {
        // Deduct coin balance and increase price
        const newPrice = currentPrice + 1000;
        setCoinCount(coinCount - currentPrice);
        setTapMultiplier(tapMultiplier + 1); // Increment tapMultiplier each time +1 Tap is purchased
        updatePrice("+1 Tap", newPrice);

        // Show celebration popup
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);

        closePopup();
      } else {
        // Show insufficient balance notification
        setNotificationMessage("Not enough coins");
      }
      return;
    }

    // Tap Bot specific logic - New feature implementation
    if (selectedBooster.title === "Tap Bot") {
      const isTapBotPurchased = localStorage.getItem('isTapBotPurchased') === 'true';
      if (isTapBotPurchased) {
        setNotificationMessage("Bot is active"); // Tap Bot already purchased
        closePopup();
        return;
      }

      if (coinCount >= currentPrice) {
        setCoinCount(coinCount - currentPrice);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 1000);
        localStorage.setItem('isTapBotPurchased', 'true');
        tapBotActiveRef.current = true;
        activateTapBot(); // Start the Tap Bot process
        closePopup();
      } else {
        setNotificationMessage("Not enough coins");
      }
      return;
    }

    // Handle other boosters (preserving original functionality)
    if (coinCount >= currentPrice) {
      setCoinCount(coinCount - currentPrice);
      setShowCelebration(true);
      closePopup();
    } else {
      setNotificationMessage("Not enough coins");
    }
  };

  // Activate Tap Bot
  const activateTapBot = () => {
    if (tapBotActiveRef.current) {
      const tapBotInterval = setInterval(() => {
        setCoinCount((prevCount) => {
          const newCount = prevCount + 1;
          localStorage.setItem('coinCount', newCount);
          return newCount;
        });
      }, 1000);

      // Save interval to localStorage for persistence
      localStorage.setItem('tapBotInterval', tapBotInterval);
    }
  };

  // Stop Tap Bot
  const stopTapBot = () => {
    const tapBotInterval = localStorage.getItem('tapBotInterval');
    if (tapBotInterval) {
      clearInterval(parseInt(tapBotInterval, 10));
      localStorage.removeItem('tapBotInterval');
    }
  };

  const updatePrice = (title, newPrice) => {
    const updatedPrices = { ...boosterPrices, [title]: newPrice };
    setBoosterPrices(updatedPrices);
    localStorage.setItem('boosterPrices', JSON.stringify(updatedPrices)); // Save updated prices to local storage
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-kc-bg text-white p-4 font-fractulregular pb-[0px] xs:pb-[80px] ">
      <div className="w-full max-w-md text-center mt-4 md:mt-6">
        <h2 className="text-xl md:text-2xl font-fractulregular">Balance</h2>
        <div className="bg-kc-purple rounded-full p-4 text-center mt-2">
          <div className="flex items-center justify-center">
            <img src={Coin} alt="Coin" className="w-10 h-10 md:w-14 md:h-14" />
            <span className="p-2 text-3xl md:text-5xl font-bold">{coinCount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mt-6">
        <h3 className="text-2xl md:text-4xl font-fractulbold mb-4 text-center">Boosters</h3>
        <div className="space-y-2">
          {loading && showSkeleton ? (
            <>
              <div className="skeleton skeleton-image mb-4"></div>
              <div className="skeleton skeleton-text mb-2"></div>
              <div className="skeleton skeleton-text"></div>
            </>
          ) : (
            boosters.map((booster) => (
              <div
                key={booster.id}
                onClick={() => handleBoosterClick(booster)}
                className="flex justify-between items-center hover:bg-purple-400 p-2 border-solid border-kc-bd border-2 rounded-3xl cursor-pointer"
              >
                <div className="flex items-center">
                  <img src={booster.imgSrc} alt={booster.title} className="h-10 mr-4" />
                  <div>
                    <p className="text-xl font-fractulbold">{booster.title}</p>
                    <p className="text-sm">
                      {booster.comingSoon ? "Coming Soon" : boosterPrices[booster.title]?.toLocaleString()}
                    </p>
                  </div>
                </div>
                {!booster.comingSoon && <img src={Coin} alt="Coin" className="h-6" />}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedBooster && (
        <Popup
          title={selectedBooster.title}
          price={boosterPrices[selectedBooster.title] || selectedBooster.price}
          imgSrc={selectedBooster.imgSrc}
          onClose={closePopup}
          onBuy={handleBuy}
        />
      )}

      {showCelebration && <CelebrationPopup onClose={() => setShowCelebration(false)} />}
      {notificationMessage && (
        <TooltipNotification
          message={notificationMessage}
          onClose={() => setNotificationMessage('')}
        />
      )}
    </div>
  );
};

export default Boostpg;
