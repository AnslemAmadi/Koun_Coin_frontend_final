import React, { useState, useEffect } from 'react';
import collaboration from '../components/assets/img/collaboration.png';
import social from '../components/assets/img/social.png';
import referral from '../components/assets/img/referral.png';
import linkIcon from '../components/assets/img/link.png';
import coinIcon from '../components/assets/img/coin.png';

// Data structure for invite options
const inviteOptions = [
  {
    id: 1,
    title: 'Invite your friends',
    icon: collaboration,
    coins: '5,000',
    notification: true,
  },
  {
    id: 2,
    title: 'Invite 50 friends',
    icon: referral,
    coins: '5,000,000',
    notification: true,
  },
  {
    id: 3,
    title: 'Invite 100 friends',
    icon: social,
    coins: '10,000,000 (coming soon)',
    notification: true,
  },
];

const getLinkOption = {
  title: 'get link',
  icon: linkIcon,
  notification: false,
};

const Invite = () => {
  const [notifications, setNotifications] = useState(inviteOptions.map(option => option.notification));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // Clear timer on cleanup
  }, []);

  const handleTap = (index) => {
    setNotifications(notifications.map((notify, i) => (i === index ? false : notify)));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-kc-bg text-white p-4 font-fractulregular pb-[0px] xs:pb-[80px]">
      <h1 className="text-3xl font-fractulbold mt-8 mb-6">Invite friends</h1>

      <div className="space-y-6 w-full max-w-xs">
        {loading ? (
          <>
            <div className="skeleton skeleton-image"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-image"></div>
            <div className="skeleton skeleton-text"></div>
          </>
        ) : (
          inviteOptions.map((option, index) => (
            <div
              key={option.id}
              onClick={() => handleTap(index)}
              className="relative flex flex-col items-center justify-center bg-transparent border border-purple-400 text-white py-2 px-4 rounded-2xl hover:bg-purple-500 cursor-pointer"
            >
              <div className="flex items-center">
                <img src={option.icon} alt={`${option.title} Icon`} className="h-10 mr-2" />
                <span className="text-xl font-fractulbold">{option.title}</span>
              </div>
              <div className="flex items-center mt-2">
                <img src={coinIcon} alt="Coin Icon" className="h-6 mr-1" />
                <span className="text-lg font-fractulbold">{option.coins}</span>
              </div>

              {notifications[index] && (
                <div className="absolute top-0 right-0 ml-4 mb-4 w-2 h-2 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                </div>
              )}
            </div>
          ))
        )}

        {loading ? (
          <div className="skeleton skeleton-image"></div>
        ) : (
          <div
            onClick={() => handleTap(-1)} 
            className="relative flex items-center justify-center bg-transparent border border-purple-400 text-white py-4 px-4 rounded-2xl hover:bg-purple-500 cursor-pointer"
          >
            <img src={getLinkOption.icon} alt="Get Link Icon" className="h-10 mr-2" />
            <span className="text-2xl font-fractulbold">{getLinkOption.title}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invite;
