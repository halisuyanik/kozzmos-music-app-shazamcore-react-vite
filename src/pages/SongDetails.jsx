import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {DetailsHeader, Error, Loader, RelatedSongs} from '../components';
import { useGetSongDetailsQuery } from '../services/shazamCore';
import {useGetSongRelatedQuery} from '../services/shazamCore';
const SongDetails = () => {
    const handlePlayClick=()=>{
        dispatch(setActiveSong({song, data,i}));
        dispatch(playPause(true));
    }
    const handlePauseClick=()=>{
        dispatch(playPause(false));
    }
    const dispatch=useDispatch();
    const {songid}=useParams();
    const {activeSong, isPlaying}=useSelector((state)=>state.player)
    const {data:songData, isFetching:isFetchingSongDetails}=useGetSongDetailsQuery({songid});
    const {data, isFetching:isFetchingRelatedSongs, error}=useGetSongRelatedQuery({songid});
    if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title='Şarkı detayı yükleniyor...'></Loader>
    if (error) return <Error></Error>
    
    return(
        <div className='flex flex-col'>
            <DetailsHeader artistId='' songData={songData}></DetailsHeader>
            <div className='mb-10'>
                <h2 className='text-white text-3xl font-bold'>Sözler:</h2>
            </div>
            <div className='mt-5'>
                {songData?.sections[1].type==='LYRICS' ? songData?.sections[1].text.map((line, i)=>(
                    <p className=' text-slate-300 text-base my-1'>{line}</p>
                )):<p className=' text-slate-300 text-base my-1'>Bu parçanın sözleri yok.</p>}
            </div>
            <RelatedSongs data={data} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePauseClick}>
            </RelatedSongs>
        </div>
    )
}

export default SongDetails;
