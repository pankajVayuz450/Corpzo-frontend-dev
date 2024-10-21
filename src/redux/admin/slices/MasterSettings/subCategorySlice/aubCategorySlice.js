import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  isFetching: false,
  subCategoryList: [],
  isAdding: false,
  totatlPages: 0,
  subCategory: {},
  totalCount: 0,
  activeCategories : [],
  isStatusLoading : false, 
  editPage : 1
};



const subCategorySlice = createSlice({
  name: 'subCategorySlice',
  initialState,
  reducers: {
    getSubCategoryList: (state, action) => {
      state.subCategoryList = action.payload.subCategoryList;
      state.totalCount = action.payload.totalCount
    },
    getActiveCategoryList: (state, action) => {
      state.activeCategories = action.payload.activeCategories;
    },
    addSubCategory: (state, action) => { 
      const newCategory = action.payload;
      console.log(newCategory, "newCatgory")
      
    },
    deleteSubCategoryById: (state, action) => {
      const categoryId = action.payload;
      console.log(categoryId, "cid")
      state.subCategoryList = state.subCategoryList.filter((category) => {
        return category.categoryId !== categoryId
      })
    },
    getSingleSubCategoryById: (state, action) => {
      const newObject = action.payload;
      state.subCategory = newObject;
    },
    updateLoading: (state, action) => {
      console.log(action.payload)
      state.isFetching = action.payload;
    },
    updateAdding: (state, action) => {
      state.isAdding = action.payload;
    },
    updateStatusLoading : (state, action)=> {
      state.isStatusLoading = action.payload;
    },
    updateStatusState: (state, action) => {
      const { subCategoryId
        , active } = action.payload;
      console.log(subCategoryId
        , active, "Updating status");
      state.subCategoryList = state.subCategoryList.map((category) => {
        if (category.subCategoryId
          === subCategoryId
        ) {
          return { ...category, active };
        }
        return category;
      });
    },
    updateEditPage : (state, action)=>{
      state.editPage = action.payload;
    }
  },
});

export const { getSubCategoryList,getActiveCategoryList,updateEditPage, updateStatusLoading, updateLoading, updateAdding, addSubCategoryState, updateStatusState, deleteSubCategoryById, getSingleSubCategoryById } = subCategorySlice.actions;

export default subCategorySlice.reducer;
