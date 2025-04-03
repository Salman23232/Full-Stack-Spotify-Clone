import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const { albumsData, songsData, playWithId } = useContext(PlayerContext);
  const [albumData, setAlbumData] = useState({});  // ✅ Default as an empty object

  useEffect(() => {
    const foundAlbum = albumsData.find((item) => item._id === id);
    if (foundAlbum) {
      setAlbumData(foundAlbum);
    }
  }, [albumsData, id]); // ✅ Fix dependencies

  return albumData.name ? ( // ✅ Ensure albumData is not empty
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt={albumData.name} />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img src={assets.spotify_logo} className="inline-block w-5" alt="Spotify Logo" />
            <b>Spotify</b> • 12,23,125 likes • <b>50 songs,</b> about 2 hr 30 min
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img src={assets.clock_icon} className="m-auto w-4" alt="Clock Icon" />
      </div>
      <hr />

      {songsData
        .filter((item) => item.album === albumData.name) // ✅ Fix filtering
        .map((item, index) => (
          <div
            key={item._id}
            onClick={() => playWithId(item._id)}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center cursor-pointer hover:bg-[#ffffff26]"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img src={item.image} className="inline w-10 mr-5" alt={item.name} />
              {item.name}
            </p>
            <p className="text-[15px] hidden">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
    </>
  ) : null;
};

export default DisplayAlbum;
