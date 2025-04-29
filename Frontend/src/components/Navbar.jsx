import { UserButton } from "@clerk/clerk-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
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
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Dashboard
          </p>
          </Link>
          <UserButton/>
        </div>
      </div>
    </>
  );
};

export default Navbar;
