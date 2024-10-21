import { createSlice, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
 isFetching : false, 
 videoList : {}, 
 isAdding : false,
 url : "", 
 content : "Upload Video", 
 isVideoUploaded : false,
 uploadVideoLoading : false,
 nextPage : false,
};

const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {
    getVideos: (state, action) => {
      state.videoList = action.payload.videoList;
      state.url = action.payload.videoList.url;
     
    },
    updateLoading : (state, action)=>{
      state.isFetching = action.payload;
    }, 
    updateAdding : (state, action)=> {
      state.isAdding = action.payload;
    },
    updateContent : (state, action)=>{
      state.content = action.payload;
    }, 
    updateVideoUploadState : (state, action)=>{
      state.isVideoUploaded = action.payload;
    }, 
    updateUploadLoading : (state, action)=> {
      state.uploadVideoLoading = action.payload;
    },
    updateVideoUrl : (state, action)=>{
      state.url = action.payload;
    }, 
    updateNext : (state, action)=>{
      state.nextPage = action.payload;
    }, 
  },
});
export const { getVideos,updateLoading,updateNext,updateAdding,updateUploadLoading, updateVideoUrl, updateVideoUploadState, updateContent} = videoSlice.actions;

export default videoSlice.reducer;
