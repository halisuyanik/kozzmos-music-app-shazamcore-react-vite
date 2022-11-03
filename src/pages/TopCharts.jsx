import React from 'react';
import {useSelector} from 'react-redux';
import {SongCard, Loader, Error} from '../components';
import {useGetTopChartsQuery} from '../services/shazamCore';

const TopCharts=()=>{

    const {activeSong, isPlaying}=useSelector((state)=>state.player)
    const {data, isFetching, error}=useGetTopChartsQuery();
    if(isFetching)return <Loader title='Popüler listeler yükleniyor...'></Loader>
    if(error) return <Error></Error>
    
    return(
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Son zamanların popüler parçalarını keşfet {' '}</h2>
            <div className='flex flex-wrap sm:justify-center gap-8'>
                {data?.map((song, i)=>(
                    <SongCard key={song.key} data={data} i={i} song={song} activeSong={activeSong} isPlaying={isPlaying}></SongCard>
                ))}
            </div>
        </div>
    )
}
export default TopCharts;
