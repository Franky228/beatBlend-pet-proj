import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import musicLogo from '../../assets/img/musicLogo128.png';
import Search from '../Search';

import { setWindowWidth, setOffset } from '../../redux/slices/sliderSlice';
import { setHeaderHidden } from '../../redux/slices/headerSlice';
import PagesButtons from '../PagesButtons';

import './Header.scss';

const Header = () => {
  const isHeaderHidden = useSelector((state) => state.header.isHeaderHidden);

  const dispatch = useDispatch();

  const handleResize = () => {
    dispatch(setWindowWidth(window.innerWidth));
    dispatch(setOffset(0));
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
        dispatch(setHeaderHidden(false)); // Показать header при прокрутке вверх
      } else {
        dispatch(setHeaderHidden(true)); // Скрыть header при прокрутке вниз
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      style={{
        top: isHeaderHidden ? '-100px' : '0',
        opacity: isHeaderHidden ? '0' : '1',
        pointerEvents: isHeaderHidden ? 'none' : 'all',
      }}
      className="header"
    >
      <div className="header_container">
        <div className="left_container">
          <Link to="/">
            <div className="header_logo">
              <div className="header_logo_background">
                <img src={musicLogo} alt="LOGO" />
              </div>
              <h1>BeatBlend</h1>
            </div>
          </Link>
          <Search />
        </div>
        <PagesButtons />
      </div>
    </header>
  );
};

export default Header;
