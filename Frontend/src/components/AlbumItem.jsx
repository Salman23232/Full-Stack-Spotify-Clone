import { useNavigate } from 'react-router-dom';

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="group min-w-[180px] scale-90 p-3 m-4 overflow-hidden rounded-2xl cursor-pointer bg-[#181818] transition-all duration-300 shadow-[0_0_20px_3px_rgba(0,255,150,0.2)] hover:shadow-[0_0_30px_6px_rgba(0,255,150,0.5)] hover:scale-95"
    >
      {/* Image with Neon Effect */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-3 shadow-[0_0_10px_2px_rgba(0,255,150,0.25)] group-hover:shadow-[0_0_20px_4px_rgba(0,255,150,0.45)] transition-all duration-500">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl group-hover:brightness-110 group-hover:scale-105 transition-all duration-500 ease-in-out"
        />
      </div>

      {/* Title with Glowing Effect */}
      <p className="font-extrabold text-[16px] truncate text-white text-glow group-hover:text-green-400 transition-all duration-300">
        {name}
      </p>

      {/* Description with adjusted text style */}
      <p className="text-slate-400 text-sm mt-1 line-clamp-2">{desc}</p>
    </div>
  );
};

export default AlbumItem;
