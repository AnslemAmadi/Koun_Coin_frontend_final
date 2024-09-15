import React from 'react';
import { PiGiftBold } from "react-icons/pi";

const Airdropbtn = () => {
  return (
  <button className="p-4 border-solid border-kc-bd border-2 rounded-3xl items-center flex flex-col">
    <span style={{ animation: 'bounce 1s infinite' }}> <PiGiftBold  size={20}/></span>
    <span className='text-[60%]'>Airdrop</span>
    </button>
  );
};

export default Airdropbtn;
