import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Failed to fetch songs.");
    }
  }, []);

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/song/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Failed to remove song.");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-6 text-primary">🎵 All Songs List</h2>

      {/* Header Row */}
      <div className="hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 font-semibold">
        <p>Image</p>
        <p>Name</p>
        <p>Album</p>
        <p>Duration</p>
        <p>Action</p>
      </div>

      {/* Songs List */}
      {data.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-3 sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm"
        >
          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
          <p className="truncate">{item?.name}</p>
          <p className="truncate">{item?.album}</p>
          <p>{item?.duration}</p>
          <button
            onClick={() => removeSong(item._id)}
            className="text-red-500 hover:text-red-700 transition font-bold"
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListSong;
