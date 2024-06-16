import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';

import { setHeaderHidden } from '../redux/slices/headerSlice';
import Tracks from '../components/Tracks';
import Trends from '../components/Trends';

import AlbumPageHeader from '../components/AlbumPageHeader';

import '../scss/Album.scss';

const Album = () => {
  const valueCurrAlbum = useSelector((state) => state.albums.currAlbum);
  const albumIdRedux = useSelector((state) => state.albums.albumId);
  const [album, setAlbum] = React.useState([]);
  const [tracks, setTracks] = React.useState([]);
  const [artistAlbums, setArtistAlbums] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const albumId = qs.parse(window.location).pathname.match(/\d+/g)[0];
    const artistId = qs.parse(window.location).pathname.match(/\d+/g)[1];
    axios
      .all([
        axios.get(
          `https://664f50e0fafad45dfae34a76.mockapi.io/albums/${albumId}`
        ),
        axios.get(
          `https://664f50e0fafad45dfae34a76.mockapi.io/albums/${albumId}/tracks`
        ),
        axios.get(
          `https://664f50e0fafad45dfae34a76.mockapi.io/artists/${artistId}/albums`
        ),
      ])
      .then(
        axios.spread((response1, response2, response3) => {
          setAlbum(response1.data);
          setTracks(response2.data);
          setArtistAlbums(response3.data);
        })
      )
      .catch((error) => {});
    window.scrollTo(0, 0);
    dispatch(setHeaderHidden(false));
  }, [valueCurrAlbum, albumIdRedux, dispatch]);

  const albums = artistAlbums.map((obj) => <Trends key={obj.id} {...obj} />);
  const albumTracks = tracks.map((obj, index) => (
    <Tracks
      key={obj.id}
      obj={obj}
      elemIndex={index}
      artistName={album.artistName}
      artistId={obj.artistId}
    />
  ));

  return (
    <div className="album-container">
      <div className="album-page-header">
        <AlbumPageHeader obj={album} />
      </div>
      <div className="tracks-album-page">{albumTracks}</div>
      <div className="afisha-title artist-page-afisha">
        Другие альбомы исполнителя
      </div>
      <div className="albums-page-albums">{albums}</div>
    </div>
  );
};

export default Album;
