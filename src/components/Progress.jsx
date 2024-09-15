import React from 'react';
import { AiFillThunderbolt } from "react-icons/ai";

const Progress = ({ currentProgress, maxProgress }) => {
  // Calculate the width percentage of the progress bar
  const progressPercentage = (currentProgress / maxProgress) * 100;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Progress Bar */}
      <div className="w-44 bg-gray-700 rounded-full h-3.5 mb-2 overflow-hidden">
        <div
          className="h-full"
          style={{
            width: `${progressPercentage}%`,
            background: 'linear-gradient(89.9deg, rgb(255, 90, 109) 2.6%, rgb(119, 76, 231) 97.9%)', // Purple gradient
          }}
        ></div>
      </div>
      {/* Progress Text */}
      <span className="justify-center items-center flex text-white">
        <AiFillThunderbolt />
        {currentProgress} / {maxProgress}
      </span>
    </div>
  );
};

export default Progress;
