import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navButtons } from './data/Navdata';

const Navigation = () => {
  const location = useLocation();

  return (
    <div className="flex justify-around ">
      {navButtons.map((button) => (
        <Link
          key={button.label}
          to={button.route}
          className={`rounded items-center flex flex-col ${
            location.pathname === button.route ? 'bg-purple-700 text-white' : 'bg-transparent text-white'
          }`}
        >
          {React.createElement(button.component)}
          <span className='text-[0%]'>{button.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
