import React, { useState, useEffect } from 'react';
import coinIcon from '../components/assets/img/coin.png'; // Ensure this path is correct
import { GiAmericanFootballPlayer } from "react-icons/gi";// Placeholder for the player icon

const Statspg = () => {
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalMining, setTotalMining] = useState(0);

  // Simulated fetch function for total mining and players data
  const fetchStats = async () => {
    try {
      // Placeholder data to simulate backend response
      const simulatedTotalMining = 500000; // Replace with actual fetch from backend
      const simulatedTotalPlayers = 200; // Replace with actual fetch from backend

      setTotalMining(simulatedTotalMining);
      setTotalPlayers(simulatedTotalPlayers);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-kc-bg text-white p-4 font-fractulregular pb-[0px] xs:pb-[80px]">
      <h1 className="text-3xl font-fractulbold mt-8 mb-8">Our family</h1>

      <div className="space-y-4 w-full max-w-xs">
        {/* Total Players */}
        <div className="flex flex-col items-center justify-center bg-transparent border border-purple-400 text-white py-4 px-6 rounded-2xl">
          <span className="text-xl font-fractulsemibold">Total players</span>
          <div className="flex items-center mt-2">
           <GiAmericanFootballPlayer size={25} className='mr-2'/>
            <span className="text-base font-fractulbold">{totalPlayers}</span>
          </div>
        </div>

        {/* Total Mining */}
        <div className="flex flex-col items-center justify-center bg-transparent border border-purple-400 text-white py-4 px-6 rounded-2xl">
          <span className="text-xl font-fractulbold">Total mining</span>
          <div className="flex items-center mt-2">
            <img src={coinIcon} alt="Coin Icon" className="h-6 mr-2" />
            <span className="text-base font-fractulsemibold">{totalMining}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statspg;
