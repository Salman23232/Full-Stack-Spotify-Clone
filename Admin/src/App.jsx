import React from 'react'
import { Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AddSong from './pages/AddSong';
import AddAlbum from './pages/AddAlbum';
import ListSong from './pages/ListSong';
import ListAlbum from './pages/ListAlbum';

const App = () => {
  return (
    <div className='flex items-start min-h-screen'>
      <ToastContainer/>
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path='/add-song' element={<AddSong/>}/>
            <Route path='/add-album' element={<AddAlbum/>}/>
            <Route path='/list-song' element={<ListSong/>} />
            <Route path='/list-album' element={<ListAlbum/>}/>
            
          </Routes>
        </div>
      </div>

    </div>
  )
}

export default App