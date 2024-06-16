import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  windowWidth: 0,
  offset: 0,
};

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setWindowWidth(state, action) {
      state.windowWidth = action.payload;
    },
    setOffset(state, action) {
      state.offset = action.payload;
    },
  },
});

export const { setWindowWidth, setOffset } = sliderSlice.actions;

export default sliderSlice.reducer;
