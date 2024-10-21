import { createSlice } from '@reduxjs/toolkit';

export const cardDataSlice = createSlice({
  name: 'cardData',
  initialState: {
    value: [ {
        id: 1,
        title: "Types",
        url: `${process.env.VITE_BASE_URL}/getAllFieldTypes`,
      },
      {
        id: 2,
        title: "SubTypes",
        url: `${process.env.VITE_BASE_URL}/getAllFieldSubTypes`,
      },
      {
        id: 3,
        title: "Attributes",
        url: `${process.env.VITE_BASE_URL}/getAllAttributes`,
      }],
  },
  reducers: {
    setCardData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCardData } = cardDataSlice.actions;

export default cardDataSlice.reducer;
