// Earnbtn.jsx
import React from 'react';
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const Earnbtn = () => {
  return (
    <button className="p-4   items-center flex flex-col">
    <span style={{ animation: 'bounce 1s infinite' }}> <MdOutlineAccountBalanceWallet   size={20}/></span>
     <span className='text-[60%]'>Earn</span>
     </button>
  );
};

export default Earnbtn;
