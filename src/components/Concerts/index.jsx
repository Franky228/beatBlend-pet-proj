import React from 'react';

import './Concerts.scss';

const Concerts = ({ name, date, place, avatar, link }) => {
  const handleClick = (url) => {
    window.open(url, '_blank');
  };
  return (
    <div className="concerts-elem-root" onClick={() => handleClick(link)}>
      <div
        className="concerts-elem"
        style={{
          backgroundImage: `url(${avatar})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="concerts-elem-background"></div>
        {/* <img src={avatar} alt="img" /> */}
      </div>
      <div className="concerts-text">
        <div>
          <h1>{name}</h1>
        </div>
        <div>
          {date} {place}
        </div>
      </div>
    </div>
  );
};

export default Concerts;
