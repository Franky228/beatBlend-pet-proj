import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currAlbum: 0,
  albumId: '00000',
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setCurrAlbum(state, action) {
      state.currAlbum = action.payload;
    },
    setAlbumId(state, action) {
      state.albumId = action.payload;
    },
  },
});

export const { setCurrAlbum, setAlbumId } = albumsSlice.actions;

export default albumsSlice.reducer;
