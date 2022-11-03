import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from "react";
import {playPause, setActiveSong} from '../redux/features/playerSlice';
import PlayPause from './PlayPause';
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import {useGetTopChartsQuery} from '../services/shazamCore';

const TopChart=({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className='w-full flex flex-row items-center hover:bg-green py-2 p-4 rounded-lg cursor-pointer mb-2'>
    <h3 className='font-bold text-base  text-white mr-3'>{i+1}</h3>
    <div className='flex-1 flex flex-row justify-between items-center'>
      <img className='w-20 h-20 rounded-lg' src={song?.images?.coverart} alt={song?.title}></img>
      <div className='flex-1 flex flex-col justify-center mx-3'>
        <Link to={`/songs/${song.key}`}>
          <p className='text-xl font-bold text-white'>{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className='text-base font-bold text-gray-300 mt-1'>{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause handlePlay={handlePlayClick} handlePause={handlePauseClick} activeSong={activeSong} 
    song={song} isPlaying={isPlaying}></PlayPause>
  </div>
)
const TopPlay = () => {

  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

 

  const topPlays = data?.slice(0, 5);

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  },[]);

  return (
    <div ref={divRef} className="xl:ml-6  ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col ">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top 5</h2>
          <Link to="/top-charts">
            <p className="text-slate-300  text-base cursor-pointer">Daha fazla</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChart key={song.key} song={song} i={i}
            handlePauseClick={handlePauseClick}handlePlayClick={() => handlePlayClick(song, i)}
            activeSong={activeSong} isPlaying={isPlaying}></TopChart>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top 5</h2>
          <Link to="/top-artists">
            <p className="text-slate-300 text-base cursor-pointer">Daha fazla</p>
          </Link>
        </div>

        <Swiper slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.slice(0, 5).map((artist) => (
            <SwiperSlide key={artist?.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${artist?.artists[0].adamid}`}>
                <img src={artist?.images?.background} alt="Name" className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};


export default TopPlay;
