import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 isFetching : false, 
 logo : {}, 
 isAdding : false,
 url : "", 
 content : "Upload Video", 
 isVideoUploaded : false,
 uploadImageLoading : false,
};

const logoSlice = createSlice({
  name: 'logoSlice',
  initialState,
  reducers: {
    getLogo: (state, action) => {
      state.logo = action.payload.logo;
      state.url = action.payload.logo.url;
     
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
      state.uploadImageLoading = action.payload;
    },
    updateImageUrl : (state, action)=>{
      state.url = action.payload;
    },  
  },
});
export const { getLogo,updateLoading,updateAdding,updateUploadLoading, updateImageUrl, updateVideoUploadState, updateContent} = logoSlice.actions;

export default logoSlice.reducer;
