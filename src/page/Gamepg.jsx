import React, { useState } from 'react';
import { PiDog } from "react-icons/pi";

const Gamepg = () => {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-kc-bg text-white p-4 font-fractulregular relative overflow-hidden">
      
      <div className='justify-center'><PiDog size={60} /></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-kc-bg bg-opacity-80"></div>

      {/* Popup */}
      {showPopup && (
        <div className="relative z-10 bg-kc-bg1 p-6 rounded-xl shadow-lg text-center border border-purple-400">
          <h2 className="text-2xl font-fractulbold mb-4">Games Coming Soon</h2>
          <p className="text-sm font-fractulregular mb-6">
            Stay tuned for exciting new games! We are working hard to bring you amazing adventures.
          </p>
          <button 
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
            onClick={() => setShowPopup(false)}
          >
            Okay
          </button>
        </div>
      )}

    </div>
  );
};

export default Gamepg;
