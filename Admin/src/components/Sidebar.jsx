import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-[#003A10] min-h-screen p-5 flex flex-col gap-8">
      <img
        src={assets.spotify_logo}
        className="w-[max(12vw, 120px)] h-auto mx-auto sm:block transition-transform duration-300 transform hover:scale-110"
        alt="Spotify Logo"
      />
      <div className="flex flex-col gap-6 mt-10">
        <NavLink
          to="/add-song"
          className="flex items-center gap-4 text-white font-semibold p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#004f1b] hover:shadow-xl hover:shadow-[#00FF5B]/50"
        >
          <img
            src={assets.add_song}
            className="w-6 transition-transform duration-300 transform hover:scale-110"
            alt="Add Song"
          />
          <span className="hidden sm:block">Add Song</span>
        </NavLink>
        <NavLink
          to="/list-song"
          className="flex items-center gap-4 text-white font-semibold p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#004f1b] hover:shadow-xl hover:shadow-[#00FF5B]/50"
        >
          <img
            src={assets.music}
            className="w-6 transition-transform duration-300 transform hover:scale-110"
            alt="List Song"
          />
          <span className="hidden sm:block">List Song</span>
        </NavLink>
        <NavLink
          to="/add-album"
          className="flex items-center gap-4 text-white font-semibold p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#004f1b] hover:shadow-xl hover:shadow-[#00FF5B]/50"
        >
          <img
            src={assets.add_album}
            className="w-6 transition-transform duration-300 transform hover:scale-110"
            alt="Add Album"
          />
          <span className="hidden sm:block">Add Album</span>
        </NavLink>
        <NavLink
          to="/list-album"
          className="flex items-center gap-4 text-white font-semibold p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#004f1b] hover:shadow-xl hover:shadow-[#00FF5B]/50"
        >
          <img
            src={assets.add_album}
            className="w-6 transition-transform duration-300 transform hover:scale-110"
            alt="List Album"
          />
          <span className="hidden sm:block">List Album</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
