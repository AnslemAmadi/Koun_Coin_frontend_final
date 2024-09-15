// Earnpg.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Coincontext } from '../components/data/Coincontext';
import { AiOutlineCheckCircle } from 'react-icons/ai'; // Import the tick icon
import { ImSpinner2 } from 'react-icons/im'; // Import the spinner icon for loading animation
import youtubeIcon from '../components/assets/img/youtube.png';
import telegramIcon from '../components/assets/img/telegram.png';
import tiktokIcon from '../components/assets/img/tiktok.png';
import instagramIcon from '../components/assets/img/instagram.png';
import twitterIcon from '../components/assets/img/twitter.png';
import facebookIcon from '../components/assets/img/facebook.png';
import coinIcon from '../components/assets/img/coin.png';

const dailyCoinsPlatforms = [
  { name: 'Watch new video', icon: youtubeIcon, coins: 5000, link: 'https://youtube.com', key: 'watchNewVideo' },
  { name: 'New post on tiktok', icon: tiktokIcon, coins: 5000, link: 'https://tiktok.com', key: 'newPostTiktok' },
  { name: 'New post on instagram', icon: instagramIcon, coins: 2000, link: 'https://instagram.com', key: 'newPostInstagram' },
  { name: 'New post on X', icon: twitterIcon, coins: 2000, link: 'https://twitter.com', key: 'newPostTwitter' },
  { name: 'Follow us on Facebook', icon: facebookIcon, coins: 2000, link: 'https://facebook.com', key: 'followFacebook' },
];

const subscribePlatforms = [
  { name: 'Subscribe our YouTube ', icon: youtubeIcon, coins: 5000, link: 'https://www.youtube.com/@KounCoin-Official', key: 'subscribeYoutube' },
  { name: 'Follow us on Tiktok', icon: tiktokIcon, coins: 2000, link: 'https://tiktok.com', key: 'followTiktok' },
  { name: 'Follow us on Instagram', icon: instagramIcon, coins: 2000, link: 'https://instagram.com', key: 'followInstagram' },
  { name: 'Follow us on X', icon: twitterIcon, coins: 2000, link: 'https://twitter.com', key: 'followTwitter' },
  { name: 'Join Telegram Channel', icon: telegramIcon, coins: 2000, link: 'https://telegram.org', key: 'joinTelegram' },
  { name: 'Follow us on Facebook', icon: facebookIcon, coins: 2000, link: 'https://facebook.com', key: 'followFacebookSubscribe' },
  { name: 'hit the notification button', icon: youtubeIcon, coins: 500, link:'https://www.youtube.com/@KounCoin-Official', key: 'notificationYoutube' },
  { name: 'make a comment', icon: youtubeIcon, coins: 500, link: 'https://www.youtube.com/@KounCoin-Official', key: 'commentYoutube'  },
  { name: 'Like the Facebook Post', icon: facebookIcon, coins: 500, link: 'https://facebook.com', key: 'likefacebook'  },
  { name: 'make a comment', icon: youtubeIcon, coins: 500, link: 'https://www.youtube.com/@KounCoin-Official', key: 'commentYoutube'  },
  { name: 'make a comment', icon: youtubeIcon, coins: 500, link: 'https://www.youtube.com/@KounCoin-Official', key: 'commentYoutube'  },
];

const Popup = ({ name, coins, icon, link, onClose, actionLabel, onAction }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-kc-bg1 text-white p-6 rounded-xl w-80 text-center border border-purple-400 relative">
        <button className="absolute top-2 right-2 text-white text-4xl" onClick={onClose}>
          &times;
        </button>
        <img src={icon} alt={name} className="h-16 mx-auto mb-4" />
        <h2 className="mb-4 text-lg">{name}. <br />You will earn:</h2>
        <div className="flex items-center justify-center mb-4">
          <img src={coinIcon} alt="Coin Icon" className="h-6 mr-2" />
          <span className="text-lg font-bold">{coins.toLocaleString()}</span>
        </div>
        <h2 className="text-sm font-regular mb-4">Note: Your coin will be sent after the task is confirmed</h2>

        <div className="flex justify-center">
          <button
            onClick={onAction}
            className="text-white py-2 px-4 rounded bg-purple-700"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

const Earnpg = () => {
  const { coinCount, setCoinCount } = useContext(Coincontext);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonState, setButtonState] = useState({});
  const [claimed, setClaimed] = useState({}); // To track claimed status

  useEffect(() => {
    // Load button states and claimed statuses from localStorage or set defaults
    const savedStates = JSON.parse(localStorage.getItem('buttonStates')) || {};
    const savedClaims = JSON.parse(localStorage.getItem('claimedStatuses')) || {};
    setButtonState(savedStates);
    setClaimed(savedClaims);

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Clear timer on cleanup
  }, []);

  const handleTap = (platform, actionLabel) => {
    // Check if the platform has been claimed before
    const hasClaimed = claimed[platform.key];
    if (hasClaimed) {
      // If claimed, just redirect to the link without showing the popup
      window.open(platform.link, '_blank', 'noopener,noreferrer');
    } else {
      // Otherwise, show the popup
      setSelectedPlatform({ ...platform, actionLabel });
    }
  };

  const handleAction = (platform) => {
    // Redirect the user to the specified link
    window.open(platform.link, '_blank', 'noopener,noreferrer');

    // Set loading state for the button
    setButtonState(prev => {
      const newState = { ...prev, [platform.key]: 'loading' };
      localStorage.setItem('buttonStates', JSON.stringify(newState)); // Save state
      return newState;
    });

    // Change to "Claim" after 30 seconds
    setTimeout(() => {
      setButtonState(prev => {
        const newState = { ...prev, [platform.key]: 'claim' };
        localStorage.setItem('buttonStates', JSON.stringify(newState)); // Save state
        return newState;
      });
    }, 30000); // 30 seconds
  };

  const handleClaim = (platform) => {
    const hasClaimed = claimed[platform.key];
    if (!hasClaimed) {
      // Add coins to the user's balance
      setCoinCount(prevCount => prevCount + platform.coins);
      setClaimed(prev => {
        const newClaims = { ...prev, [platform.key]: true };
        localStorage.setItem('claimedStatuses', JSON.stringify(newClaims)); // Save claimed status
        return newClaims;
      });
      setButtonState(prev => {
        const newState = { ...prev, [platform.key]: 'view' };
        localStorage.setItem('buttonStates', JSON.stringify(newState)); // Save state
        return newState;
      });
      setSelectedPlatform(null); // Close the popup
    }
  };

  const closePopup = () => {
    setSelectedPlatform(null);
  };

  const renderButtonLabel = (key) => {
    if (buttonState[key] === 'loading') {
      // Show loading spinner when in loading state
      return <ImSpinner2 className="animate-spin" />;
    } else if (buttonState[key] === 'claim') {
      return 'Claim';
    } else {
      return 'Follow';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-kc-bg text-white p-4 font-fractulregular">
      <h1 className="text-xl font-fractulbold mt-8">Get the Daily Coins</h1>
      <p className="text-sm font-fractulregular mb-6">View, Like, Subscribe, Comment - that's how you earn coins</p>

      <div className="space-y-4 w-full max-w-xs">
        {loading ? (
          <>
            <div className="skeleton skeleton-image mb-4"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </>
        ) : (
          dailyCoinsPlatforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handleTap(platform, 'View')}
              className="relative flex items-center justify-between bg-transparent border border-purple-400 text-white py-3 px-4 rounded-2xl hover:bg-purple-500 w-full"
            >
              <div className="flex items-center">
                <img src={platform.icon} alt={`${platform.name} Logo`} className="h-6 mr-4" />
                <span className="text-sm font-fractulregular">{platform.name}</span>
              </div>
              <div className="flex items-center">
                <img src={coinIcon} alt="Coin Icon" className="h-4 mr-1" />
                <span className="text-xs font-fractulregular">{platform.coins.toLocaleString()}</span>
                {claimed[platform.key] && <AiOutlineCheckCircle className="ml-1 text-green-500" />} {/* Tick icon */}
              </div>
            </button>
          ))
        )}
      </div>

      <h1 className="text-xl font-fractulbold mt-8 mb-6">Subscribe and earn coins</h1>

      <div className="space-y-4 w-full max-w-xs">
        {loading ? (
          <>
            <div className="skeleton skeleton-image mb-4"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </>
        ) : (
          subscribePlatforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => {
                if (claimed[platform.key]) {
                  window.open(platform.link, '_blank', 'noopener,noreferrer');
                } else {
                  handleTap(platform, renderButtonLabel(platform.key));
                }
              }}
              className={`relative flex items-center justify-between bg-transparent border border-purple-400 text-white py-3 px-4 rounded-2xl hover:bg-purple-500 w-full`}
            >
              <div className="flex items-center">
                <img src={platform.icon} alt={`${platform.name} Logo`} className="h-6 mr-4" />
                <span className="text-sm font-fractulregular">{platform.name}</span>
              </div>
              <div className="flex items-center">
                <img src={coinIcon} alt="Coin Icon" className="h-4 mr-1" />
                <span className="text-xs font-fractulregular">{platform.coins.toLocaleString()}</span>
                {claimed[platform.key] && <AiOutlineCheckCircle className="ml-1 text-green-500" />} {/* Tick icon */}
              </div>
            </button>
          ))
        )}
      </div>

      {selectedPlatform && (
        <Popup
          name={selectedPlatform.name}
          coins={selectedPlatform.coins}
          icon={selectedPlatform.icon}
          link={selectedPlatform.link}
          onClose={closePopup}
          actionLabel={buttonState[selectedPlatform.key] === 'loading' ? <ImSpinner2 className="animate-spin" /> : buttonState[selectedPlatform.key] === 'claim' ? 'Claim' : selectedPlatform.actionLabel}
          onAction={() => {
            if (buttonState[selectedPlatform.key] === 'claim') {
              handleClaim(selectedPlatform);
            } else {
              handleAction(selectedPlatform);
            }
          }}
        />
      )}
    </div>
  );
};

export default Earnpg;
