// Popup.js
{/*import React from 'react';

const Popboost = ({ title, price, imgSrc, onClose, onBuy }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-kc-bg1 text-white p-6 rounded-xl w-80 text-center border border-purple-400 relative">
        <button
          className="absolute top-2 right-2 text-white text-4xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={imgSrc} alt={title} className="h-44 mx-auto mb-4 animate-bounce" />
        <p className="mb-4 font-bold text-lg"> {title}</p>
        <div className="flex items-center justify-center mb-4">
          <img src={Coin} alt="Coin Icon" className="h-6 mr-2" />
          <span className="text-lg font-bold">
            {typeof price === 'number' ? price.toLocaleString() : price}
          </span>
        </div>
        <h2 className="text-sm font-regular mb-4">Buy this booster using your coin</h2>

        <div className="flex justify-center">
          <button
            onClick={onBuy}
            className="text-white py-2 px-4 rounded bg-purple-700"
            disabled={typeof price !== 'number'} // Disable button if price is not a number (e.g., "Coming Soon")
          >
            Boost
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popboost;
*/}