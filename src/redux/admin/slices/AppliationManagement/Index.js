import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
 isFetching : false, 
 applicationsList : [], 
 noteList:[],
 caseHistoryList:[],
 applicationFormData:[],
 isAdding : false,
 totalPages : 0,
 investor : {}, 
 totalCount : 0
};



const applicationSlice = createSlice({
  name: 'ApplicationManagementSlice',
  initialState,
  reducers: {
    getApplications: (state, action) => {
      state.applicationsList = action.payload.applicationsList;
      state.totalCount = action.payload.totalCount
      state.totalPages = action.payload.totalPages
    }, 
    getApplicationsFormData: (state, action) => {
     
      state.applicationFormData = action.payload;
     
    }, 
    getNoteList: (state, action) => {

      state.noteList = action.payload
    }, 
    getCaseHistoryList: (state, action) => {

      state.caseHistoryList = action.payload
    }, 
    getSingleApplicationById : (state, action)=>{
      const newObject = action.payload; 
      state.investor = newObject;
    }, 
    updateLoading : (state, action)=>{
      state.isFetching = action.payload;
    }, 
    updateStatusState: (state, action) => {
      console.log(current(state), "current state check ")
     
    },
    
  },
});

export const { getApplications,updateLoading,updateStatusState, getSingleApplicationById,getNoteList,getCaseHistoryList,getApplicationsFormData} = applicationSlice.actions;

export default applicationSlice.reducer;
