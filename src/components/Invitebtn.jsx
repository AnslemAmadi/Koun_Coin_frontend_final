// Invite.jsx
import React from 'react';
import { LiaUserFriendsSolid } from "react-icons/lia";

const Invitebtn = () => {
  return (
    <button className="p-4  items-center flex flex-col">
   <span style={{ animation: 'bounce 1s infinite' }}> <LiaUserFriendsSolid   size={20}/></span>
    <span className='text-[60%]'>Invite</span>
    </button>
  );
};

export default Invitebtn;
