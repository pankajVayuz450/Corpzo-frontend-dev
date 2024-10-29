import { createSlice } from '@reduxjs/toolkit';
import { addBanner, getBanners } from '../actions/banner';

const initialState = {
  addedBanner: null,
  isAddingBanner: false,
  addingBannerError: "",
  banners: null,
  isFetchingBanners: false,
  fetchingBannersError: ""
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    removeUploadingBannerError: (state, action) => {
        state.addingBannerError = "",
        state.addedBanner = null
    },
    removeFetchingBannersError: (state, action) => {
        state.fetchingBannersError = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBanner.pending, (state) => {
        state.isAddingBanner = true;
      })
    builder.addCase(addBanner.fulfilled, (state, action) => {
      state.isAddingBanner = false;
      state.addedBanner = action.payload.data;
    })
    builder.addCase(addBanner.rejected, (state, action) => {
      state.isAddingBanner = false;
      state.addingBannerError = action.payload;
    })

    builder
      .addCase(getBanners.pending, (state) => {
        state.isFetchingBanners = true;
      })
    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.isFetchingBanners = false;
      state.banners = action.payload.banners;
    })
    builder.addCase(getBanners.rejected, (state, action) => {
      state.isFetchingBanners = false;
      state.fetchingBannersError = action.payload;
    })
  }
});

export const { removeUploadingBannerError, removeFetchingBannersError } = bannerSlice.actions;

export default bannerSlice.reducer;