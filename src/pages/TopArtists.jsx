import React from 'react';
import {ArtistCard, Loader, Error} from '../components';
import {useGetTopChartsQuery} from '../services/shazamCore';

const TopArtists=()=>{

    const {data, isFetching, error}=useGetTopChartsQuery();
    if(isFetching)return <Loader title='Popüler listeler yükleniyor...'></Loader>
    if(error) return <Error></Error>
    
    return(
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Son zamanların popüler sanatçılarını keşfet {' '}</h2>
            <div className='flex flex-wrap sm:justify-center gap-8'>
                {data?.map((track)=>(
                    <ArtistCard key={track.key} track={track}></ArtistCard>
                ))}
            </div>
        </div>
    )
}
export default TopArtists;
