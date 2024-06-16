import React from 'react';
import axios from 'axios';

// import Slider from '../components/Slider';
import Slider from '../components/SliderNew';
import Concerts from '../components/Concerts';
import Trends from '../components/Trends';

import concertsArr from '../assets/concerts.json';

import '../scss/home.scss';

const Home = () => {
  const [albumsArr, setAlbumsArr] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(
        `https://664f50e0fafad45dfae34a76.mockapi.io/albums?sortBy=rating&order=desc`
      )
      .then((responce) => {
        setAlbumsArr(responce.data);
      });
    window.scrollTo(0, 0);
  }, []);

  const albums = albumsArr.map((obj) => <Trends key={obj.id} {...obj} />);
  const concerts = concertsArr.map((obj) => <Concerts key={obj.id} {...obj} />);
  return (
    <div>
      <div className="slider-root">
        <div className="root">
          <div className="afisha-title">
            <h1>Афиша событий</h1>
          </div>
          <Slider />
        </div>
      </div>

      <div className="root">
        <div className="afisha-title">
          <h1>События в ближайшие дни</h1>
        </div>
        <div className="root-concerts">{concerts}</div>
      </div>

      <div className="root">
        <div className="afisha-title">
          <h1>Что сегодня в тренде</h1>
        </div>
        <div className="content_trends">{albums}</div>
      </div>
    </div>
  );
};

export default Home;
