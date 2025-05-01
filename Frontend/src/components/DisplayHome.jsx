import { useContext, useRef, useState } from 'react';
import Sidebar2 from './sidebar2';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItems from './SongItems';
import { PlayerContext } from '../context/PlayerContext';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icon library (you can use others too)

const Slider = ({ children, title }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({
      left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="my-6 relative">
      <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-[40%] z-10 bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90"
        >
          <ChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
        >
          {children}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-[40%] z-10 bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  const [tab, setTab] = useState('all');

  if (!songsData || songsData.length === 0) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black fixed inset-0">
      <Sidebar2 />

      <div className="flex-1 ml-0 lg:ml-[250px] flex flex-col overflow-y-auto scroll-smooth">
        <Navbar />

        <div className="flex items-center gap-3 mt-20 px-4 z-50">
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

        <div className="px-4 mt-8 mb-12">
          {(tab === 'all' || tab === 'musics') && (
            <Slider title="Today's Biggest Hits">
              {songsData.map((item, index) => (
                <SongItems
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                />
              ))}
            </Slider>
          )}

          {(tab === 'all' || tab === 'albums') && (
            <Slider title="Featured Charts">
              {albumsData.map((item, index) => (
                <AlbumItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayHome;
