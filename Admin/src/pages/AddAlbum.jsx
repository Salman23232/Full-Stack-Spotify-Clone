import { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColor", color);

      const response = await axios.post(`http://localhost:4000/api/album/add`, formData);

      if (response.data.success) {
        toast.success("Album added successfully!");
        setName("");
        setDesc("");
        setImage(null);
        setColor("#ffffff");
      } else {
        toast.error("Error adding album!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong while adding album.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto my-10 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Add New Album</h2>

      {/* Upload Image */}
      <div className="flex flex-col gap-2">
        <p className="text-gray-600 font-medium">Upload Cover Image</p>
        <input
          type="file"
          id="image"
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="Upload Cover"
            className="w-32 h-32 object-cover rounded-xl border-2 border-dashed border-gray-300 hover:border-green-500 transition"
          />
        </label>
      </div>

      {/* Album Name */}
      <div className="flex flex-col gap-2">
        <p className="text-gray-600 font-medium">Album Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter album name..."
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Album Description */}
      <div className="flex flex-col gap-2">
        <p className="text-gray-600 font-medium">Album Description</p>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter album description..."
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Background Color Picker */}
      <div className="flex flex-col gap-2">
        <p className="text-gray-600 font-medium">Background Color</p>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-16 h-10 p-1 rounded-md border border-gray-300 cursor-pointer"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-md mt-4"
      >
        Add Album
      </button>
    </form>
  );
};

export default AddAlbum;
