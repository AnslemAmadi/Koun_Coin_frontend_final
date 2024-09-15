import React, { useContext } from 'react';
import { PiDog } from "react-icons/pi";
import { Coincontext } from '../components/data/Coincontext'; // Import the context

const Avatabtn = () => {
  const { currentLevel, user } = useContext(Coincontext); // Assume user data is available

  return (
    <button className="p-6 border-solid border-kc-bd border-2 rounded-3xl items-center flex flex-col">
      <span style={{ animation: 'bounce 1s infinite' }}><PiDog size={20} /></span>
    {/*   <span className='text-xs'>{user.name} (ID: {user.id})</span> Display user data */} {/*dont delete this is meant for backend*/}
      <div className='flex space-x-1'>
        <span className='text-xs'> {currentLevel.level} :</span>
        <span className='text-xs'>{currentLevel.name}</span>
      </div>
    </button>
  );
};

export default Avatabtn;
