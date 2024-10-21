import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 isFetching : false, 
 documentList : [], 
 isAdding : false,
 totalPages : 0,
 offer : {}, 
 totalCount : 0, 
 diabled : false,
 childLoading : {},
 isStatusLoading : false,
 editPage : 1,
 serviceList : []
};



const documentSlice = createSlice({
  name: 'documentSlice',
  initialState,
  reducers: {
    getDocuments: (state, action) => {
      state.documentList = action.payload.documentList;
      // state.totalCount = action.payload.totalCount;
    },
    getServices: (state, action) => {
      state.serviceList = action.payload.serviceList;
      
    },
    addDocument : (state, action)=>{
      const newDocument = action.payload; 
      if(newDocument){
        state.documentList.unshift(newDocument)
      }
    }, 
    updateDocumentReducer: (state, action) => {
      const { folderId, folderName } = action.payload; 
      console.log(action.payload, "from the slice");
    
      state.documentList = state.documentList.map(doc => 
        doc._id === folderId ? { ...doc, folderName: folderName } : doc
      );
    }
    
    ,
    getOfferById : (state, action)=>{
      const newObject = action.payload; 
      console.log(newObject, "new Object")
      state.offer = newObject;
    }, 
    updateLoading : (state, action)=>{
      state.isFetching = action.payload;
    }, 
    updateAdding : (state, action)=> {
      state.isAdding = action.payload;
    },
    updateStatusLoading : (state, action)=> {
      state.isStatusLoading = action.payload;
    },
    updateStatusState: (state, action) => {
      const { offerId, active } = action.payload;
      
    
      state.documentList = state.documentList.map((offer) => {
        if (offer.offerId 
          === offerId
        ) {
          return { ...offer, active };
        }
        return offer;
      });
    },
    toggleSwitchSuccess: (state, action) => {
      const newUser = action.payload;
      console.log(newUser, "new offer ")
      const userIndex = state.documentList.findIndex(offer => offer.offerId === newUser.offerId);
      if (userIndex !== -1) {
        state.documentList[userIndex] = newUser;
      }
    },
    toggleSwitchFailure: (state, action) => {
      const userId = action.payload; 
      console.log(userId);
      state.childLoading[userId] = false; 
  }, 
  updateEditPage : (state, action)=>{
    state.editPage = action.payload;
  }
  },
});
export const { getDocuments,getServices,addDocument,updateEditPage, updateStatusLoading,updateLoading,updateStatusState,toggleSwitchSuccess,toggleSwitchFailure, updateDocumentReducer,updateAdding, getOfferById} = documentSlice.actions;

export default documentSlice.reducer;
