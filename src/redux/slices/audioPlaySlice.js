import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  track: {
    plug: 'plug',
    name: 'Не суждено',
    avatar:
      '//avatars.yandex.net/get-music-content/10139807/b9678e53.a.28957427-1/50x50',
    audioURL: 'Leningrad - Ne sujdeno.mp3',
    id: '___',
    albumId: '2',
    artistId: '3',
    artistName: 'Ленинград',
    rating: 3.8,
  },
  isPlaying: false,
};

const audioPlaySlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setPlayingTrack(state, action) {
      state.track = action.payload;
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
  },
});

export const { setPlayingTrack, setIsPlaying } = audioPlaySlice.actions;

export default audioPlaySlice.reducer;
