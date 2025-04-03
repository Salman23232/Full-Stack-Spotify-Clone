import { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddAlbum = () => {
  const [image, setImage] = useState(false)
  const [color, setColor] = useState("#ffffff")
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [loading, setLoading] = useState(false)
  const onsubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('bgColor', color);
      const response = await axios.post(`http://localhost:4000/api/album/add`,formData)
      if (response.data.success) {
        toast.success("Album added")
        setLoading(false)
        setDesc("");
        setImage(false)
        setName("");
      }else{
      toast.error('Error!!')
      }
    } catch (error) {
      toast.error('Something went wrong ',error.message)
      
    }
  }
  
  return loading ? (
    <div className='flex justify-center place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
    </div>
  ) : (
    <form onSubmit={onsubmitHandler}className='flex flex-col items-start gap-8 text-gray-600'>
      <div>
        <p>Upload Image</p>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden/>
        <label htmlFor="image">
          <img src={image? URL.createObjectURL(image):assets.upload_area} className='w-24 cursor-pointer' alt="" />
        </label>
      </div>
      <div className='flex flex-col gap-2'>
        <p>Album name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='bg-transparent outline-green-600 border border-gray-400 p-2 w-[max(40vw,250px)]' placeholder='Type here...' />
      </div>
      <div className='flex flex-col gap-2'>
        <p>Album description</p>
        <input onChange={(e)=>setDesc(e.target.value)} value={desc} type="text" className='bg-transparent outline-green-600 border border-gray-400 p-2 w-[max(40vw,250px)]' placeholder='Type here...' />
      </div>
      <div className='flex flex-col gap-2'>
        <p>Background color</p>
        <input type="color" onChange={(e) => setColor(e.target.value)} value={color}/>
      </div>
      <button className='text-base bg-black text-white py-2.5 px-14 cursor-pointer' type='submit'>
        ADD
      </button>
    </form>
  )
}

export default AddAlbum
