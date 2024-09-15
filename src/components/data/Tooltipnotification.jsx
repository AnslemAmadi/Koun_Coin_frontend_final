// TooltipNotification.js
import React, { useEffect } from 'react';

const Tooltipnotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 1000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-64 right-36 bg-kc-bg text-white text-xs py-2 px-4 rounded-lg z-50 shadow-lg animate-fadeIn">
      {message}
    </div>
  );
};

export default Tooltipnotification;
