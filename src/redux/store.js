import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import slider from './slices/sliderSlice';
import artists from './slices/artistsPagesSlice';
import header from './slices/headerSlice';
import albums from './slices/albumsSlice';
import track from './slices/audioPlaySlice';

export const store = configureStore({
  reducer: {
    filter,
    slider,
    artists,
    header,
    albums,
    track,
  },
});
