import React from 'react';
import './slider.scss';

import { ReactComponent as Arrow } from '../../assets/img/SliderArrow.svg';

const PAGE_WIDTH = 100;

export default function Slider() {
  const slidesArr = [
    {
      imgURL:
        'https://avatars.mds.yandex.net/get-afishanew/23222/1d58f6b3c1f19431618afc129049a31e/s940x380',
      title: 'МТС Live Лето',
      subTitle: '',
      url: 'https://afisha.yandex.ru/moscow/concert/places/mts-live-leto?city=moscow',
    },
    {
      imgURL:
        'https://avatars.mds.yandex.net/get-afishanew/21422/c6e128fd472e382f6915ca3badbfa4e9/s940x380',
      title: 'Дикая мята',
      subTitle: '',
      url: 'https://afisha.yandex.ru/moscow/festival/dikaia-miata-2024?city=moscow&source=rubric_main_featured',
    },
    {
      imgURL:
        'https://avatars.mds.yandex.net/get-afishanew/29022/141573f439f01b6dd2b03f1ad5da9b4c/s940x380',
      title: 'Билеты в Третьяковскую галерею',
      subTitle: '',
      url: 'https://afisha.yandex.ru/moscow/selections/art-tretyakovskaya-galereya?city=moscow',
    },
  ];

  const [offset, setOffset] = React.useState(0);
  const [notMove, setNotMove] = React.useState(false);
  const slideRef = React.useRef(null);
  const arrorRightRef = React.useRef(null);
  const arrorLeftRef = React.useRef(null);

  React.useEffect(() => {
    let clientX = 0;

    slideRef.current.addEventListener('mousedown', (e) => {
      clientX = e.clientX;
    });

    slideRef.current.addEventListener('mouseup', (e) => {
      if (clientX > e.clientX) arrorRightRef.current.click();
      if (clientX < e.clientX) arrorLeftRef.current.click();
      if (clientX === e.clientX) setNotMove(true);
    });
  }, []);

  const arrowClick = (arrowType, event) => {
    setNotMove(false);
    if (arrowType === 'left') {
      offset === 0
        ? setOffset(-200)
        : setOffset((currentOffset) => currentOffset + PAGE_WIDTH);
    } else {
      offset === -200
        ? setOffset(0)
        : setOffset((currentOffset) => currentOffset - PAGE_WIDTH);
    }
  };

  const slideClick = (eURL) => {
    if (notMove === true) {
      window.open(eURL, '_blank');
      setNotMove(false);
    }
  };

  const slides = slidesArr.map((obj, index) => (
    <div
      onClick={() => slideClick(obj.url)}
      key={index}
      className="bg-image"
      style={{
        backgroundImage: `url(${obj.imgURL})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <h3 className="slide-title">{obj.title}</h3>
      <div className="slide-bg"></div>
    </div>
  ));

  return (
    <div ref={slideRef} className="slider-window">
      <div
        className="pages-container"
        style={{ transform: `translateX(${offset}%)` }}
      >
        {slides}
      </div>
      <div
        ref={arrorLeftRef}
        className="arrow arrow-left"
        onClick={(e) => arrowClick('left', e)}
      >
        <Arrow />
      </div>
      <div
        ref={arrorRightRef}
        className="arrow arrow-right"
        onClick={(e) => arrowClick('right', e)}
      >
        <Arrow />
      </div>
    </div>
  );
}
