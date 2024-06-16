import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useSelector } from 'react-redux';

import Trends from '../components/Trends';
import Tracks from '../components/Tracks';

import '../scss/Artist.scss';

const Artist = () => {
  const [artistInf, setArtistInf] = React.useState([]);
  const [idArtist, setIdArtist] = React.useState(0);
  const [artistAlbums, setArtistAlbums] = React.useState([]);
  const [artistTracks, setArtistTracks] = React.useState([]);
  const [artistBio, setArtistBio] = React.useState(['']);
  const [artistPlayers, setArtistPlayers] = React.useState([]);
  const value = useSelector((state) => state.artists.artistId);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isButtonVisible, setIsButtonVisible] = React.useState(true);

  React.useEffect(() => {
    setIdArtist(qs.parse(window.location).pathname.match(/\d+/g)[0]);
    const idArt = qs.parse(window.location).pathname.match(/\d+/g)[0];
    const artistId = idArt ? `/${idArt}` : '';
    axios
      .all([
        axios.get(
          `https://664f50e0fafad45dfae34a76.mockapi.io/artists${artistId}`
        ),
        axios.get(
          `https://664f50e0fafad45dfae34a76.mockapi.io/artists/${idArt}/albums`
        ),
        axios.get(
          `https://664f50e0fafad45dfae34a76.mockapi.io/tracks?artistId=${idArt}&sortBy=rating&order=desc&page=1&limit=10`
        ),
      ])
      .then(
        axios.spread((response1, response2, response3) => {
          setArtistInf(response1.data);
          setArtistBio(response1.data.biography);
          setArtistPlayers(response1.data.players.split(','));
          setArtistAlbums(response2.data);
          setArtistTracks(response3.data);
        })
      )
      .catch((error) => {});
  }, [value]);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
    setIsButtonVisible(false);
  };

  const artPlayers = artistPlayers.map((obj, i) => <li key={i}>{obj}</li>);
  const albums = artistAlbums.map((obj) => <Trends key={obj.id} {...obj} />);
  const tracks = artistTracks.map((obj, index) => (
    <Tracks
      key={obj.id}
      obj={obj}
      elemIndex={index}
      artistName={artistInf.name}
      artistId={idArtist}
    />
  ));

  return (
    <div className="artist-container">
      <div className="artist-media">
        <div className="afisha-title artist-page-afisha">Популярное</div>
        <div className="tracks-art-container">{tracks}</div>
        <div className="afisha-title artist-page-afisha">Альбомы</div>
        <div className="artist-page-albums">{albums}</div>
      </div>
      <div className="artist-info">
        <div className="artist-header">
          <div className="artist-avatar">
            <img src={artistInf.avatar} alt="avatar" />
          </div>
          <div className="artist-title">
            <div className="artist-type">ИСПОЛНИТЕЛЬ</div>
            <h1 className="artist-name">{artistInf.name}</h1>

            <h4 className="artist-place">Место основания</h4>
            <div className="artist-country">{artistInf.country}</div>
          </div>
        </div>
        <div className="artist-biography">
          <h2>Участники</h2>
          <ul>{artPlayers}</ul>
          <h2>Биография</h2>

          <div className="bio-text">
            {!isExpanded ? artistBio.slice(0, 70) + '...' : artistBio}
            {isButtonVisible && (
              <button className="toggleButton" onClick={toggleText}>
                развернуть
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
