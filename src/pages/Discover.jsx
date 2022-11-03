import {Error, Loader, SongCard} from '../components';
import {genres} from '../assets/constants';

import { useGetSongsByGenreQuery} from '../services/shazamCore';
import {useDispatch, useSelector} from 'react-redux';
import { selectGenreListId } from '../redux/features/playerSlice';



const Discover = () => {
    
    

    
    const dispatch=useDispatch();
    const {activeSong, isPlaying, genreListId} =useSelector((state)=>state.player);
    const {data, isFetching, error}=useGetSongsByGenreQuery(genreListId || 'POP');
    
    const genreTitle=genres.find(({value})=>value===genreListId)?.title;
    if(isFetching) return <Loader title="Yükleniyor..."/>
    if(error) return <Error></Error>
    return(
        <div className='flex flex-col'>
            <div className='w-full flex justify-between items-center flex-col mb-10 mt-4 sm:flex-row'>
                <h2 className='text-3x1 font-bold text-white text-left'>Keşfet {genreTitle}</h2>
                <select onChange={(e)=>dispatch(selectGenreListId(e.target.value))} value={genreListId || 'Pop'} className=' rounded-lg outline-none bg-green text-white  sm:mt-0 mt-5 p-3 text-sm'>
                    {genres.map((genre)=><option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>
            </div>

            <div className='gap-8 flex flex-wrap sm:justify-start justify-center'>
                {data?.map((song, i)=>(
                    <SongCard activeSong={activeSong} isPlaying={isPlaying} data ={data} key={song.key} song={song} i={i}></SongCard>
                
                    
                ))}
            </div>

        </div>
        
    )
}

    


export default Discover;
