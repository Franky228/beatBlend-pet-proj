import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isHeaderHidden: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderHidden(state, action) {
      state.isHeaderHidden = action.payload;
    },
  },
});

export const { setHeaderHidden } = headerSlice.actions;

export default headerSlice.reducer;
