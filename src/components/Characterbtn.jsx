// Characterbtn.js
import React from 'react';

const Characterbtn = ({ characterImage }) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glowing Blurred Circle */}
      <div className="absolute w-72 h-72 md:w-64 md:h-64 rounded-full bg-purple-500 blur-lg opacity-50"></div>
      {/* Full Circle */}
      <div className="absolute w-64 h-64 md:w-56 md:h-56 bg-kc-bg1 rounded-full"></div>
      {/* Border Circle */}
      <div className="absolute w-56 h-56 md:w-48 md:h-48 border-4 border-kc-bd rounded-full"></div>
      {/* Character Image */}
      <div className="relative">
        <img src={characterImage} alt="Character" className="h-72 md:h-56" />
      </div>
    </div>
  );
};

export default Characterbtn;
