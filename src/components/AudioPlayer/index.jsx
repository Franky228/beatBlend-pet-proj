import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './AudioPlayer.module.scss';
import { ReactComponent as PlayIcon } from '../../assets/img/playIcon.svg';
import { ReactComponent as PauseIcon } from '../../assets/img/pauseIcon.svg';
import { ReactComponent as SoundPlay } from '../../assets/img/soundPlay.svg';
import { ReactComponent as SoundPause } from '../../assets/img/soundPause.svg';

import { setIsPlaying } from '../../redux/slices/audioPlaySlice';

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playingAudio = useSelector((state) => state.track.track);
  const isPlaying = useSelector((state) => state.track.isPlaying);
  const [isSoundOFF, setIsSoundOFF] = React.useState(false);
  const [loadError, setLoadError] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isSeeking, setIsSeeking] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5); // начальная громкость
  const [audioURL, setAudioURL] = React.useState(
    `../../assets/audio/${playingAudio.audioURL}`
  );

  const [isHovered, setIsHovered] = React.useState(false);
  const [currPlayingTime, setCurrPlayingTime] = React.useState('00:00');
  const [currDurationTime, setCurrDurationTime] = React.useState('00:00');

  const audioRef = React.useRef(null);

  const visibleStyle = {
    bottom: isHovered ? '20px' : '-200px',
  };

  React.useEffect(() => {
    if (audioURL) audioRef.current.load();
    setAudioURL(`http://n91636wd.beget.tech/audio/${playingAudio.audioURL}`);
    const audioElement = audioRef.current;

    const handleEnded = () => {
      dispatch(setIsPlaying(false));
    };
    audioElement.addEventListener('ended', handleEnded);
    return () => {
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [playingAudio, audioURL, dispatch]);

  React.useEffect(() => {
    !isPlaying ? audioRef.current.pause() : audioRef.current.play();
  }, [isPlaying]);

  const handleMouseDownUp = (e) => {
    e.stopPropagation();
    e._reactName === 'onMouseDown' ? setIsSeeking(true) : setIsSeeking(false);
  };

  const handleMouseMove = (e) => {
    if (loadError) return;
    e.stopPropagation();
    if (isSeeking) {
      const progress = (e.nativeEvent.offsetX / e.target.offsetWidth) * 100; // Вычисляем новое значение для перемотки звука
      audioRef.current.currentTime =
        (progress / 100) * audioRef.current.duration; // Устанавливаем новое значение для перемотки звука
    }
  };

  const onCLickPlay = () => {
    if (loadError) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    dispatch(setIsPlaying(!isPlaying));
  };

  const onCLickVolumeOFF = () => {
    isSoundOFF
      ? (audioRef.current.volume = volume)
      : (audioRef.current.volume = 0);
    setIsSoundOFF(!isSoundOFF);
  };

  const handleTimeUpdate = () => {
    if (loadError) return;
    formatCurrTime();
    setCurrentTime((prevTime) => {
      if (prevTime !== audioRef.current.currentTime) {
        return audioRef.current.currentTime;
      }
      return prevTime;
    });
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    formatDurationTime();
    if (!playingAudio.hasOwnProperty('plug')) {
      setIsHovered(true);
      audioRef.current.play();
      dispatch(setIsPlaying(isPlaying ? true : !isPlaying));
    }
  };

  const handleProgressBarClick = (e) => {
    if (loadError) return;
    const percent = e.nativeEvent.offsetX / e.target.offsetWidth;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const setVolumeFunc = (e) => {
    setVolume(parseFloat(e.target.value));
    audioRef.current.volume = e.target.value;
    if (isSoundOFF === !false) setIsSoundOFF(false);
  };

  const onClickArtistName = (idArtist, e) => {
    e.stopPropagation();
    navigate(`/artist/${idArtist}`);
  };

  const onClickAlbumName = (albumId, idArtist, e) => {
    e.stopPropagation();
    navigate(`/album/id=${albumId}&artist=${idArtist}`);
  };

  // переводим audioRef.current.currentTime в формат 00:00
  const formatCurrTime = () => {
    const minutes = Math.floor(audioRef.current.currentTime / 60);
    const secondsFormatted = Math.floor(audioRef.current.currentTime % 60);

    const minutesString = minutes < 10 ? '0' + minutes : minutes;
    const secondsString =
      secondsFormatted < 10 ? '0' + secondsFormatted : secondsFormatted;

    setCurrPlayingTime(minutesString + ':' + secondsString);
  };

  // переводим duration в формат 00:00
  const formatDurationTime = () => {
    const minutes = Math.floor(audioRef.current.duration / 60);
    const secondsFormatted = Math.floor(audioRef.current.duration % 60);

    const minutesString = minutes < 10 ? '0' + minutes : minutes;
    const secondsString =
      secondsFormatted < 10 ? '0' + secondsFormatted : secondsFormatted;

    setCurrDurationTime(minutesString + ':' + secondsString);
  };

  return (
    <div className={styles.audioFooter} style={visibleStyle}>
      <div className={styles.playerPanel}>
        <div
          onMouseDown={handleMouseDownUp}
          onMouseUp={handleMouseDownUp}
          onMouseMove={handleMouseMove}
          onClick={handleProgressBarClick}
          className={styles.progressBar}
        >
          <div className={styles.timer}>
            <span>{currPlayingTime}</span> <span>{currDurationTime}</span>
          </div>
          <progress value={currentTime} max={duration}></progress>
        </div>
        <div className={styles.downBlock}>
          <div className={styles.leftBlock}>
            <div className={styles.trackInfo}>
              <div className={styles.trackAvatar}>
                <img src={playingAudio.avatar} alt="img" />
              </div>
              <div className={styles.trackTitle}>
                <div
                  className={styles.trackName}
                  onClick={(e) =>
                    onClickAlbumName(
                      playingAudio.albumId,
                      playingAudio.artistId,
                      e
                    )
                  }
                >
                  {playingAudio.name}
                </div>
                <div
                  className={styles.trackArtistName}
                  onClick={(e) => onClickArtistName(playingAudio.artistId, e)}
                >
                  {playingAudio.artistName}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.centralBlock}>
            <div className={styles.playIcon} onClick={onCLickPlay}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </div>
          </div>

          <div className={styles.soundBlock}>
            <div className={styles.soundElemCont}>
              <div className={styles.soundIcon} onClick={onCLickVolumeOFF}>
                {isSoundOFF ? <SoundPause /> : <SoundPlay />}
              </div>
              <div className={styles.soundInput}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={setVolumeFunc}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio
        onError={() => {
          setLoadError(true);
        }}
        ref={audioRef}
        volume={volume}
        onTimeUpdate={handleTimeUpdate}
        className={styles.audioPlayer}
        onLoadedData={handleLoadedData}
        src={audioURL}
        type="audio/mp3"
      >
        Ваш браузер не поддерживает воспроизведение аудио.
      </audio>
    </div>
  );
};

export default AudioPlayer;
