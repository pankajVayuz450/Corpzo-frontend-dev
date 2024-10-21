import { createSlice, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
 isFetching : false, 
 investorList : [], 
 isAdding : false,
 totalPages : 0,
 investor : {}
};



const investorSlice = createSlice({
  name: 'investorManagementSlice',
  initialState,
  reducers: {
    getInvestors: (state, action) => {
      state.investorList = action.payload.investorList;
      state.totalPages = action.payload.totalPages
    }, 
    deleteCategoryById :(state, action)=>{
      const categoryId = action.payload; 
      console.log(categoryId, "cid")
      state.investorList = state.investorList.filter((category)=>{
        return category.categoryId !== categoryId
      })
    }, 
    getSingleInvestorById : (state, action)=>{
      const newObject = action.payload; 
      state.investor = newObject;
    }, 
    updateLoading : (state, action)=>{
      state.isFetching = action.payload;
    }, 
    updateAdding : (state, action)=>{
      state.isAdding = action.payload;
    }, 
    updateStatusState: (state, action) => {
      console.log(current(state), "current state")
      console.log(action.payload.categoryId, "payload");
      const { categoryId, active } = action.payload;
      console.log(categoryId, active, "Updating status");
    
      state.investorList = state.investorList.map((category) => {
        if (category.categoryId 
          === categoryId
        ) {
          return { ...category, active };
        }
        return category;
      });
    },
    
  },
});

export const { getInvestors,addCategory,updateAdding, updateLoading,updateStatusState, deleteCategoryById, getSingleInvestorById} = investorSlice.actions;

export default investorSlice.reducer;
