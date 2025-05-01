import { UserButton } from "@clerk/clerk-react";
import { assets } from "../assets/assets";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 z-20 w-full px-6 py-4 bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="flex justify-between px-6 md:px-0 items-center max-w-7xl mx-auto">
        

        {/* ← → Nav Arrows */}
        <div className="flex items-center gap-4">
          {[assets.arrow_left, assets.arrow_right].map((icon, idx) => (
            <img
              key={idx}
              onClick={() => navigate(idx === 0 ? -1 : 1)}
              src={icon}
              alt="nav arrow"
              className="w-10 h-10 p-2 rounded-full cursor-pointer bg-[#1f1f1f] hover:scale-110 transition-all duration-300 shadow-[0_0_12px_#00ffd5aa] hover:shadow-[0_0_20px_#00ffd5]"
            />
          ))}
        </div>

        {/* Right Side: Dashboard + User */}
        <div className="flex items-center gap-5 lg:mr-60">

          {/* Dashboard Button */}
          <Link to="http://localhost:5174/add-song">
            <button className="relative px-5 py-2 rounded-full bg-gradient-to-tr from-[#00ffc3] via-[#00ffe0] to-[#00b7ff] text-black font-bold text-sm shadow-[0_0_20px_#00ffc3] hover:scale-105 transition-all duration-300">
              <span className="absolute inset-0 opacity-20 blur-md bg-gradient-to-tr from-[#00ffc3] to-[#00b7ff] rounded-full"></span>
              <span className="relative z-10">Dashboard</span>
            </button>
          </Link>

          {/* User Avatar with glow */}
            <UserButton className='scale-110'/>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
