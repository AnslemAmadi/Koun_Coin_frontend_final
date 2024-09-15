// Gamebtn.jsx
import React from 'react';
import { IoGameControllerOutline } from "react-icons/io5";

const Gamebtn = () => {
  return (
    <button className="p-4 items-center flex flex-col">
    <span style={{ animation: 'bounce 1s infinite' }}> <IoGameControllerOutline  size={20}/></span>
     <span className='text-[60%]'>Game</span>
     </button>
  );
};

export default Gamebtn;
{/*<button className="p-4  border-solid border-kc-bd border-2 rounded-3xl items-center flex flex-col">
<span style={{ animation: 'bounce 1s infinite' }}> <IoGameControllerOutline  size={20}/></span>
 <span className='text-[60%]'>Game</span>
 </button>*/}