import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { UserButton } from "@clerk/clerk-react";

import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import { assets } from "../assets/assets";


const DisplayAlbum = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const { albumsData, songsData, playWithId } = useContext(PlayerContext);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    if (albumsData.length) {
      const foundAlbum = albumsData.find((a) => a._id === id);
      setAlbum(foundAlbum || null);
    }
  }, [albumsData, id]);

  const bgColor = album?.bgColor || "#121212";
  if (!album)
    return (
      <div className="text-white p-4 ml-[250px] mt-[80px]">Album not found</div>
    );

  return (
    <>

      <div
        className="p-4 md:p-14 pb-[90px] min-h-screen md:ml-[250px] scale-[1.15] z-0"
        style={{ background: `linear-gradient(${bgColor}, #121212)` }}
      >
          <div className="z-50 p-5">

<div className="w-full flex justify-between items-center font-semibold ">
  <div className="flex items-center gap-2">
    <img
      onClick={() => navigate(-1)}
      src={assets.arrow_left}
      className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
      alt=""
    />
    <img
      onClick={() => navigate(1)}
      src={assets.arrow_right}
      className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
      alt=""
    />
  </div>
  <div className="flex items-center gap-4">
    <Link to='http://localhost:5174/add-song'>
    <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden z-50 md:block cursor-pointer">
      Dashboard
    </p>
    </Link>
    <UserButton/>
  </div>
</div>
</div>

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 md:items-end px-6 mt-4">
          <img
            className="w-48 h-48 object-cover rounded-lg shadow-lg"
            src={album.image}
            alt={album.name}
          />
          <div className="text-white flex flex-col gap-2">
            <p className="uppercase text-sm text-[#b3b3b3]">Playlist</p>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              {album.name}
            </h2>
            <p className="text-[#ccc]">{album.desc}</p>
            <p className="text-sm text-[#a7a7a7] mt-2 flex items-center gap-2">
              <img
                src={assets.spotify_logo}
                className="inline-block w-5"
                alt="Spotify Logo"
              />
              <span>
                <b>Spotify</b> • 12.2M likes • <b>50 songs,</b> 2 hr 30 min
              </span>
            </p>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 mt-10 mb-2 px-6 text-[#b3b3b3] text-sm font-semibold">
          <p className="col-span-2 flex items-center gap-2">
            <span>#</span> <span>Title</span>
          </p>
          <p className="hidden sm:block">Date Added</p>
          <div className="flex justify-end">
            <img src={assets.clock_icon} className="w-4" alt="Duration" />
          </div>
        </div>
        <hr className="border-[#333] mx-6" />

        {/* Song List */}
        <div className="mt-4 px-6 overflow-y-auto max-h-[60vh] scale-95 px-2">
          {songsData
            .filter((song) => song.album === album.name)
            .map((song, index) => (
              <div
                key={song._id}
                onClick={() => playWithId(song._id)}
                className="grid grid-cols-4 gap-4 items-center py-3 cursor-pointer hover:bg-[#ffffff1a] transition duration-200"
              >
                <div className="col-span-2 flex items-center gap-4 text-white">
                  <span className="text-[#a7a7a7]">{index + 1}</span>
                  <img
                    src={song.image}
                    className="w-10 h-10 rounded object-cover"
                    alt={song.name}
                  />
                  <span className="text-[15px] w-72 font-medium">{song.name}</span>
                </div>
                <p className="text-[14px] text-[#b3b3b3] hidden sm:block">
                  5 days ago
                </p>
                <p className="text-[14px] text-[#b3b3b3] text-right">
                  {song.duration}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default DisplayAlbum;
