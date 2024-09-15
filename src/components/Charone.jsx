// Charone.jsx
import React, { useContext } from 'react';
import { Coincontext } from '../components/data/Coincontext'; // Import the context

const Charone = () => {
  const { tapMultiplier } = useContext(Coincontext); // Get the tapMultiplier from context

  return (
    <div className="absolute text-4xl text-gray-200 font-fractulsemibold animate-moveUp">
      +{tapMultiplier} {/* Display the updated tap multiplier */}
    </div>
  );
};

export default Charone;
