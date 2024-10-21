import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 isFetching : false, 
 offerList : [], 
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



const offerSlice = createSlice({
  name: 'offerSlice',
  initialState,
  reducers: {
    getOffers: (state, action) => {
      state.offerList = action.payload.offerList;
      state.totalCount = action.payload.totalCount;
    },
    getServices: (state, action) => {
      state.serviceList = action.payload.serviceList;
      
    },
    addSteps : (state, action)=>{
      const newCategory = action.payload; 
      console.log(newCategory, "newCatgory")
      console.log(newCategory)
    }, 
    deleteStepBId :(state, action)=>{
      const categoryId = action.payload; 
      console.log(categoryId, "cid")
      state.stepsList = state.stepsList.filter((category)=>{
        return category._id !== categoryId
      })
    }, 
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
      
    
      state.offerList = state.offerList.map((offer) => {
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
      const userIndex = state.offerList.findIndex(offer => offer.offerId === newUser.offerId);
      if (userIndex !== -1) {
        state.offerList[userIndex] = newUser;
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
export const { getOffers,getServices,addSteps,updateEditPage, updateStatusLoading,updateLoading,updateStatusState,toggleSwitchSuccess,toggleSwitchFailure, deleteStepBId,updateAdding, getOfferById} = offerSlice.actions;

export default offerSlice.reducer;
