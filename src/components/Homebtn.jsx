// Home.jsx
import React from 'react';
import { RiHome5Line } from "react-icons/ri";

const Homebtn = () => {
  return (
    <button className="p-4  items-center flex flex-col">
   <span style={{ animation: 'bounce 1s infinite' }}> <RiHome5Line size={20}/></span>
    <span className='text-[60%]'>Home</span>
    </button>
  );
};

export default Homebtn;
