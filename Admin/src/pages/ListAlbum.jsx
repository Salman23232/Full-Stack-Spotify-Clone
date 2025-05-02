import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = useCallback(async () => {
    try {
      const response = await axios.get(`https://full-stack-spotify-clone-4.onrender.com/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(
        `https://full-stack-spotify-clone-4.onrender.com/api/album/remove`,
        { id }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      }
    } catch (error) {
      toast.error("Error!!", error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-6 text-primary">🎵 All Albums List</h2>

      {/* Header Row */}
      <div className="hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 font-semibold">
        <p>Image</p>
        <p>Name</p>
        <p>Description</p>
        <p>Album Color</p>
        <p>Action</p>
      </div>

      {/* Albums List */}
      {data.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-3 sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm"
        >
          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
          <p className="truncate">{item?.name}</p>
          <p className="truncate">{item?.desc}</p>
          <input type="color" value={item.bgColor} className="w-12 h-12" />
          <button
            onClick={() => removeAlbum(item._id)}
            className="text-red-500 hover:text-red-700 transition font-bold"
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListAlbum;
