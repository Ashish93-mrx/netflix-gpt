import { MdPlayCircle, MdInfoOutline } from "react-icons/md";

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
      <p className='hidden md:inline-block py-6 text-lg w-2/4'>{overview}</p>
      <div className='my-4 md:m-0 flex items-center'>
        <button className='bg-white flex items-center text-black py-1 md:py-4 px-1 md:px-12 text-xl rounded-lg hover:opacity-80'>
            <span><MdPlayCircle/></span><span> Play</span>
        </button>
        <button className='hidden md:flex mx-2  md:items-center bg-gray-500 opacity-50 text-white p-4 px-12 text-xl rounded'>
            <span><MdInfoOutline /></span><span>More Info</span>
        </button>
      </div>
    </div>
  )
}

export default VideoTitle
