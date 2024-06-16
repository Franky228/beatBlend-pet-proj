import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './AlbumPageHeader.module.scss';

const AlbumPageHeader = ({ obj }) => {
  const navigate = useNavigate();

  const clickArtistName = (event, id) => {
    event.stopPropagation(); // Предотвращаем всплытие события к родителю
    navigate(`/artist/${id}`);
  };

  return (
    <div className={styles.artistHeader}>
      <div className={styles.artistAvatar}>
        <img src={obj.avatar} alt="avatar" />
      </div>
      <div className={styles.artistTitle}>
        <div className={styles.artistType}>АЛЬБОМ</div>
        <h1 className={styles.artistName}>{obj.name}</h1>
        <h5
          onClick={(e) => clickArtistName(e, obj.artistId)}
          className={styles.artistNameMain}
        >
          {obj.artistName}
        </h5>
        {/* <h4 className={styles.artistPlace}>Место основания</h4> */}
        <div className={styles.artistCountry}>
          <span style={{ marginRight: '8px' }}>{obj.year}</span>
          <span>{obj.genre}</span>
        </div>
      </div>
    </div>
  );
};

export default AlbumPageHeader;
