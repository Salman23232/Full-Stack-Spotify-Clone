import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItems from './SongItems';
import { useContext, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  const [tab, setTab] = useState('all');

  if (!songsData || songsData.length === 0) {
    return <div className="text-center text-white mt-20">Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      
      {/* Sidebar (always visible on lg) */}
      <div className="hidden lg:block w-[250px] fixed top-0 left-0 h-full z-20 bg-black text-white">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-0 lg:ml-[250px] flex flex-col overflow-y-auto">
        
        {/* Navbar */}
        <Navbar />

        {/* Tab Buttons */}
        <div className="flex items-center gap-3 mt-6 px-4">
          {['all', 'albums', 'musics'].map((type) => (
            <button
              key={type}
              onClick={() => setTab(type)}
              className={`px-4 py-1 rounded-2xl font-semibold transition-all duration-300 ${
                tab === type ? 'bg-green-400 text-black' : 'bg-black text-white'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-4 mt-8 mb-12">
          
          {tab === 'all' && (
            <>
              {/* Songs Section */}
              <h1 className="my-8 font-bold text-2xl text-white">Today's Biggest Hits</h1>
              <div className="grid grid-cols-1 sm:flex sm:overflow-x-auto scrollbar-hide gap-4">
                {songsData.map((item, index) => (
                  <SongItems
                    key={index}
                    name={item.name}
                    desc={item.desc}
                    id={item._id}
                    image={item.image}
                  />
                ))}
              </div>

              {/* Albums Section */}
              <h1 className="my-8 font-bold text-2xl text-white">Featured Charts</h1>
              <div className="grid grid-cols-1 sm:flex sm:overflow-x-auto scrollbar-hide gap-4">
                {albumsData.map((item, index) => (
                  <AlbumItem
                    key={index}
                    name={item.name}
                    desc={item.desc}
                    id={item._id}
                    image={item.image}
                  />
                ))}
              </div>
            </>
          )}

          {tab === 'albums' && (
            <>
              <h1 className="my-8 font-bold text-2xl text-white">Podcast Albums</h1>
              <div className="grid grid-cols-1 sm:flex sm:overflow-x-auto scrollbar-hide gap-4">
                {albumsData.map((item, index) => (
                  <AlbumItem
                    key={index}
                    name={item.name}
                    desc={item.desc}
                    id={item._id}
                    image={item.image}
                  />
                ))}
              </div>
            </>
          )}

          {tab === 'musics' && (
            <>
              <h1 className="my-8 font-bold text-2xl text-white">Songs Collection</h1>
              <div className="grid grid-cols-1 sm:flex sm:overflow-x-auto scrollbar-hide gap-4">
                {songsData.map((item, index) => (
                  <SongItems
                    key={index}
                    name={item.name}
                    desc={item.desc}
                    id={item._id}
                    image={item.image}
                  />
                ))}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default DisplayHome;
