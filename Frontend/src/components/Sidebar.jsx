import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Music2 } from "lucide-react";
import {Link} from 'react-router-dom'

const Sidebar2 = () => {
  const { songsData, playWithId, track } = useContext(PlayerContext);

  return (
    <div className="hidden md:flex">
      <div className="h-screen w-[250px] p-4 pt-8 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] text-white fixed top-0 left-0 z-40 shadow-[0_0_30px_5px_rgba(0,255,150,0.25)] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent">
        <h2 className="text-xl font-bold mb-16 px-2 text-green-400 tracking-wider flex items-center gap-2 font-sans">
          <Link to={'/'}
                  className="bg-[#0f0f0f] w-8 h-8 flex justify-center items-center text-green-400 rounded-full shadow-[0_0_10px_2px_rgba(0,255,150,0.4)] hover:scale-105 transition-all duration-300"
                >
                  <Music2 size={20} />
                </Link>
          Musify
          </h2>

        <div className="flex flex-col gap-3">
          {songsData?.map((song) => (
            <div
              key={song._id}
              onClick={() => playWithId(song._id)}
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105
                ${track?._id === song._id
                  ? "bg-green-500/20 border border-green-400 text-green-300 shadow-[0_0_15px_rgba(0,255,150,0.4)]"
                  : "hover:bg-white/10 hover:text-green-300"}`}
            >
              <img
                src={song.image}
                alt={song.name}
                className="w-12 h-12 rounded-full object-cover shadow-[0_0_10px_rgba(0,255,150,0.5)] hover:shadow-[0_0_15px_rgba(0,255,150,0.7)] transition-all duration-300"
              />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">{song.name}</p>
                <p className="text-sm truncate">{song.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar2;
