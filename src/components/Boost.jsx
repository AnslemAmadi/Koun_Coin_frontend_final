import React from 'react';
import { MdOutlineRocketLaunch } from "react-icons/md";

const Boost = () => {
  return( 
  <button className="p-4  border-solid border-kc-bd border-2 rounded-3xl items-center flex flex-col ">
  <span style={{ animation: 'bounce 1s infinite' }}><MdOutlineRocketLaunch  size={20}/></span>
  <span className='text-[60%]'>Boost</span>
  </button>
);
  };

export default Boost;
