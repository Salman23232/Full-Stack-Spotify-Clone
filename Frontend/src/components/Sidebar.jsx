import React from "react";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="rounded flex flex-col justify-around bg-[#121212] h-[15%]">
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
            <img src={assets.home_icon} alt="" className="w-6" />
            <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
            <img src={assets.search_icon} alt="" className="w-6" />
            <p className="font-bold">Search</p>
        </div>
      </div>
      <div className="rounded bg-[#121212] h-[85%]">
        <div className="p-4 flex item-center justify-between">
            <div className="flex items-center gap-3">
                <img src={assets.stack_icon} className="w-8" alt="" />
                <p className="font-semibold">Your Library</p>
            </div>
            <div className="flex item-center gap-3">
                <img src={assets.arrow_icon} className="w-5" alt="" />
                <img src={assets.plus_icon} className="w-5" alt="" />
            </div>
        </div>
        <div className="p-4 m-2 rounded font-semibold flex flex-col bg-[#242424] items-start justify-start gap-1 pl-4">
        <h1>Create your first playlist</h1>
        <p className="font-light">Its easy we will help you</p>
        <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Create Playlist</button>
        </div>
        <div className="p-4 m-2 rounded font-semibold flex flex-col bg-[#242424] items-start justify-start gap-1 pl-4">
        <h1>Create your first playlist</h1>
        <p className="font-light">we'll keep you update on new episodes</p>
        <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Browse podcasts</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
