import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ReactComponent as PlayIcon } from '../../assets/img/playIcon.svg';
import { setAlbumId } from '../../redux/slices/albumsSlice';

import './Trends.scss';

const Trends = ({ name, artistName, avatar, year, id, artistId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickAlbum = (albumId, artistId) => {
    dispatch(setAlbumId(albumId));
    navigate(`/album/id=${albumId}&artist=${artistId}`);
  };

  const anClickArtistName = (idArtist, e) => {
    e.stopPropagation();
    navigate(`/artist/${idArtist}`);
  };

  return (
    <div className="grid-item" onClick={() => onClickAlbum(id, artistId)}>
      <div className="trends-avatar">
        <div className="trends-avatar-playIcon">
          <div className="avatar-playIcon">
            <PlayIcon />
          </div>
        </div>
        <img src={avatar} alt="AVATAR" />
      </div>
      <div className="album-text">
        <div>
          <a>{name}</a>
        </div>
        <div onClick={(e) => anClickArtistName(artistId, e)}>
          <a>{artistName}</a>
        </div>
        <div>{year}</div>
      </div>
    </div>
  );
};

export default Trends;
