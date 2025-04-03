import { useEffect, useRef, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { PlayerContext } from '../context/PlayerContext';

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes('album');

  const albumId = isAlbum ? location.pathname.split('/').filter(Boolean).pop() : null;
  console.log("Album ID:", albumId, "Albums Data:", albumsData);

  const album = Array.isArray(albumsData) ? albumsData.find((x) => albumId === x._id) : null;
  const bgColor = album?.bgColor || '#121212';

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum
        ? `linear-gradient(${bgColor}, #121212)`
        : `#121212`;
    }
  }, [isAlbum, bgColor]); 

  if (!albumsData || albumsData.length === 0) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:left-0">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={album ? <DisplayAlbum album={album} /> : <div>Album not found</div>} />
      </Routes>
    </div>
  );
};

export default Display;
