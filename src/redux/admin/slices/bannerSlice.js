import { createSlice } from '@reduxjs/toolkit';
import { addBanner, getBanners, getSingleBanner, updateBanner } from '../actions/banner';

const initialState = {
  addedBanner: null,
  isAddingBanner: false,
  addingBannerError: "",
  banners: null,
  isFetchingBanners: false,
  fetchingBannersError: "",
  singleBanner: null,
  isFetchingSingleBanner: false,
  fetchingSingleBannerError: "",
  updatedBanner: null,
  isUpdatingBanner: false,
  updatingBannerError: "",
  page: 1,
  limit: 10,
  totalCount: 0,
  bannerIdState:""
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
    },
    removeFetchingSingleBannerError: (state, action) => {
        state.fetchingSingleBannerError = "";
    },
    resetBanner: (state, action) => {
        state.singleBanner = null;
    },
    removeUpdatingBannerError: (state, action) => {
        state.updatingBannerError = "";
        state.updatedBanner = null;
    },
    setBannerId: (state, action) => {
    
      state.bannerIdState = action.payload;
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
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalCount = action.payload.total;
    })
    builder.addCase(getBanners.rejected, (state, action) => {
      state.isFetchingBanners = false;
      state.fetchingBannersError = action.payload;
    })

    builder
      .addCase(getSingleBanner.pending, (state) => {
        state.isFetchingSingleBanner = true;
      })
    builder.addCase(getSingleBanner.fulfilled, (state, action) => {
      state.isFetchingSingleBanner = false;
      state.singleBanner = action.payload.banner;
    })
    builder.addCase(getSingleBanner.rejected, (state, action) => {
      state.isFetchingSingleBanner = false;
      state.fetchingSingleBannerError = action.payload.message;
    })

    builder
      .addCase(updateBanner.pending, (state) => {
        state.isUpdatingBanner = true;
      })
    builder.addCase(updateBanner.fulfilled, (state, action) => {
      state.isUpdatingBanner = false;
      state.updatedBanner = action.payload.data;
      state.banners = state.banners?.map((ban) => ban?._id === action.payload.data?._id ? action.payload.data : ban);
    })
    builder.addCase(updateBanner.rejected, (state, action) => {
      state.isUpdatingBanner = false;
      state.updatingBannerError = action.payload.message
    })
  }
});

export const { removeUploadingBannerError, removeFetchingBannersError, removeFetchingSingleBannerError, removeUpdatingBannerError, resetBanner,setBannerId } = bannerSlice.actions;

export default bannerSlice.reducer;