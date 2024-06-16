import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setArtistPage } from '../../redux/slices/artistsPagesSlice';
import { setAlbumId } from '../../redux/slices/albumsSlice';

import styles from './SearchElem.module.scss';

const SearchElem = ({ obj, onClickEl }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const typeObject = {
    artist: (
      <li onClick={() => onClickSearchElem(obj)}>
        <div className={styles.searchElem}>
          <div className={styles.searchAvatar} style={{ borderRadius: '50%' }}>
            <img src={obj.avatar} alt="img" />
          </div>
          <div className={styles.textSearchElem}>
            <strong className={styles.searchTitle}>{obj.name}</strong>
            <div className={styles.searchElemType}>{obj.type}</div>
          </div>
          <div></div>
        </div>
      </li>
    ),
    album: (
      <li onClick={() => onClickSearchElem(obj)}>
        <div className={styles.searchElem}>
          <div className={styles.searchAvatar}>
            <img src={obj.avatar} alt="img" />
          </div>
          <div className={styles.textSearchElem}>
            <strong className={styles.searchTitle}>{obj.name}</strong>
            <cite className={styles.searchArtist}>by {obj.artistName}</cite>
            <div className={styles.searchElemType}>{obj.type}</div>
          </div>
          <div></div>
        </div>
      </li>
    ),
  };

  const onClickSearchElem = (elemObj) => {
    if (elemObj.type.toLowerCase() === 'artist') {
      dispatch(setArtistPage(elemObj.id));
      navigate(`/artist/${elemObj.id}`);
    } else if (elemObj.type.toLowerCase() === 'album') {
      dispatch(setAlbumId(elemObj.id));
      navigate(`/album/id=${elemObj.id}&artist=${elemObj.artistId}`);
    }
    onClickEl();
  };

  return typeObject[obj.type];
};

export default SearchElem;
