import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {DetailsHeader, Error, Loader, RelatedSongs} from '../components';
import { useGetArtistDetailsQuery, useGetSongRelatedQuery, useGetSongDetailsQuery } from '../services/shazamCore';
const ArtistDetails = () => {

    const {id:artistId}=useParams();
    const {activeSong, isPlaying}=useSelector((state)=>state.player)
    const {data:artistData, isFetching:isFetchingArtistDetails, error}=useGetArtistDetailsQuery(artistId);

    if (isFetchingArtistDetails) return <Loader title='Sanatçı detayı yükleniyor...'></Loader>
    if (error) return <Error></Error>
    
    return(
        <div className='flex flex-col'>
            <DetailsHeader artistId={artistId} artistData={artistData}></DetailsHeader>

            <RelatedSongs data={Object.values(artistData?.songs)} artistId={artistId} isPlaying={isPlaying} activeSong={activeSong} >
            </RelatedSongs>
        </div>
    )
}

export default ArtistDetails;