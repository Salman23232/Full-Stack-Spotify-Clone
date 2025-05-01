import { useCallback, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!song || !image || !name || !desc) {
      toast.error("Please fill out all fields.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("album", album);

      const { data } = await axios.post("http://localhost:4000/api/song/add", formData);
      if (data.success) {
        toast.success("🎉 Song added successfully!");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(null);
        setSong(null);
      } else {
        toast.error("Failed to add song.");
      }
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadAlbumData = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/album/list");
      if (data.success) {
        setAlbumData(data.albums);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    loadAlbumData();
  }, [loadAlbumData]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-white p-10 rounded-3xl shadow-2xl max-w-3xl mx-auto mt-12 flex flex-col gap-8 animate-fadeIn border border-gray-200 transition-all hover:shadow-3xl"
    >
      <h2 className="text-4xl font-bold text-primary text-center mb-6 animate-slideInUp">
        🎶 Upload New Song
      </h2>

      {/* Upload Areas */}
      <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
        {/* Song Upload */}
        <div className="flex flex-col items-center gap-4 group">
          <p className="text-gray-700 font-semibold">Upload Audio</p>
          <input
            onChange={(e) => setSong(e.target.files?.[0] || null)}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song" className="cursor-pointer transition-transform hover:scale-105">
            <div className="w-48 h-40 flex justify-center items-center rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary bg-gray-50 shadow-md overflow-hidden relative">
              <img
                src={song ? assets.songUploaded : assets.audios_upload}
                alt="Upload Song"
                className="w-20 h-20 object-contain animate-bounce"
              />
            </div>
          </label>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col items-center gap-4 group">
          <p className="text-gray-700 font-semibold">Upload Cover</p>
          <input
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
          <label htmlFor="image" className="cursor-pointer transition-transform hover:scale-105">
            <div className="w-48 h-40 flex justify-center items-center rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary bg-gray-50 shadow-md overflow-hidden relative">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload Cover"
                className="w-full h-full object-cover rounded-xl transition-transform group-hover:scale-110"
              />
            </div>
          </label>
        </div>
      </div>

      {/* Input Fields */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-700 font-semibold">Song Name</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter the song name..."
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-700 font-semibold">Song Artist</p>
          <input
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            placeholder="Justin..."
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-700 font-semibold">Select Album</p>
          <select
            onChange={(e) => setAlbum(e.target.value)}
            value={album}
            className="p-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="none">None</option>
            {albumData.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 mt-6 rounded-xl bg-green-600 from-primary to-secondary text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
        }`}
      >
        {loading ? "Uploading..." : "Add Song"}
      </button>
    </form>
  );
};

export default AddSong;
