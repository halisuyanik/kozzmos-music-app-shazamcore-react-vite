import SongBar from './SongBar';
const RelatedSongs = ({data, artistId, isPlaying, activeSong, handlePlayClick, handlePauseClick}) => (
  <div className='flex flex-col'>
    <h1 className='font-bold text-3xl text-white'>Önerilen parçalar:</h1>
    <div className='mt-6 w-full flex flex-col'>
      {data?.map((song, i)=>(<SongBar key={`${song.key}-${artistId}`} 
      song={song} i={i} artistId={artistId} isPlaying={isPlaying} activeSong={activeSong} handlePlayClick={handlePlayClick} handlePauseClick={handlePauseClick}></SongBar>))}
    </div>
  </div>
);

export default RelatedSongs;
