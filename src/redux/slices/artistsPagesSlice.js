import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  artistId: '000000',
};

const artistsPagesSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setArtistPage(state, action) {
      state.artistId = `${action.payload}`;
    },
  },
});

export const { setArtistPage } = artistsPagesSlice.actions;

export default artistsPagesSlice.reducer;
