import { createSlice, current } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
 isFetching : false, 
 categoryList : [], 
 isAdding : false,
 totalPages : 0,
 category : {}, 
 totalCount : 0, 
 diabled : false,
 childLoading : {},
 isStatusLoading : false,
 editPage : 1,
};



const categorySlice = createSlice({
  name: 'subCategorySlice',
  initialState,
  reducers: {
    getCategoryList: (state, action) => {
      state.categoryList = action.payload.categoryList;
      state.totalCount = action.payload.totalCount
    }, 
    getActiveAc: (state, action) => {
      state.categoryList = action.payload.categoryList;
      state.totalCount = action.payload.totalCount
    }, 
    addCategory : (state, action)=>{
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
    getSingleCategoryById : (state, action)=>{
      const newObject = action.payload; 
      state.category = newObject;
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
      const { categoryId, active } = action.payload;
      console.log(categoryId, active, "Updating status");
    
      state.categoryList = state.categoryList.map((category) => {
        if (category.categoryId 
          === categoryId
        ) {
          return { ...category, active };
        }
        return category;
      });
    },
    toggleSwitchSuccess: (state, action) => {
      const newUser = action.payload;
      console.log(newUser, "new user ")
      const userIndex = state.categoryList.findIndex(user => user._id === newUser._id);
      if (userIndex !== -1) {
        state.categoryList[userIndex] = newUser;
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

export const getCategoryCount = (state)=>{
  state.categorySlice.totalCount;
}
export const { getCategoryList,addCategory,updateEditPage, updateStatusLoading,updateLoading,updateStatusState,toggleSwitchSuccess,toggleSwitchFailure, deleteCategoryById,updateAdding, getSingleCategoryById} = categorySlice.actions;

export default categorySlice.reducer;
