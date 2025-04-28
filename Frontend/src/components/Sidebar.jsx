import React, { useState } from "react";
import { assets } from "../assets/assets";
import { FaBars } from "react-icons/fa6"; // Sidebar/Menu Icon

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className="relative flex">
      {/* Sidebar Toggle Button */}
      <button
        className="absolute lg:hidden top-4 left-4 z-50 p-2 bg-[#0f0f0f] text-green-400 rounded-full shadow-[0_0_10px_2px_rgba(0,255,150,0.4)] hover:scale-105 transition-all duration-300"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`h-[100vh] p-4 pt-16 text-white bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] 
                    ${openSidebar ? 'w-[250px] opacity-100' : 'w-0 opacity-0'} 
                    fixed top-0 left-0 z-40 transition-all duration-500 ease-in-out 
                    shadow-[0_0_30px_5px_rgba(0,255,150,0.25)]`}
      >
        {/* Top Links */}
        <div className="flex flex-col gap-4 bg-[#121212] rounded-xl p-4 shadow-[0_0_20px_5px_rgba(0,255,150,0.25)]">
          <div className="flex items-center gap-3 cursor-pointer text-glow hover:text-green-400 transition-all">
            <img src={assets.home_icon} alt="Home" className="w-5" />
            <p className="font-bold text-[16px]">Home</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer text-glow hover:text-green-400 transition-all">
            <img src={assets.search_icon} alt="Search" className="w-5" />
            <p className="font-bold text-[16px]">Search</p>
          </div>
        </div>

        {/* Library Section */}
        <div className="flex-1 bg-[#121212] rounded-xl p-4 flex flex-col gap-4 shadow-[0_0_20px_5px_rgba(0,255,150,0.25)]">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-glow">
              <img src={assets.stack_icon} className="w-6" alt="Library" />
              <p className="font-semibold text-[16px]">Your Library</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={assets.arrow_icon} className="w-4 cursor-pointer hover:scale-125 transition-transform" alt="Arrow" />
              <img src={assets.plus_icon} className="w-4 cursor-pointer hover:scale-125 transition-transform" alt="Plus" />
            </div>
          </div>

          {/* Playlist Card 1 */}
          <div className="bg-[#1f1f1f] p-4 rounded-xl flex flex-col gap-2 hover:shadow-[0_0_20px_4px_rgba(0,255,150,0.35)] transition-all">
            <h1 className="text-[14px] font-bold text-glow">Create your first playlist</h1>
            <p className="text-sm text-gray-400">It's easy, we'll help you</p>
            <button className="mt-2 px-5 py-2 bg-gradient-to-r from-green-400 to-green-500 text-black rounded-full text-sm font-bold hover:scale-105 transition-all">
              Create Playlist
            </button>
          </div>

          {/* Playlist Card 2 */}
          <div className="bg-[#1f1f1f] p-4 rounded-xl flex flex-col gap-2 hover:shadow-[0_0_20px_4px_rgba(0,255,150,0.35)] transition-all">
            <h1 className="text-[14px] font-bold text-glow">Follow your first podcast</h1>
            <p className="text-sm text-gray-400">We'll keep you updated on new episodes</p>
            <button className="mt-2 px-5 py-2 bg-gradient-to-r from-green-400 to-green-500 text-black rounded-full text-sm font-bold hover:scale-105 transition-all">
              Browse Podcasts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
