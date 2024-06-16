import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SearchElem from '../SearchElem';

import { setSearch } from '../../redux/slices/filterSlice';

import styles from './Saerch.module.scss';

const Search = () => {
  const [items, setItems] = React.useState([]);
  const [valueLoc, setValueLoc] = React.useState('');
  const value = useSelector((state) => state.filter.search);

  React.useEffect(() => {
    const search = value ? `${value.toLowerCase()}` : '';
    if (search === '') {
      setItems([]);
      return;
    }
    const artistArr = axios.get(
      `https://664f50e0fafad45dfae34a76.mockapi.io/artists?page=1&limit=5&name=${search}`
    );
    const albumsArr = axios.get(
      `https://664f50e0fafad45dfae34a76.mockapi.io/albums`
    );

    Promise.allSettled([artistArr, albumsArr])
      .then((results) => {
        const corrArtistArr =
          results[0].status === 'fulfilled' ? results[0].value.data : [];

        const corrAlbumsArr =
          results[1].status === 'fulfilled'
            ? results[1].value.data
                .filter((obj) => {
                  return (
                    obj.name.toLowerCase().includes(search) ||
                    obj.artistName.toLowerCase().includes(search)
                  );
                })
                .slice(0, 5)
            : [];
        const shuffledAlbums = corrAlbumsArr.sort(() => Math.random() - 0.5);

        const combinedData = [...corrArtistArr, ...shuffledAlbums].slice(0, 5);
        setItems(combinedData);
      })
      .catch((error) => {});
  }, [value]);

  const dispatch = useDispatch();
  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearch(''));
    setValueLoc('');
    inputRef.current.focus();
  };

  const onChangeInput = (event) => {
    setValueLoc(event.target.value);
    updateSearchValue(event.target.value);
  };

  // const updateSearchValue = React.useCallback(
  //   debounce((str) => {
  //     dispatch(setSearch(str));
  //   }, 500),
  //   []
  // );

  const updateSearchValue = React.useMemo(
    () =>
      debounce((str) => {
        dispatch(setSearch(str));
      }, 500),
    [dispatch]
  );

  const onClickSearchEl = () => {
    dispatch(setSearch(''));
    setValueLoc('');
  };

  const searchElem =
    items.length === 0 ? (
      <li
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Ничего не найдено 😕</p>
      </li>
    ) : (
      items.map((obj) => (
        <SearchElem
          onClickEl={onClickSearchEl}
          key={obj.id + `${obj.type}`}
          obj={obj}
        />
      ))
    );

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title />
        <path
          d="M20.56,18.44l-4.67-4.67a7,7,0,1,0-2.12,2.12l4.67,4.67a1.5,1.5,0,0,0,2.12,0A1.49,1.49,0,0,0,20.56,18.44ZM5,10a5,5,0,1,1,5,5A5,5,0,0,1,5,10Z"
          fill="#464646"
        />
      </svg>
      <input
        ref={inputRef}
        value={valueLoc}
        onChange={(event) => onChangeInput(event)}
        className={styles.input}
        placeholder="Трек, альбом, исполнитель..."
      />
      {value && (
        <>
          <svg
            onClick={onClickClear}
            className={styles.clearIcon}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
          <div className={styles.popup}>
            <ul>{searchElem}</ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
