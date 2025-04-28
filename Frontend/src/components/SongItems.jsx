import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItems = ({ name, image, desc, id }) => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div
      onClick={() => playWithId(id)}
      className="group min-w-[160px] sm:min-w-[180px] md:min-w-[200px] p-3 m-4 overflow-x-scroll rounded-2xl cursor-pointer bg-[#181818] transition-all duration-300 overflow-hidden
                 shadow-[0_0_20px_3px_rgba(0,255,150,0.2)] hover:shadow-[0_0_30px_6px_rgba(0,255,150,0.5)] hover:scale-105"
    >
      {/* Image */}
      <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3 shadow-[0_0_10px_2px_rgba(0,255,150,0.25)] group-hover:shadow-[0_0_20px_4px_rgba(0,255,150,0.45)] transition-all duration-500">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl group-hover:brightness-110 group-hover:scale-105 transition-all duration-500 ease-in-out"
        />
      </div>

      {/* Title */}
      <p className="font-extrabold text-[16px] truncate text-white text-glow">
        {name}
      </p>

      {/* Description */}
      <p className="text-slate-400 text-[13px] mt-1 line-clamp-2">{desc}</p>
    </div>
  );
};

export default SongItems;
