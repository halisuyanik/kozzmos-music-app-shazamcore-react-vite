import {FaPauseCircle, FaPlayCircle} from 'react-icons/fa';
const PlayPause = ({handlePlay, handlePause, isPlaying, activeSong, song}) => (isPlaying && activeSong?.title===song.title?(
  <FaPauseCircle onClick={handlePause} className='text-gray-300' size={35}>

  </FaPauseCircle>
):(
  <FaPlayCircle onClick={handlePlay} className='text-gray-300' size={35}>

  </FaPlayCircle>))
export default PlayPause;
