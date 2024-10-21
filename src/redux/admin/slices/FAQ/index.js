import { createSlice, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
 isFetching : false, 
 faqList : [], 
 isAdding : false,
 totalPages : 0,
 faq : {}, 
 totalCount : 0, 
 diabled : false,
 childLoading : {},
 isStatusLoading : false,
 editPage : 1,
 serviceFaqs : [],
};



const faqSlice = createSlice({
  name: 'faqSlice',
  initialState,
  reducers: {
    getFaqs: (state, action) => {
      console.log(action.payload.faqList, "faq list fromn slice")
      state.faqList = action.payload.faqList;
      state.totalCount = action.payload.totalCount
      state.totalPages = action.payload.totalPages
    },
    getAllServiceFaqs: (state, action) => {
      console.log(action.payload, "faq service list fromn slice")
      state.serviceFaqs = action.payload.serviceFaqs;
    },
    addFaqs : (state, action)=>{
      const newCategory = action.payload; 
      console.log(newCategory, "newCatgory")
      console.log(newCategory)
    }, 
    deleteCategoryById :(state, action)=>{
      const categoryId = action.payload; 
      console.log(categoryId, "cid")
      state.categoryList = state.categoryList.filter((category)=>{
        return category.categoryId !== categoryId
      })
    }, 
    getFaqById : (state, action)=>{
      const newObject = action.payload; 
      state.faq = newObject;
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
      const { faqId, active } = action.payload;
      console.log(faqId, active, "Updating status");
    
      state.faqList = state.faqList.map((category) => {
        if (category.faqId 
          === faqId
        ) {
          return { ...category, active };
        }
        return category;
      });
    },
    toggleSwitchSuccess: (state, action) => {
      const newUser = action.payload;
      console.log(newUser, "new user ")
      const userIndex = state.faqList.findIndex(user => user._id === newUser._id);
      if (userIndex !== -1) {
        state.faqList[userIndex] = newUser;
      }
      state.childLoading[newUser._id] = false;
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
export const { getFaqs,addFaqs,getAllServiceFaqs, updateEditPage, updateStatusLoading,updateLoading,updateStatusState,toggleSwitchSuccess,toggleSwitchFailure, deleteCategoryById,updateAdding, getFaqById} = faqSlice.actions;

export default faqSlice.reducer;
