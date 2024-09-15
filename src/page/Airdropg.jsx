import React, { useState, useEffect } from 'react';
import bybit from '../components/assets/img/bybit.png';
import trust from '../components/assets/img/trust.png';
import tonkeeper from '../components/assets/img/tonkeeper.png';
import Coin from '../components/assets/img/kouncoinlogo.png';

const walletOptions = [
  {
    name: 'bybit',
    logo: bybit,
    link: 'https://www.bybit.com',
  },
  {
    name: 'trust',
    logo: trust,
    link: '#',
  },
  {
    name: 'ton',
    logo: tonkeeper,
    link: '#',
  },
];

// Reusable TimerBox component
const TimerBox = ({ value, label }) => (
  <div className="border border-purple-400 rounded-lg p-2 text-center min-w-[60px]">
    <p className="text-2xl">{value}</p>
    <span className="text-sm">{label}</span>
  </div>
);

const Airdropg = () => {
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const startTime = performance.now();

    const imgPromises = walletOptions.map((option) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = option.logo;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imgPromises).then(() => {
      const loadTime = performance.now() - startTime;
      if (loadTime > 1000) {
        setShowSkeleton(true);
      }
      setLoading(false);
    });
  }, []);

  // Countdown logic
  useEffect(() => {
    const targetDate = new Date('2024-11-26T12:00:00Z'); // 26 Nov. 2024, 12:00 PM UTC

    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center text-white p-4 font-fractulregular pb-[0px] xs:pb-[80px]">
      {loading && showSkeleton ? (
        <>
          <div className="skeleton skeleton-text h-10 w-3/4 mb-4"></div>
          <div className="skeleton skeleton-text h-5 w-3/4 mb-6"></div>
          {walletOptions.map((option, index) => (
            <div key={index} className="skeleton skeleton-image h-10 mb-4"></div>
          ))}
          <div className="skeleton skeleton-text h-5 w-3/4 mt-14 mb-6"></div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-fractulbold mt-8 mb-4">Airdrop</h1>
          <p className="text-center text-sm md:text-lg mb-6">
            Hello Gangs, Airdrop is coming soon, don't miss it. Let's all get paid.
          </p>
          {/* Uncommented section for future use */}
          {/* <div className="space-y-4 w-full max-w-xs">
            {walletOptions.map((option) => (
              <a
                key={option.name}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <button
                  key={option.name}
                  className="w-full flex items-center justify-center bg-transparent border border-purple-400 text-white py-3 rounded-2xl hover:bg-purple-500"
                >
                  <img src={option.logo} alt={`${option.name} Logo`} className="h-6 mr-2" />
                  <span className="text-2xl font-fractulbold">{option.name}</span>
                </button>
              </a>
            ))}
          </div> */}
          <div className='relative flex items-center justify-center mt-16'>
            <div className='relative'>
              <img src={Coin} alt="Coin" className="h-24 animate-bounce" />
            </div>
          </div>
          <p className="text-center text-purple-500 text-lg md:text-lg mt-14 mb-6">
            Airdrop Wallet: 26 Nov. 2024
          </p>
          <div className="flex justify-center space-x-4 text-lg font-fractulbold mt-4">
            <TimerBox value={timeLeft.days} label="Days" />
            <TimerBox value={timeLeft.hours} label="Hrs" />
            <TimerBox value={timeLeft.minutes} label="Min." />
            <TimerBox value={timeLeft.seconds} label="Sec" />
          </div>
          <p className="text-center text-sm md:text-lg mt-14 mb-6">
            Whitepaper coming Soon
          </p>
        </>
      )}
    </div>
  );
};

export default Airdropg;
