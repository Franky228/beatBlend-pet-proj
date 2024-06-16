import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setPlayingTrack } from '../../redux/slices/audioPlaySlice';
import { ReactComponent as PlayIcon } from '../../assets/img/playIcon.svg';
import { ReactComponent as PauseIcon } from '../../assets/img/pauseIcon.svg';

import { setIsPlaying } from '../../redux/slices/audioPlaySlice';

import styles from './Tracks.module.scss';

const Tracks = ({ obj, elemIndex, artistName, artistId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPlaying = useSelector((state) => state.track.isPlaying);
  const playingAudio = useSelector((state) => state.track.track);

  const onClickTrackArtist = (id, event) => {
    event.stopPropagation(); // Предотвращаем всплытие события к родителю
    navigate(`/artist/${id}`);
  };

  const onClickTrack = (albumId, artistId) => {
    navigate(`/album/id=${albumId}&artist=${artistId}`);
  };

  const onClickPlayIcon = (e, obj) => {
    e.stopPropagation();
    if (playingAudio.id !== obj.id) dispatch(setPlayingTrack(obj));
    if (playingAudio.id === obj.id)
      dispatch(setIsPlaying(isPlaying ? false : true));
  };

  return (
    <div
      style={playingAudio.id === obj.id ? { border: '1px solid black' } : {}}
      className={styles.trackElem}
      onClick={() => onClickTrack(obj.albumId, artistId)}
    >
      <div className={styles.trackNum}>{elemIndex + 1}</div>
      <div className={styles.trackInf}>
        <div className={styles.trackAvatar}>
          <div className={styles.trendsAvatarPlayIcon}>
            <div
              className={styles.avatarPlayIcon}
              onClick={(e) => onClickPlayIcon(e, obj)}
            >
              {playingAudio.id === obj.id && isPlaying ? (
                <PauseIcon />
              ) : (
                <PlayIcon />
              )}
              {/* {playingAudio.id === obj.id ? <PauseIcon /> : <PlayIcon />} */}
              {/* {isPlaying ? <PauseIcon /> : <PlayIcon />} */}
            </div>
          </div>
          <img src={obj.avatar} alt="img" />
        </div>

        <div className={styles.trackName}>
          <span className={styles.tName}>
            <a>{obj.name}</a>
          </span>
          <span className={styles.tArtist}>
            {' — '}
            <a onClick={(event) => onClickTrackArtist(artistId, event)}>
              {artistName}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
