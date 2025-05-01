import React from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { Music2 } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-[#003A10] min-h-screen p-5 flex flex-col gap-8">
      <h2 className="text-xl font-bold mb-16 px-2 text-green-400 tracking-wider flex items-center gap-2 font-sans">
        <Link to={'/'} className="bg-[#0f0f0f] w-8 h-8 flex justify-center items-center text-green-400 rounded-full shadow-[0_0_10px_2px_rgba(0,255,150,0.4)] hover:scale-105 transition-all duration-300">
          <Music2 size={20} />
        </Link>
        Musify
      </h2>
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
