import React from 'react'
import {assets} from '../assets/assets'
import {NavLink} from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='bg-[#003A10] min-h-screen pl-[4vw]'>
      <img src={assets.spotify_logo} className='mt-5 w-[max(10vw, 100px)] mr-5 hidden sm:block' alt="" />
      <img src={assets.spotify_logo} className='mt-5 w-[max(2vw, 40px)] mr-5 sm:hidden block' alt="" />
      <div className='flex flex-col gap-5 mt-10'>
        <NavLink  to="/add-song" className='flex items-center gap-2.5 text-white  font-black p-2 pr-[max(8vw,10px)] drop-shadow-[-2px_2px_#00FF5B] text-sm font-medium'
        >
          <img src={assets.add_song} className='w-5' alt="" />
          <p className='hidden sm:block'>Add Song</p>
        </NavLink>
        <NavLink  to="/list-song"  className='flex items-center gap-2.5 text-white  font-black p-2 pr-[max(8vw,10px)] drop-shadow-[-2px_2px_#00FF5B] text-sm font-medium'
        >
          <img src={assets.music} className='w-5' alt="" />
          <p className='hidden sm:block'>List Song</p>
        </NavLink>
        <NavLink  to="/add-album"  className='flex items-center gap-2.5 text-white  font-black p-2 pr-[max(8vw,10px)] drop-shadow-[-2px_2px_#00FF5B] text-sm font-medium'
        >
          <img src={assets.add_album} className='w-5' alt="" />
          <p className='hidden sm:block'>Add Album</p>
        </NavLink>
        <NavLink  to="/list-album"  className='flex items-center gap-2.5 text-white  font-black p-2 pr-[max(8vw,10px)] drop-shadow-[-2px_2px_#00FF5B] text-sm font-medium'
        >
          <img src={assets.add_album} className='w-5' alt="" />
          <p className='hidden sm:block'>List Album</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
