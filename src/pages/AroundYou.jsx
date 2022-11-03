import React from 'react';

import {SongCard, Loader, Error} from '../components';
import axios from 'axios';
import { useState,useEffect } from 'react';
import {useGetSongsByCountryQuery} from '../services/shazamCore';
import {useDispatch, useSelector} from 'react-redux';
const ArroundYou=()=>{
    const [country, setCountry]=useState('');
    const [loading, setLoading]=useState(true);
    const dispatch=useDispatch();
    const {activeSong, isPlaying} =useSelector((state)=>state.player);
    const {data, isFetching, error}=useGetSongsByCountryQuery(country);
    
    useEffect(()=>{
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_GEO_IP_API_KEY}`)
        .then((res)=>setCountry(res?.data?.location?.country))
        .catch((err)=>console.log(err)).finally(()=>setLoading(false))
    },[country])
    if(isFetching && loading)return <Loader title='Çevrende popüler olan parçalar yükleniyor...'></Loader>
    if(error && country) return <Error></Error>
    
    return(
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Şuan Çevrende Popüler {' '}
            <span className='font-black'>{country}</span></h2>
            <div className='flex flex-wrap sm:justify-center gap-8'>
                {data?.map((song, i)=>(
                    <SongCard key={song.key} data={data} i={i} song={song} activeSong={activeSong} isPlaying={isPlaying}></SongCard>
                ))}
            </div>
        </div>
    )
}
export default ArroundYou;
