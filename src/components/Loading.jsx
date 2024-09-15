import React from 'react';
import logo from './assets/img/kouncoinlogo.png';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-kc-bg text-white">
      {/* Top Section */}
      <div className="flex flex-col items-center ">
        <div className="text-center">
          <h1 className="text-4xl font-fractulsemibold text-kc-tx mt-14">KounCoin</h1>
        
        </div>
        <img src={logo} alt="logo" className=" mt-8 h-28"/>
      </div>

      {/* Middle Section */}
      <div className="flex-grow flex items-center justify-center mt-0 mb-0">
        <div className="w-12 h-12 border-4 border-solid border-t-transparent border-kc-bd rounded-full" style={{ animation: 'spin 1s linear infinite' }}></div>
      </div>

      {/* Bottom Section */}
      <p className="text-xl font-fractulregular text-white pb-24 text-center">
        Airdrop Coming soon
      </p>
    </div>
  );
};

export default Loading;
