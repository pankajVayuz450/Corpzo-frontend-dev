import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    navigationArray : [], 
};



const navigationSlice = createSlice({
  name: 'navigationSlice',
  initialState,
  reducers: {
    UpdateNavigationArray: (state, action) => {
      state.navigationArray = action.payload;
    }, 
    
  },
});

export const { UpdateNavigationArray} = navigationSlice.actions;

export default navigationSlice.reducer;
