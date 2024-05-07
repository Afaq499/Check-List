import { createSlice } from '@reduxjs/toolkit';

const roofDataSlice = createSlice({
  name: 'roofDataSlice',
  initialState: {
    imagesData: [] 
  },
  reducers: {
    SetRoofDataSlice(state, { payload: { field, value } }) {
      state[field] = value;
    },
  },
  extraReducers: {
  }
});

const { reducer, actions } = roofDataSlice;

export const {
    SetRoofDataSlice
} = actions;

export default reducer;
