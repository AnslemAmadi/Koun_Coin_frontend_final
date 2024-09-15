// CelebrationPopup.js
import React, { useEffect } from 'react';
import happy from '../assets/img/happy.png';

const CelebrationPopup = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-kc-bg1 text-white p-6 rounded-xl w-80 text-center border border-purple-400 relative overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-full h-full glitter-animation"></div>
        </div>
        <div className="relative z-10 flex">
          <img src={happy} alt="logo" className="h-12" />
          <p>Booster purchased successfully!</p> {/* Ensure this message appears correctly */}
        </div>
      </div>
    </div>
  );
};

export default CelebrationPopup;
