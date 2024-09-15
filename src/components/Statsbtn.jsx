// Stats.jsx
import React from 'react';
import { TfiStatsUp } from "react-icons/tfi";

const Statsbtn = () => {
  return (
    <button className="p-4  items-center flex flex-col">
    <span style={{ animation: 'bounce 1s infinite' }}> <TfiStatsUp size={20}/></span>
     <span className='text-[60%]'>Stats</span>
     </button>
  );
};

export default Statsbtn;
